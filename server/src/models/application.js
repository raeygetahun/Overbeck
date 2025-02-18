const admin = require('../services/firebaseService');
const Volunteer = require('./volunteer');

const firestore = admin.firestore();

class Application {
    constructor(applicationId, date, startTime, endTime, volunteerId, status, note = null, volunteerName = null) {
        this.applicationId = applicationId;
        this.date = date instanceof Date ? date : new Date(date);
        this.startTime = startTime instanceof Date ? startTime : new Date(startTime);
        this.endTime = endTime instanceof Date ? endTime : new Date(endTime);
        this.volunteerId = volunteerId;
        this.status = status;
        this.note = note;
        this.volunteerName = volunteerName;
    }

    async save() {

        try {
            const docRef = await firestore.collection('applications').add({
                date: this.date,
                startTime: this.startTime,
                endTime: this.endTime,
                volunteerId: this.volunteerId,
                status: this.status,
                note: null,
            });

            this.applicationId = docRef.id;

            return this;
        } catch (error) {
            throw new Error(`Application failed: ${error.message}`);
        }
    }

    static async getAll(status = null) {
        let approvedApplicationsSnapshot;
        if (status) {
            approvedApplicationsSnapshot = await firestore.collection('applications').where('status', '==', status).get();
        }
        else {
            approvedApplicationsSnapshot = await firestore.collection('applications').get();
        }
        const approvedApplications = [];
        let count = 1;

        for (const doc of approvedApplicationsSnapshot.docs) {
            const data = doc.data();
            const volunteerSnapshot = await firestore.collection('volunteers').doc(data.volunteerId).get();
            let volunteerName = '';
            console.log(count, data, volunteerSnapshot.data())
            volunteerName = volunteerSnapshot.data().firstName + " " + volunteerSnapshot.data().lastName;

            approvedApplications.push(new Application(
                doc.id,
                this.convertFirestoreTimestamp(data.date),
                this.convertFirestoreTimestamp(data.startTime),
                this.convertFirestoreTimestamp(data.endTime),
                data.volunteerId,
                data.status,
                data.note,
                volunteerName
            ));

            count = count + 1;
        }

        return approvedApplications;
    }


    static async getById(applicationId) {
        const doc = await firestore.collection('applications').doc(applicationId).get();

        if (!doc.exists) {
            return null;
        }

        const data = doc.data();
        return new Application(doc.id, this.convertFirestoreTimestamp(data.date), this.convertFirestoreTimestamp(data.startTime), this.convertFirestoreTimestamp(data.endTime), data.volunteerId, data.status, data.note);
    }

    static async getByVolunteerId(volunteerId, status = null) {
        let applicationsSnapshot;
        if (status) {
            applicationsSnapshot = await firestore.collection('applications').where('volunteerId', '==', volunteerId).where('status', '==', status).get();
        }
        else {
            applicationsSnapshot = await firestore.collection('applications').where('volunteerId', '==', volunteerId).get();
        }
        const applications = [];

        applicationsSnapshot.forEach((doc) => {
            const data = doc.data();
            applications.push(new Application(doc.id, this.convertFirestoreTimestamp(data.date), this.convertFirestoreTimestamp(data.startTime), this.convertFirestoreTimestamp(data.endTime), data.volunteerId, data.status, data.note));
        });


        return applications;
    }

    static async updateStatus(applicationId, status, note) {
        try {
            const docRef = firestore.collection('applications').doc(applicationId);
            const mappedStatus = status ? "Approved" : "Pending";
            await docRef.update({ status: mappedStatus, note });
            const updatedDoc = await docRef.get();
            const updatedApplication = updatedDoc.data();
            return Volunteer.getById(updatedApplication.volunteerId);

        } catch (error) {
            console.error(`Failed to update status for application ${applicationId}: ${error.message}`);
            throw new Error(`Failed to update status for application ${applicationId}`);
        }
    }

    static async updateTimeSlot(applicationId, startTime, endTime) {
        try {
            const docRef = firestore.collection('applications').doc(applicationId);
            await docRef.update({ startTime, endTime });

            return true;
        } catch (error) {
            console.error(`Failed to update time slot for application ${applicationId}: ${error.message}`);
            throw new Error(`Failed to update time slot for application ${applicationId}`);
        }
    }

    static async deleteApplication(applicationId) {
        try {
            const docRef = firestore.collection('applications').doc(applicationId);
            await docRef.delete();

            // If needed, you can also notify the volunteer about the deleted application here

            return true;
        } catch (error) {
            console.error(`Failed to delete application ${applicationId}: ${error.message}`);
            throw new Error(`Failed to delete application ${applicationId}`);
        }
    }


    static convertFirestoreTimestamp(timestamp) {
        if (timestamp && timestamp.toDate) {
            return timestamp.toDate();
        }
        return timestamp;
    }


}

module.exports = Application;
