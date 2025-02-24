'use client';
import React, { useState } from 'react';

export default function AddClassRoutineForm({ onAddRoutine }) {
  const [formData, setFormData] = useState({
   day: '' ,
      class: '' , 
      subject: '' ,
      section: '' ,
      teacher: '' ,
      time: '' ,
      date: '' ,

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Routine added:', formData);
    onAddRoutine(formData);  // Pass form data to the parent component
    alert('Class routine added successfully!');
    setFormData({
     
      day: '' ,
      class: '' , 
      subject: '' ,
      section: '' ,
      teacher: '' ,
      time: '' ,
      date: '' ,
    });  // Reset form after saving
  };

  const handleReset = () => {
    setFormData({
      day: '' ,
      class: '' , 
      subject: '' ,
      section: '' ,
      teacher: '' ,
      time: '' ,
      date: '' ,
    });
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg w-full md:w-1/3">
      <h2 className="text-lg font-bold mb-4 text-black">Add Class Routine</h2>
      <form onSubmit={handleSave} className="space-y-4">
        
        {/* Day */}
        <div>
          <label className="block font-semibold mb-1 text-black">Day *</label>
          <input
            type="text"
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="border p-2 rounded-md w-full text-black"
            required
          />
        </div>

        {/* Subject Name */}

        <div>
          <label className="block font-semibold mb-1 text-black">class</label>
          <input
            type="text"
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="border p-2 rounded-md w-full text-black"
            required
          />
        </div>

        {/* Subject Type */}
        <div>
          <label className="block font-semibold mb-1 text-black">Subject</label>
          <select
            name="subject"
            value={formData.subject}
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
          <label className="block font-semibold mb-1 text-black">section</label>
          <select
            name="section"
            value={formData.section}
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

        {/* Section */}
        <div>
          <label className="block font-semibold mb-1 text-black">teacher</label>
          <input
            type="text"
            name="teacher"
            value={formData.teacher}
            onChange={handleChange}
            className="border p-2 rounded-md w-full text-black"
            required
          />
        </div>


       

        {/* Time */}
        <div>
          <label className="block font-semibold mb-1 text-black">Time *</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border p-2 rounded-md w-full text-black"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block font-semibold mb-1 text-black">Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded-md w-full text-black"
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
