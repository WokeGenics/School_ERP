const Fee = require("../models/Fees");

// Create a new fee record
exports.createFee = async (req, res) => {
  try {
    const fee = new Fee(req.body);
    const savedFee = await fee.save();
    res.status(201).json(savedFee);
  } catch (error) {
    console.error("Error creating fee:", error);
    res.status(500).json({ error: "Failed to create fee record" });
  }
};

// Get all fee records
exports.getFees = async (req, res) => {
  try {
    const fees = await Fee.find();
    res.status(200).json(fees);
  } catch (error) {
    console.error("Error fetching fees:", error);
    res.status(500).json({ error: "Failed to fetch fees" });
  }
};

// Get a specific fee record by ID
exports.getFeeById = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);
    if (!fee) {
      return res.status(404).json({ error: "Fee record not found" });
    }
    res.status(200).json(fee);
  } catch (error) {
    console.error("Error fetching fee:", error);
    res.status(500).json({ error: "Failed to fetch fee record" });
  }
};

// Update a specific fee record
exports.updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fee) {
      return res.status(404).json({ error: "Fee record not found" });
    }
    res.status(200).json(fee);
  } catch (error) {
    console.error("Error updating fee:", error);
    res.status(500).json({ error: "Failed to update fee record" });
  }
};

// Delete a specific fee record
exports.deleteFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);
    if (!fee) {
      return res.status(404).json({ error: "Fee record not found" });
    }
    res.status(200).json({ message: "Fee record deleted successfully" });
  } catch (error) {
    console.error("Error deleting fee:", error);
    res.status(500).json({ error: "Failed to delete fee record" });
  }
};
