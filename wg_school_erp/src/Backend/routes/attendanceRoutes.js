const express = require('express');
const { getAttendance, saveAttendance } = require('../controllers/attendanceController');

const router = express.Router();

router.get('/', getAttendance);  // GET /api/attendance
router.post('/', saveAttendance); // POST /api/attendance

module.exports = router;
