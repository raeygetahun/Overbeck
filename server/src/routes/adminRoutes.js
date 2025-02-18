const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.post('/verify-time-slot-application', adminController.verifyTimeSlotApplication);
router.post('/verify-new-volunteer-application', adminController.verifyNewVolunteerApplication);
router.delete('/delete-application', adminController.deleteApplication);
router.put('/update-application', adminController.updateApplication);
router.get('/pending-volunteers', adminController.getPendingVolunteers);
router.get('/approved-volunteers', adminController.getApprovedVolunteers);

module.exports = router;
