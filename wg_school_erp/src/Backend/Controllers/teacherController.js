

// controllers/teacherController.js
const Teacher = require('../models/Teacher');
const cloudinary = require("cloudinary").v2;
const fs = require('fs'); // To delete local files

// Create a new teacher
exports.createTeacher = async (req, res) => {
  const teacherData = { ...req.body };

  try {
  // Ensure the file exists before trying to access it
  if (fs.existsSync(req.file.path)) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "teacher_photos",
    });
    fs.unlinkSync(req.file.path); // Delete the file only after upload
  } else {
    console.error(`File not found: ${req.file.path}`);
  }
    if (req.file) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "teacher_photos",
      });
  
      // Delete local file after upload
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
  
      res.status(201).json({
        message: "File uploaded successfully",
        url: result.secure_url,
      });
      
    } else {
      res.status(400).json({ message: "No file uploaded" });
    }

      // Save the teacher data in the database
      const teacher = new Teacher(teacherData);
      await teacher.save();
      res.status(201).json({ message: "Teacher created successfully", teacher });

  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ error: error.message });
  }
  try {

    const photo = {...req.file};
    console.log(photo);

    if (photo) {
      // Upload the photo to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "teacher_photos",
      });

      // Save the photo URL to teacherData
      teacherData.photo = result.secure_url;

      // Delete the file from local storage
      fs.unlinkSync(req.file.path);
    }

    // Save the teacher data in the database
    const teacher = new Teacher(teacherData);
    await teacher.save();
    res.status(201).json({ message: "Teacher created successfully", teacher });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  

// Get all teachers
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a teacher
exports.updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTeacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
