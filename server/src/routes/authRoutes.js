const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/volunteer-register', authController.volunteerRegister);
router.post('/admin-register', authController.adminRegister);
// router.post('/login', authController.login); client side authentication 

module.exports = router;
