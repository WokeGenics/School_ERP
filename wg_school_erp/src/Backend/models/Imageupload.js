// models/Teacher.js
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true }, // Store Cloudinary URL
}, { timestamps: true });

module.exports = mongoose.model("Image", imageSchema);
