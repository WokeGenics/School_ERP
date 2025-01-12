"use client"
import React, { useState } from "react";

function UploadImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadStatus("Please select a file first.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setUploadStatus("Uploading...");

      // Make request to your backend route
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed.");
      }

      const data = await response.json();
      setImageUrl(data.url);
      setUploadStatus("Upload successful!");
    } catch (error) {
      console.error(error);
      setUploadStatus("Error uploading file.");
    }
  };

  return (
    <div>
      <h1>Upload an Image to Cloudinary</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      <p>{uploadStatus}</p>

      {imageUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded" style={{ width: "300px" }} />
        </div>
      )}
    </div>
  );
}

export default UploadImage;
