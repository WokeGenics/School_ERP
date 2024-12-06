// models/MessageRecord.js
const mongoose = require("mongoose");

const messageRecordSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  recipients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserContact", // References the User model
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const MessageRecord = mongoose.model("MessageRecord", messageRecordSchema);

module.exports = MessageRecord;
