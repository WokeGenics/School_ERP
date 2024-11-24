"use client";
import React, { useState } from "react";

const NoticeForm = ({ onAddNotice }) => {
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    postedBy: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.details && formData.postedBy && formData.date) {
      onAddNotice(formData);
      setFormData({ title: "", details: "", postedBy: "", date: "" });
    }
  };

  const handleReset = () => {
    setFormData({ title: "", details: "", postedBy: "", date: "" });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Create A Notice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <textarea
          name="details"
          placeholder="Details"
          value={formData.details}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          rows="4"
          required
        />
        <input
          type="text"
          name="postedBy"
          placeholder="Posted By"
          value={formData.postedBy}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeForm;
