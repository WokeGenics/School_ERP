"use client";
import React, { useState } from "react";

export default function TeacherForm() {
  const [formData, setFormData] = useState({
    name: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, photo: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("photo", formData.photo);

    try {
      const response = await fetch("http://localhost:5000/api/teachers/upload", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Image uploaded successfully!");
        console.log("Response:", data);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Photo:
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
}
