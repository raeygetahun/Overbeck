const firebase = require('../services/firebaseService');
const firestore = firebase.firestore();
const bcrypt = require('bcrypt');

const saltRounds = 10;


class Admin {
    constructor(id, email, firstName, lastName) {
        this.adminId = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    async save(password) {
        try {

            const existingUser = await Admin.getByEmail(this.email);

            if (existingUser) {
                throw new Error('Email already in use');
            }

            // Create a new user in Firebase Authentication
            const userRecord = await firebase.auth().createUser({
                email: this.email,
                password: password,
            });

            // Store additional user data in Firestore
            const adminDocRef = firestore.collection('admins').doc(userRecord.uid);
            await adminDocRef.set({
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
            });

            this.adminId = adminDocRef.id;

            return this;

        } catch (error) {
            throw new Error(`Registration failed: ${error.message}`);
        }
    }

    static async getByEmail(email) {
        try {
            // Check if a volunteer with the provided username exists
            let query = firestore.collection('admins').where('email', '==', email);
            let snapshot = await query.get();

            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                const data = doc.data();
                return new Admin(doc.id, data.username, data.firstName, data.lastName, data.email, data.accountStatus);
            }

            return null; // No matching volunteer found
        } catch (error) {
            throw new Error(`Error retrieving Admin by email: ${error.message}`);
        }
    }

    static async getAll(email=null) {
        const adminsSnapshot = await firestore.collection('admins').get();
        const admins = [];

        if (email){
            adminsSnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.email) {
                    admins.push(data.email);
                }
            });
            return admins;
        }

        adminsSnapshot.forEach((doc) => {
            const data = doc.data();
            admins.push({ id: doc.id, ...data });
        });

        return admins;
    }
}

module.exports = Admin;
