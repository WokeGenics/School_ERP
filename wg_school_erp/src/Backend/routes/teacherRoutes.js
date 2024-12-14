const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const upload = require('../middlewares/multer')

// Routes
router.post('/teachers', upload.single('photo'), teacherController.createTeacher);
router.get('/teachers', teacherController.getTeachers);
router.get('/teachers/:id', teacherController.getTeacherById);
router.put('/teachers/:id', teacherController.updateTeacher);
router.delete('/teachers/:id', teacherController.deleteTeacher);

module.exports = router;
