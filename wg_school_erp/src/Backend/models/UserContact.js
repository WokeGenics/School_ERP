// models/User.js
const mongoose = require("mongoose");

const userContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "User",
  },
});

const User = mongoose.model("UserContact", userContactSchema);

module.exports = User;
