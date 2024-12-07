"use client"
import React, { useState } from 'react';

export default function ExamForm({ onAddExam }) {
  const [formData, setFormData] = useState({
    examName: '',
    subjectType: '',
    class: '',
    section: '',
    time: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onAddExam(formData);
    setFormData({
      examName: '',
      subjectType: '',
      class: '',
      section: '',
      time: '',
      date: '',
    });
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg mb-6">
      <h2 className="text-lg font-bold mb-4 text-black">Add New Exam</h2>
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="examName"
          value={formData.examName}
          onChange={handleChange}
          placeholder="Exam Name"
          className="border p-2 rounded-md w-full text-black"
        />
        
        <select
          name="subjectType"
          value={formData.subjectType}
          onChange={handleChange}
          className="border p-2 rounded-md w-full text-black"
        >
          <option value="">Select Subject Type</option>
          <option value="Mathematics">Mathematics</option>
          <option value="English">English</option>
          <option value="Chemistry">Chemistry</option>
        </select>

        <select
          name="class"
          value={formData.class}
          onChange={handleChange}
          className="border p-2 rounded-md w-full text-black"
        >
          <option value="">Select Class</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

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

        <input
          type="text"
          name="time"
          value={formData.time}
          onChange={handleChange}
          placeholder="Select Time"
          className="border p-2 rounded-md w-full text-black"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded-md w-full text-black"
        />

        <div className="col-span-1 md:col-span-2 flex space-x-4 mt-4">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded-md font-semibold"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setFormData({
              examName: '',
              subjectType: '',
              class: '',
              section: '',
              time: '',
              date: '',
            })}
            className="bg-blue-700 text-white px-4 py-2 rounded-md font-semibold"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
