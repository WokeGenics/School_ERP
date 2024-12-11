const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  idNo:{ type: Number, required:true},
  bookName: { type: String, required: true },
  subject: { type: String, required: true },
  writer: { type: String, required: true },
  class: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  creatingDate: { type: Date, required: true },
  
});

module.exports = mongoose.model('Books', bookSchema);
