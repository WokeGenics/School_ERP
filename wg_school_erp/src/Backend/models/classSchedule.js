const mongoose = require('mongoose');

// Schema definition
const ScheduleSchema = new mongoose.Schema({
  teacherName: {
    type: String,
    required: true,
  },
  idNo: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  class: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('ClassSchedule', ScheduleSchema);
