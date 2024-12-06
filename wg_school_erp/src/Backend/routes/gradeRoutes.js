const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');

// GET all grades
router.get('/', gradeController.getAllGrades);

// POST a new grade
router.post('/', gradeController.createGrade);

// PUT update a grade
router.put('/:id', gradeController.updateGrade);

// DELETE a grade
router.delete('/:id', gradeController.deleteGrade);

module.exports = router;
