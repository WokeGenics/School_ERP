const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");

// Configure multer - here we're storing the file in a temporary folder
// before uploading it to Cloudinary
const upload = multer({
    dest: path.join(__dirname, "..", "uploads"),
  });


cloudinary.config({
  cloud_name: 'dezb750jt',
  api_key: '758983658511416',
  api_secret: 'oEisW5SD4TWos-keYboBNZTwz4w',
});

// POST /api/upload - handle file uploading
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // req.file.path is the path to the uploaded file on our server
    const result = await cloudinary.uploader.upload(req.file.path);

    // Optionally, delete the file from the server (since it's now on Cloudinary)
    fs.unlinkSync(req.file.path);

    // Send back the URL to the newly uploaded image
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while uploading." });
  }
});

module.exports = router;
