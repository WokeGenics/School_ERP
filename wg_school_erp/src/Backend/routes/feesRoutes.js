const express = require("express");
const router = express.Router();
const feeController = require("../controllers/feeController");

// Create a new fee record
router.post("/", feeController.createFee);

// Get all fee records
router.get("/", feeController.getFees);

// Get a specific fee record by ID
router.get("/:id", feeController.getFeeById);

// Update a specific fee record
router.put("/:id", feeController.updateFee);

// Delete a specific fee record
router.delete("/:id", feeController.deleteFee);

module.exports = router;
