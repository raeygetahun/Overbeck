const express = require('express');
const authRoutes = require('./authRoutes');
const volunteerRoutes = require('./volunteerRoutes');
const adminRoutes = require('./adminRoutes');
const applicationRoutes = require('./applicationRoutes');
// const { authenticateUser } = require('../middleware/authMiddleware');


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/volunteer', volunteerRoutes);
router.use('/admin', adminRoutes);
router.use('/application', applicationRoutes);

module.exports = router;
