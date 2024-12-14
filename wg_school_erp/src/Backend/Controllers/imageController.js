// controllers/teacherController.js
const Image = require("../models/Teacher");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.uploadPhoto = async (req, res) => {

   try{ let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "teachers",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    await teacher.save();

    // Delete the local file
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: "Teacher photo uploaded and saved successfully",
      teacher,
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ message: "Failed to upload image", error: error.message });
  }
};
