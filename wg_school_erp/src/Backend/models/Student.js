// models/Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    roll: { type: String },
    bloodGroup: { type: String, required: true },
    religion: { type: String, required: true, },
    email: { type: String, required:true, },
    studentClass: { type: String, required: true },
    section: { type: String, required: true },
    admissionId: { type: String },
    phone: { type: String },
    bio: { type: String },
    // Will store Cloudinary URL of the uploaded photo
    photo: { type: String },
 
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
