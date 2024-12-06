const express = require('express');
const router = express.Router();
const classRoutineController = require('../controllers/classRoutineController');

// GET all class routines
router.get('/', classRoutineController.getAllClassRoutines);

// POST a new class routine
router.post('/', classRoutineController.createClassRoutine);

// PUT update a class routine
router.put('/:id', classRoutineController.updateClassRoutine);

// DELETE a class routine
router.delete('/:id', classRoutineController.deleteClassRoutine);

module.exports = router;
