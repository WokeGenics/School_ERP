"use client";
import React, { useState } from "react";

const AddContactForm = ({ onAddContact }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.contact ) {
      alert("Please fill in all fields.");
     
      return;
    }

    onAddContact(formData);
    setFormData({ name: "", email: "", contact: "", role: "" });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">Add Contact Manually</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2"
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default AddContactForm;
