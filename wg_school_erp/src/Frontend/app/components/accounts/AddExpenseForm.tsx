"use client";
import React, { useState } from 'react';

export default function AddExpenseForm() {
  const [formData, setFormData] = useState({
    name: '',
    idNo: '',
    expenseType: '',
    amount: '',
    phone: '',
    email: '',
    status: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Expense added successfully!');
    // Optionally, send data to a backend server here
  };

  const handleReset = () => {
    setFormData({
      name: '',
      idNo: '',
      expenseType: '',
      amount: '',
      phone: '',
      email: '',
      status: '',
      date: '',
    });
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Expense</h2>
      <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
        
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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

        {/* Expense Type */}
        <div>
          <label className="block font-semibold mb-1">Expense Type *</label>
          <select
            name="expenseType"
            value={formData.expenseType}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Please Select</option>
            <option value="Salary">Salary</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block font-semibold mb-1">Amount *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
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

        {/* Email Address */}
        <div>
          <label className="block font-semibold mb-1">E-Mail Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-semibold mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          >
            <option value="">Please Select</option>
            <option value="Paid">Paid</option>
            <option value="Due">Due</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block font-semibold mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
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
