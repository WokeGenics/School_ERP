// controllers/userMessageController.js
const UserContact = require("../models/UserContact");
const MessageRecord = require("../models/Message");
const mongoose = require('mongoose'); 
const addUser = async (req, res) => {
  try {
    const { name, email, contact, role } = req.body;
    const newUser = new UserContact({ name, email, contact, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const getUsers = async (req, res) => {
    try {
      const { name, role, email, contact } = req.query;
      const query = {};
  
      // Apply query filters only if the respective query parameters are provided
      if (name) query.name = { $regex: name, $options: "i" }; // case-insensitive regex search
      if (role) query.role = { $regex: role, $options: "i" };
      if (email) query.email = { $regex: email, $options: "i" };
      if (contact) query.contact = { $regex: contact, $options: "i" };
  
      // Fetch users from the database using the query object
      const users = await UserContact.find(query);
  
      // If no users found, return a message
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found matching the given filters" });
      }
  
      // Successfully found users
      res.status(200).json(users);
    } catch (err) {
      // Handle errors and provide appropriate error message
      console.error("Error fetching users:", err.message);
      res.status(500).json({ message: "Server error, please try again later." });
    }
  };
  

const sendMessage = async (req, res) => {
  try {
    const { title, body, recipients } = req.body;
    const newMessage = new MessageRecord({
      title,
      body,
      recipients,
      date: new Date(),
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await MessageRecord.find().populate("recipients");
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete message record
const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid message ID' });
    }

    // Delete the message record
    const deletedMessage = await MessageRecord.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Error deleting message' });
  }
};



module.exports = { addUser, getUsers, sendMessage, getMessages, deleteMessage };
