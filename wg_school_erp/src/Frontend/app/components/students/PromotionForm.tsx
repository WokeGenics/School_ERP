"use client";
import React, { useState } from 'react';

export default function PromotionForm() {
  const [formData, setFormData] = useState({
    currentSession: '',
    promoteSession: '',
    fromClass: '',
    toClass: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Promotion search saved successfully!');
    // Here, you could also send the data to a backend server for further processing
  };

  const handleReset = () => {
    setFormData({
      currentSession: '',
      promoteSession: '',
      fromClass: '',
      toClass: '',
    });
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Search Student Promotion</h2>
      <form onSubmit={handleSave} className="grid grid-cols-4 gap-4">
        
        {/* Current Session */}
        <div>
          <label className="block font-semibold mb-1">Current Session *</label>
          <select
            name="currentSession"
            value={formData.currentSession}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Please Select *</option>
            <option value="2017-2018">2017-2018</option>
            <option value="2018-2019">2018-2019</option>
            <option value="2019-2020">2019-2020</option>
            <option value="2020-2021">2020-2021</option>
          </select>
        </div>

        {/* Promote Session */}
        <div>
          <label className="block font-semibold mb-1">Promote Session *</label>
          <select
            name="promoteSession"
            value={formData.promoteSession}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Please Select *</option>
            <option value="2017-2018">2017-2018</option>
            <option value="2018-2019">2018-2019</option>
            <option value="2019-2020">2019-2020</option>
            <option value="2020-2021">2020-2021</option>
          </select>
        </div>

        {/* Promotion From Class */}
        <div>
          <label className="block font-semibold mb-1">Promotion From Class *</label>
          <select
            name="fromClass"
            value={formData.fromClass}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Please Select *</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
            <option value="4">Class 4</option>
            <option value="5">Class 5</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>
        </div>

        {/* Promotion To Class */}
        <div>
          <label className="block font-semibold mb-1">Promotion To Class *</label>
          <select
            name="toClass"
            value={formData.toClass}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Please Select *</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
            <option value="4">Class 4</option>
            <option value="5">Class 5</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>
        </div>

        {/* Save and Reset Buttons */}
        <div className="col-span-4 flex space-x-4 mt-4">
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
