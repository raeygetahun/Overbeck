const Application = require('../models/application');
const Volunteer = require('../models/volunteer');
var sendEmail = require("../services/emailService");

exports.verifyTimeSlotApplication = async (req, res) => {
    try {

        const { applicationId, status, note } = req.body;


        const updatedVolunteer = await Application.updateStatus(applicationId, status, note);

        if (status === "Approved") {
            await sendEmail(updatedVolunteer.email, 'TimeSlot Approved');

        }
        else if (status === "Rejected") {
            await sendEmail(updatedVolunteer.email, 'TimeSlot Rejected', false, { reason: note });
        }

        res.json({ success: true, message: 'Application status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

exports.verifyNewVolunteerApplication = async (req, res) => {
    try {
        const { volunteerId, status } = req.body;

        const updatedVolunteer = await Volunteer.updateStatus(volunteerId, status);

        if (status === "Approved") {
            await sendEmail(updatedVolunteer.email, "Account Approved")

        }
        else if (status === "Rejected") {
            await sendEmail(updatedVolunteer.email, "Account Rejected")
        }


        res.json({ success: true, message: 'Application status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        const { applicationId } = req.body;

        await Application.deleteApplication(applicationId);

        // Notify volunteer about the application status

        res.json({ success: true, message: 'Application deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

exports.updateApplication = async (req, res) => {
    try {
        const { applicationId, startTime, endTime } = req.body;

        await Application.updateTimeSlot(applicationId, startTime, endTime);

        // Notify volunteer about the application status

        res.json({ success: true, message: 'Application deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

exports.getPendingVolunteers = async (req, res) => {
    try {
        const pendingVolunteers = await Volunteer.getAll("Pending");
        res.json({ success: true, data: pendingVolunteers });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

exports.getApprovedVolunteers = async (req, res) => {
    try {
        const approvedVolunteers = await Volunteer.getAll("Approved");

        res.json({ success: true, data: approvedVolunteers });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });

    }
}
