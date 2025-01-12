// server/routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// Use memory storage so req.file.buffer is available
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("photo"), createStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", upload.single("photo"), updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
