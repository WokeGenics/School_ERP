"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormDataType {
  first_name: string;
  last_name: string;
  gender: string;
  dob: string;
  roll: string;
  bloodGroup: string;
  religion: string;
  email: string;
  studentClass: string;
  section: string;
  admissionId: string;
  phone: string;
  bio: string;
}

export default function AddStudentForm() {
  const [formData, setFormData] = useState<FormDataType>({
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    roll: "",
    bloodGroup: "",
    religion: "",
    email: "",
    studentClass: "",
    section: "",
    admissionId: "",
    phone: "",
    bio: "",
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle text/select changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "photo") {
      const file = e.target.files?.[0];
      if (!file) return;

      // Convert file to DataURL for preview
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2 && typeof reader.result === "string") {
          setPhotoPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);

      // Store the raw file object
      setPhoto(file);
    }
  };

  // Submit form data as multipart/form-data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof FormDataType];
        if (value) {
          formDataToSend.append(key, value);
        }
      });

      // Append file if available
      if (photo) {
        formDataToSend.append("photo", photo);
      }

      // Make the POST request
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      console.log(formData)
      if (data.Message === "The student has been created") {
        toast.success(data.Message);
        handleReset();
      } else {
        toast.error(data.Message || "An error occurred");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      first_name: "",
      last_name: "",
      gender: "",
      dob: "",
      roll: "",
      bloodGroup: "",
      religion: "",
      email: "",
      studentClass: "",
      section: "",
      admissionId: "",
      phone: "",
      bio: "",
    });
    setPhoto(null);
    setPhotoPreview(null);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
      <ToastContainer />

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4" encType="multipart/form-data">
        {/* First Name */}
        <div>
          <label className="block font-semibold mb-1">First Name *</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-semibold mb-1">Last Name *</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block font-semibold mb-1">Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Select Gender...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block font-semibold mb-1">Date of Birth *</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Roll */}
        <div>
          <label className="block font-semibold mb-1">Roll</label>
          <input
            type="text"
            name="roll"
            value={formData.roll}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block font-semibold mb-1">Blood Group *</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Select Blood Group...</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        {/* Religion */}
        <div>
          <label className="block font-semibold mb-1">Religion *</label>
          <select
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Select Religion...</option>
            <option value="Islam">Islam</option>
            <option value="Christianity">Christianity</option>
            <option value="Hinduism">Hinduism</option>
            <option value="Buddhism">Buddhism</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Class */}
        <div>
          <label className="block font-semibold mb-1">Class *</label>
          <select
            name="studentClass"
            value={formData.studentClass}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Select Class...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        {/* Section */}
        <div>
          <label className="block font-semibold mb-1">Section *</label>
          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Select Section...</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        {/* Admission ID */}
        <div>
          <label className="block font-semibold mb-1">Admission ID</label>
          <input
            type="text"
            name="admissionId"
            value={formData.admissionId}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Short BIO */}
        <div className="col-span-2">
          <label className="block font-semibold mb-1">Short BIO</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            rows={4}
          />
        </div>

        {/* Photo Upload */}
        <div className="col-span-2">
          <label className="block font-semibold mb-1">Upload Student Photo</label>
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Photo Preview"
              className="w-24 h-24 object-cover mb-2"
            />
          )}
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Save/Reset Buttons */}
        <div className="col-span-2 flex space-x-4 mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md font-semibold text-white 
              ${isSubmitting ? "bg-gray-500" : "bg-yellow-500 hover:bg-yellow-600"}`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-blue-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-800"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
