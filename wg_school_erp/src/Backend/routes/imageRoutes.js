const upload = require("../middlewares/multer");
const { uploadPhoto } = require("../controllers/imageController");
const express = require("express");
const router = express.Router();


router.post("/upload", upload.single("photo"), uploadPhoto);

module.exports = router;