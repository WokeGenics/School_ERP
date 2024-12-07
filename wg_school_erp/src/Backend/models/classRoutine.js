const mongoose = require('mongoose');


  const classRoutineSchema = new mongoose.Schema({
    day: {
      type: String,
      required: true,
   
    },
    class: {
      type: String,
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
    teacher: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true, // Could be in a time format (HH:MM AM/PM)
    },
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
  }, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  });
  // Enable getters to transform output
  classRoutineSchema.set('toJSON', { getters: true });
  classRoutineSchema.set('toObject', { getters: true });

  module.exports = mongoose.model('ClassRoutine', classRoutineSchema);
  

