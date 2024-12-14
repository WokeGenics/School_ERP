const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

// Routes for expenses
router.post("/", expenseController.addExpense);
router.get("/", expenseController.getAllExpenses);
router.get("/:id", expenseController.getExpenseById);
router.put("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;