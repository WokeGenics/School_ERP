// server/controllers/studentController.js
const Student = require("../models/Student");
const cloudinary = require("../config/cloudinary");
const { PassThrough } = require("stream");

// CREATE a new student
const createStudent = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      gender,
      dob,
      roll,
      bloodGroup,
      religion,
      email,
      studentClass,
      section,
      admissionId,
      phone,
      bio,
    } = req.body;

    let photoURL = null;

    // If a file is uploaded, upload to Cloudinary
    if (req.file) {
      const bufferStream = new PassThrough();
      bufferStream.end(req.file.buffer);

      // Upload the buffer to Cloudinary
      const cloudinaryUpload = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "students_photos" }, // optional folder name on Cloudinary
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        bufferStream.pipe(uploadStream);
      });

      photoURL = cloudinaryUpload.secure_url;
    }

    // Create new Student document
    const newStudent = new Student({
      first_name,
      last_name,
      gender,
      dob,
      roll,
      bloodGroup,
      religion,
      email,
      studentClass,
      section,
      admissionId,
      phone,
      bio,
      photo: photoURL,
    });

    const savedStudent = await newStudent.save();
    return res
      .status(201)
      .json({ Message: "The student has been created", student: savedStudent });
  } catch (error) {
    console.error("createStudent error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};
// GET all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    return res.status(200).json({ students });
  } catch (error) {
    console.error("getAllStudents error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

// GET a single student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ Message: "Student not found" });
    }
    return res.status(200).json({ student });
  } catch (error) {
    console.error("getStudentById error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

// UPDATE a student by ID
const updateStudent = async (req, res) => {
  try {
    let photoURL = null;

    // If a new file is uploaded, re-upload to Cloudinary
    if (req.file) {
      const bufferStream = new PassThrough();
      bufferStream.end(req.file.buffer);

      const cloudinaryUpload = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "students_photos" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        bufferStream.pipe(uploadStream);
      });

      photoURL = cloudinaryUpload.secure_url;
    }

    // Build the update object
    const updateData = {
      ...req.body,
    };
    if (photoURL) {
      updateData.photo = photoURL;
    }

    // Find student by ID and update
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // return the updated doc
    );

    if (!updatedStudent) {
      return res.status(404).json({ Message: "Student not found" });
    }

    return res
      .status(200)
      .json({ Message: "The student has been updated", student: updatedStudent });
  } catch (error) {
    console.error("updateStudent error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

// DELETE a student by ID
const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ Message: "Student not found" });
    }
    return res.status(200).json({ Message: "The student has been deleted" });
  } catch (error) {
    console.error("deleteStudent error:", error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
