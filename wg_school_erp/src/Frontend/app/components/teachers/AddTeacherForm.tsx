"use client";

import React, { useState } from "react";

export default function AddExpenseForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    idNo: '',
    bloodGroup: '',
    religion: '',
    email: '',
    class: '',
    section: '',
    address: '',
    phone: '',
    bio:  '',
    image: null, 
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "image" && formData.image) {
        formDataObj.append(key, formData.image); // Append file
      } else {
        formDataObj.append(key, formData[key]); // Append other fields
      }
    });

    try {
      const response = await fetch("http://localhost:5000/api/teachers", {
        method: "POST",
        body: formDataObj,
      });

      if (!response.ok) throw new Error("Failed to save teacher data");
      const data = await response.json();
      alert("Teacher data saved successfully!");
      console.log("Response:", data);
    } catch (error) {
      console.error("Error saving teacher:", error);
      alert("Failed to save teacher data");
    }
  };

  

  const handleReset = () => {
    setFormData({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    idNo: '',
    bloodGroup: '',
    religion: '',
    email: '',
    class: '',
    section: '',
    address: '',
    phone: '',
    bio:  '',
    image: '', 
    });
  };
  return (
    <div className="bg-white shadow-md p-6 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Expense</h2>
      <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
        
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Last Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* ID No */}
        <div>
          <label className="block font-semibold mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Expense Type */}
        <div>
          <label className="block font-semibold mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Please Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block font-semibold mb-1">DOB </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Id No.</label>
          <input
            type="text"
            name="idNo"
            value={formData.idNo}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Blood Group</label>
        
           <select
    
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Please Select Group *</option>
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
            <option value="">Please Select Religion *</option>
            <option value="Islam">Islam</option>
            <option value="Christianity">Christianity</option>
            <option value="Hinduism">Hinduism</option>
            <option value="Buddhism">Buddhism</option>
          </select>
        </div>
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
        <div>
          <label className="block font-semibold mb-1">Class *</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Please Select Class *</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
            <option value="4">Class 4</option>
            <option value="5">Class 5</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Section *</label>
          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Please Select Section *</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
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
            rows="4"
          ></textarea>
        </div>

        {/* Photo Upload */}
        <div className="col-span-2">
          <label className="block font-semibold mb-1">Upload Teacher Photo (150px X 150px)</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="border p-2 rounded-md w-full"
           />
        </div>
        {/* Save and Reset Buttons */}
        <div className="col-span-2 flex space-x-4 mt-4">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded-md font-semibold"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-blue-700 text-white px-4 py-2 rounded-md font-semibold"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}