const express = require('express');
const router = express.Router();
const { addSchedule, getAllSchedules } = require('../controllers/classScheduleController');

// POST route for adding a class schedule
router.post('/class-schedule', addSchedule);
router.get('/class-schedule', getAllSchedules)

module.exports = router;
