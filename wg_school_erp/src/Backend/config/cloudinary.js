// config/cloudinary.js
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

// Configure your Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // or just "example"
  api_key: process.env.CLOUDINARY_API_KEY,       // or "123456"
  api_secret: process.env.CLOUDINARY_API_SECRET, // or "abcdefg"
});

module.exports = cloudinary;
