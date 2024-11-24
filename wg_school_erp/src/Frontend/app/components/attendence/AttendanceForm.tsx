"use Client";

import React, { useState } from 'react';

export default function AttendanceForm({ onSave, onReset }) {
  const [formData, setFormData] = useState({
    class: '',
    section: '',
    month: '',
    session: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleReset = () => {
    setFormData({
      class: '',
      section: '',
      month: '',
      session: '',
    });
    onReset();
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg mb-6">
      <h2 className="text-lg font-bold mb-4 text-black">Student Attendance</h2>
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Select Class */}
        <div>
          <label className="block font-semibold mb-1 text-black">Select Class</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="border p-2 rounded-md w-full text-black"
          >
            <option value="">Select Class</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        {/* Select Section */}
        <div>
          <label className="block font-semibold mb-1 text-black">Select Section</label>
          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="border p-2 rounded-md w-full text-black"
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>

        {/* Select Month */}
        <div>
          <label className="block font-semibold mb-1 text-black">Select Month</label>
          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="border p-2 rounded-md w-full text-black"
          >
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
          </select>
        </div>

        {/* Select Session */}
        <div>
          <label className="block font-semibold mb-1 text-black">Select Session</label>
          <select
            name="session"
            value={formData.session}
            onChange={handleChange}
            className="border p-2 rounded-md w-full text-black"
          >
            <option value="">Select Session</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="col-span-1 md:col-span-4 flex space-x-4 mt-4">
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
