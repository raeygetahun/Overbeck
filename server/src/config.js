require('dotenv').config();

module.exports = {
  firebaseConfig: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  },
};
