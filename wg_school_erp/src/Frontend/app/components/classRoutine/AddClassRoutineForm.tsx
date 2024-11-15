"use client";
import React, { useState } from 'react';

export default function AddClassRoutineForm() {
  const [formData, setFormData] = useState({
    subjectName: '',
    subjectType: '',
    class: '',
    code: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Routine added:', formData);
    alert('Class routine added successfully!');
  };

  const handleReset = () => {
    setFormData({
      subjectName: '',
      subjectType: '',
      class: '',
      code: '',
    });
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg w-full md:w-1/3">
      <h2 className="text-lg font-bold mb-4 text-black">Add Class Routine</h2>
      <form onSubmit={handleSave} className="space-y-4">
        
        {/* Subject Name */}
        <div>
          <label className="block font-semibold mb-1 text-black">Subject Name *</label>
          <input
            type="text"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
            className="border p-2 rounded-md w-full text-black"
            required
          />
        </div>

        {/* Subject Type */}
        <div>
          <label className="block font-semibold mb-1 text-black">Subject Type *</label>
          <select
            name="subjectType"
            value={formData.subjectType}
            onChange={handleChange}
            className="border p-2 rounded-md w-full text-black"
            required
          >
            <option value="">Please Select</option>
            <option value="Lecture">Lecture</option>
            <option value="Lab">Lab</option>
          </select>
        </div>

        {/* Class */}
        <div>
          <label className="block font-semibold mb-1 text-black">Select Class *</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="border p-2 rounded-md w-full text-black"
            required
          >
            <option value="">Please Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        {/* Code */}
        <div>
          <label className="block font-semibold mb-1 text-black">Select Code</label>
          <select
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="border p-2 rounded-md w-full text-black"
          >
            <option value="">Please Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        {/* Save and Reset Buttons */}
        <div className="flex space-x-4 mt-4">
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
