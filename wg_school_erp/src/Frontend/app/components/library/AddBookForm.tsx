"use client";
import React, { useState } from 'react';

export default function AddBookForm() {
  const [formData, setFormData] = useState({
    bookName: '',
    subject: '',
    writer: '',
    class: '',
    publishedYear: '',
    creatingDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Book added successfully!');
    // Optionally, send data to a backend server here
  };

  const handleReset = () => {
    setFormData({
      bookName: '',
      subject: '',
      writer: '',
      class: '',
      publishedYear: '',
      creatingDate: '',
    });
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSave} className="grid gap-4">
        
        {/* Book Name */}
        <div>
          <label className="block font-semibold mb-1">Book Name *</label>
          <input
            type="text"
            name="bookName"
            value={formData.bookName}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block font-semibold mb-1">Subject *</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Writer */}
        <div>
          <label className="block font-semibold mb-1">Writer *</label>
          <input
            type="text"
            name="writer"
            value={formData.writer}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Class */}
        <div>
          <label className="block font-semibold mb-1">Class *</label>
          <input
            type="text"
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Published Year */}
        <div>
          <label className="block font-semibold mb-1">Published Year *</label>
          <input
            type="number"
            name="publishedYear"
            value={formData.publishedYear}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Creating Date */}
        <div>
          <label className="block font-semibold mb-1">Creating Date *</label>
          <input
            type="date"
            name="creatingDate"
            value={formData.creatingDate}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
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
