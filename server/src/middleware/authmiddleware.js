const admin = require('firebase-admin');

const authenticateUser = (req, res, next) => {
  // Check if the request has a valid Firebase ID token
  const idToken = req.headers.authorization;
  
  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      console.error('Error verifying ID token:', error);
      res.status(401).json({ error: 'Unauthorized' });
    });
};

module.exports = {
  authenticateUser,
};
