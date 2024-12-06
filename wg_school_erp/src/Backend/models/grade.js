const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  gradeName: { type: String, required: true },
  gradePoint: { type: String, required: true },
  percentFrom: { type: Number, required: true },
  percentUpTo: { type: Number, required: true },
  comment: { type: String, required: false },
});

module.exports = mongoose.model('Grade', gradeSchema);
