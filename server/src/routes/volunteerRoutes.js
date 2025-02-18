// src/routes/volunteerRoutes.js
const express = require('express');
const volunteerController = require('../controllers/volunteerController');

const router = express.Router();

router.post('/apply-for-time-slot', volunteerController.applyForTimeSlot);
router.get('/applied-time-slots/:email', volunteerController.getAppliedTimeSlots);
router.get('/my-time-slots/:email', volunteerController.getApprovedTimeSlots);

module.exports = router;
