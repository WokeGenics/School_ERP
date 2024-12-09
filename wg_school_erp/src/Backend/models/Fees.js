const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  idNo: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  due: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Paid", "Due", "Partial"],
    default: "Due",
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
  feeSchema.set('toJSON', { getters: true });
  feeSchema.set('toObject', { getters: true });
module.exports = mongoose.model("Fee", feeSchema);
