const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  attendance: { type: [String], required: true }, // Array of 'Present' or 'Absent'
});

const attendanceSchema = new mongoose.Schema({
  class: { type: String, required: true },
  section: { type: String, required: true },
  month: { type: String, required: true },
  session: { type: String, required: true },
  students: { type: [studentSchema], required: true },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
