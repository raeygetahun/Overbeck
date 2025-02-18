const express = require('express');
const applicationController = require('../controllers/applicationController');

const router = express.Router();

router.get('/approved-timeslots', applicationController.getApprovedApplications);
router.get('/pending-timeslots', applicationController.getPendingApplications);

module.exports = router;
