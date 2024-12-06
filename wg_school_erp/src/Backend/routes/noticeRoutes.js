// routes/noticeRoutes.js
const express = require("express");
const router = express.Router();
const noticeController = require("../controllers/noticeController");

// POST route to add a new notice
router.post("/", noticeController.addNotice);

// PUT route to update a notice by title
router.put("/:title", noticeController.updateNotice);

// GET route to get all notices, with an optional search query
router.get("/", noticeController.getNotices);

module.exports = router;
