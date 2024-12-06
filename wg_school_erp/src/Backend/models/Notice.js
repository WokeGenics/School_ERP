// models/Notice.js
const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
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
});

// Enable getters to transform output
noticeSchema.set('toJSON', { getters: true });
noticeSchema.set('toObject', { getters: true });

const Notice = mongoose.model("Notice", noticeSchema);
module.exports = Notice;
