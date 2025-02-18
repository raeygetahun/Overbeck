const firebase = require('../services/firebaseService');
const firestore = firebase.firestore();
const Volunteer = require('../models/volunteer');
const Admin = require('../models/admin');

var sendEmail = require("../services/emailService");


exports.volunteerRegister = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {

    const newVolunteer = new Volunteer(null, email, firstName, lastName);

    const savedVolunteer = await newVolunteer.save(password);
    const adminsEmail = await Admin.getAll("email")

    await sendEmail(adminsEmail, 'New Volunteer', true, { name: savedVolunteer.firstName + " " + savedVolunteer.lastName });

    res.status(201).json({ success: true, data: savedVolunteer, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    const errorMessage = error.message || 'Internal Server Error';
    res.status(500).json({ "error": errorMessage });
  }
};

exports.adminRegister = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {

    const newAdmin = new Admin(null, email, firstName, lastName);

    const savedAdmin = await newAdmin.save(password);

    await sendEmail(email, 'New Admin', false, { name: savedAdmin.firstName + " " + savedAdmin.lastName });


    res.status(201).json({ success: true, data: savedAdmin, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering admin:', error);
    const errorMessage = error.message || 'Internal Server Error';
    res.status(500).json({ "error": errorMessage });
  }
};


//client side aauthentication
// exports.login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Sign in the user using Firebase Authentication
//     const email = `${username}@overbeck.com`
//     const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

//     const userRecord = await firebase.auth().getUserByEmail(`${username}@overbeck.com`);


//     await firebase.auth().verifyIdToken(userRecord.tokens[0]);

//     // Retrieve additional user data from Firestore
//     const userDoc = await firestore.collection('volunteers').doc(userCredential.user.uid).get();
//     const userData = userDoc.data();

//     res.status(200).json({ message: 'User logged in successfully', userData });
//   } catch (error) {
//     console.error('Error logging in user:', error);
//     res.status(401).json({ error: 'Invalid credentials' });
//   }
// };
