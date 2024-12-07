const express = require('express');
const { getExams, addExam } = require('../controllers/examController');

const router = express.Router();

router.get('/', getExams);  // GET /api/exams
router.post('/', addExam); // POST /api/exams

module.exports = router;
