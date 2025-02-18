const Volunteer = require('../models/volunteer');
const Application = require('../models/application');
const { app } = require('firebase-admin');
const Admin = require('../models/admin');
var sendEmail = require("../services/emailService");

exports.applyForTimeSlot = async (req, res) => {
    try {
        const { email, applicationDate, startTime, endTime } = req.body;

        const volunteer = await Volunteer.getByEmail(email);

        if (!volunteer) {
            return res.status(400).json({ success: false, error: 'Volunteer does not exist' });
        }

        if (volunteer.accountStatus !== "Approved") {
            return res.status(400).json({ success: false, error: 'Volunteer not approved' });
        }

        const newApplication = new Application(null, applicationDate, startTime, endTime, volunteer.volunteerId, 'Pending');

        // Save the application to Firestore
        const savedApplication = await newApplication.save();

        const adminsEmail = await Admin.getAll("email")

        await sendEmail(adminsEmail, 'New TimeSlot', true, { name: volunteer.firstName + " " + volunteer.lastName });

        res.json({ success: true, data: savedApplication, message: 'Application submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

exports.getAppliedTimeSlots = async (req, res) => {
    try {
        const { email } = req.params;
        const volunteer = await Volunteer.getByEmail(email);

        if (volunteer) {
            const applications = await Application.getByVolunteerId(volunteer.volunteerId, "Pending");
            res.json({ success: true, data: applications });

        }
        return

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

exports.getApprovedTimeSlots = async (req, res) => {
    try {
        const { email } = req.params;
        const volunteer = await Volunteer.getByEmail(email);
        const volunteerName= volunteer.firstName + " " + volunteer.lastName;
        if (volunteer) {
            const applications = await Application.getByVolunteerId(volunteer.volunteerId, "Approved");
            applications.forEach(application => {
                application.volunteerName = volunteerName;
            });
            res.json({ success: true, data: applications });
        }
        return

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};
