const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  examName: { type: String, required: true },
  subjectType: { type: String, required: true },
  class: { type: String, required: true },
  section: { type: String, required: true },
  time: { type: String, required: true },
  date: { 
    type: Date, 
    required: true,
    get: function(value) {
      return value ? value.toISOString().split('T')[0] : null;
    }, // Format when retrieving
    set: function(value) {
      return new Date(value);
    }, // Ensure proper date format when saving
  },
});

// Enable getters to transform output
examSchema.set('toJSON', { getters: true });
examSchema.set('toObject', { getters: true });

module.exports = mongoose.model('Exam', examSchema);
