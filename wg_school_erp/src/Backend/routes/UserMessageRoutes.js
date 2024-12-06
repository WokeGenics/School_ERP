// routes/userMessageRoutes.js
const express = require("express");
const router = express.Router();
const userMessageController = require("../controllers/userMessageController");


// User Routes
router.post("/users", userMessageController.addUser);
router.get("/users", userMessageController.getUsers);

// Message Routes
router.post("/messages", userMessageController.sendMessage);
router.get("/messages", userMessageController.getMessages);
router.delete("/messages/:id", userMessageController.deleteMessage);

module.exports = router;
