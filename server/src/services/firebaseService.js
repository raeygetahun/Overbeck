const admin = require('firebase-admin');
const config = require('../config');

admin.initializeApp({
  credential: admin.credential.cert(config.firebaseConfig.privateKey),
  databaseURL: `https://${config.firebaseConfig.projectId}.firebaseio.com`,
});

module.exports = admin;
