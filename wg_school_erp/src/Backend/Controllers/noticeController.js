// controllers/noticeController.js
const Notice = require("../models/Notice");

// Add a new notice
const addNotice = async (req, res) => {
  try {
    const { title, details, postedBy, date } = req.body;
    const newNotice = new Notice({ title, details, postedBy, date });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing notice
const updateNotice = async (req, res) => {
  try {
    const { title } = req.params;
    const { details, postedBy, date } = req.body;
    const updatedNotice = await Notice.findOneAndUpdate(
      { title },
      { details, postedBy, date },
      { new: true }
    );
    if (!updatedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(200).json(updatedNotice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all notices with optional search filter
const getNotices = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    const query = searchQuery
      ? {
          $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { details: { $regex: searchQuery, $options: "i" } },
            { postedBy: { $regex: searchQuery, $options: "i" } },
          ],
        }
      : {};

    const notices = await Notice.find(query);
    res.status(200).json(notices);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  addNotice,
  updateNotice,
  getNotices,
};
