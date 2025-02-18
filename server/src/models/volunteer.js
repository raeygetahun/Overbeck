const firebase = require('../services/firebaseService');
const bcrypt = require('bcrypt');


const firestore = firebase.firestore();
const saltRounds = 10;

class Volunteer {
    constructor(id, email, firstName, lastName, accountStatus = null) {
        this.volunteerId = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.accountStatus = accountStatus;
    }

    async save(password) {
        try {
            const existingUser = await Volunteer.getByUsername(this.email);

            if (existingUser) {
                throw new Error('Username or email already in use');
            }

            // Create a new user in Firebase Authentication
            const userRecord = await firebase.auth().createUser({
                email: this.email,
                password: password,
            });

            // Store additional user data in Firestore
            const volunteerDocRef = firestore.collection('volunteers').doc(userRecord.uid);
            await volunteerDocRef.set({
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                accountStatus: "Pending",
            });

            this.volunteerId = volunteerDocRef.id;

            return this;

        } catch (error) {
            throw new Error(`Registration failed: ${error.message}`);
        }
    }

    static async getByUsername(email) {
        try {
            // Check if a volunteer with the provided username exists
            let query = firestore.collection('volunteers').where('email', '==', email);
            let snapshot = await query.get();

            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                const data = doc.data();
                return new Volunteer(doc.id, data.username, data.firstName, data.lastName, data.email, data.accountStatus);
            }

            return null; // No matching volunteer found
        } catch (error) {
            throw new Error(`Error retrieving volunteer by username or email: ${error.message}`);
        }
    }

    static async getById(volunteerId) {
        const doc = await firestore.collection('volunteers').doc(volunteerId).get();

        if (!doc.exists) {
            return null;
        }

        const data = doc.data();
        return new Volunteer(doc.id, data.email, data.firstName, data.lastName, data.accountStatus);
    }

    static async getByEmail(email) {
        const query = firestore.collection('volunteers').where('email', '==', email);
        const snapshot = await query.get();

        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            const data = doc.data();
            return new Volunteer(doc.id, data.email, data.firstName, data.lastName, data.accountStatus);
        }
        return null;

    }

    static async getAll(status = null) {
        let volunteersSnapshot;
        if (status) {
            volunteersSnapshot = await firestore.collection('volunteers').where('accountStatus', '==', status).get();
        }
        else {
            volunteersSnapshot = await firestore.collection('volunteers').get();
        }
        const volunteers = [];

        volunteersSnapshot.forEach((doc) => {
            const data = doc.data();
            volunteers.push(new Volunteer(doc.id, data.email, data.firstName, data.lastName, data.accountStatus));
        });

        return volunteers;
    }

    static async updateStatus(volunteerId, accountStatus) {
        try {
            const docRef = firestore.collection('volunteers').doc(volunteerId);
            await docRef.update({ accountStatus });

            const updatedDoc = await docRef.get();
            const updatedVolunteer = updatedDoc.data();
            const volunteer = new Volunteer(updatedVolunteer.id, updatedVolunteer.email, updatedVolunteer.firstName, updatedVolunteer.lastName, updatedVolunteer.accountStatus);

            return volunteer;

        } catch (error) {
            console.error(`Failed to update status for application ${volunteerId}: ${error.message}`);
            throw new Error(`Failed to update status for application ${volunteerId}`);
        }
    }

}

module.exports = Volunteer;
