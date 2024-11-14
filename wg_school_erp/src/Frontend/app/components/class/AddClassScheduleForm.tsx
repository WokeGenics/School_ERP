"use client";
import React, { useState } from 'react';

export default function AddClassScheduleForm() {
  const [formData, setFormData] = useState({
    teacherName: '',
    idNo: '',
    gender: '',
    subject: '',
    section: '',
    time: '',
    phone: '',
    email: '',
    class: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Class schedule added successfully!');
    // Optionally, send data to a backend server here
  };

  const handleReset = () => {
    setFormData({
      teacherName: '',
      idNo: '',
      gender: '',
      subject: '',
      section: '',
      time: '',
      phone: '',
      email: '',
      class: '',
      date: '',
    });
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Class Schedule</h2>
      <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
        
        {/* Teacher Name */}
        <div>
          <label className="block font-semibold mb-1">Teacher Name *</label>
          <input
            type="text"
            name="teacherName"
            value={formData.teacherName}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* ID No */}
        <div>
          <label className="block font-semibold mb-1">ID No *</label>
          <input
            type="text"
            name="idNo"
            value={formData.idNo}
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
            <option value="">Please Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block font-semibold mb-1">Subject *</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Please Select</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
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
            <option value="">Please Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        {/* Time */}
        <div>
          <label className="block font-semibold mb-1">Time *</label>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            placeholder="e.g., 10:00 am - 11:30 am"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold mb-1">Phone *</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* E-Mail */}
        <div>
          <label className="block font-semibold mb-1">E-Mail *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Class */}
        <div>
          <label className="block font-semibold mb-1">Class *</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Please Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block font-semibold mb-1">Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
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
