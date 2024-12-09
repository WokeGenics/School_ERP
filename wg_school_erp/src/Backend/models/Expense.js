const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idNo: { type: String, required: true },
  expenseType: { type: String, required: true },
  amount: { type: Number, required: true },
  phone: { type: String },
  email: { type: String },
  status: { type: String, enum: ["Paid", "Due"], default: "Due" },
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
}, { timestamps: true });
  // Enable getters to transform output
  ExpenseSchema.set('toJSON', { getters: true });
  ExpenseSchema.set('toObject', { getters: true });
module.exports = mongoose.model("Expense", ExpenseSchema);
