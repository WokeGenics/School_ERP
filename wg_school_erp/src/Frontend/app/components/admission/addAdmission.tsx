"use client";
import React, { useState } from 'react';

export default function AddAdmission({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    admissionNumber: '',
    admissionDate: '',
    admissionClass:'',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    countryCode: '',
    mobileNumber: '',
    alternateMobileNumber: '',
    email: '',
    previousSchool: '',
    siblings: false,
    parentalStatus: '',
    fatherName: '',
    fatherDOB: '',
    fatherOccupation: '',
    motherName: '',
    motherDOB: '',
    motherOccupation: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onFormSubmit(formData);
    alert('Admission added successfully!');
    setFormData({
      admissionNumber: '',
      admissionDate: '',
      admissionClass:'',
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      countryCode: '',
      mobileNumber: '',
      alternateMobileNumber: '',
      email: '',
      previousSchool: '',
      siblings: false,
      parentalStatus: '',
      fatherName: '',
      fatherDOB: '',
      fatherOccupation: '',
      motherName: '',
      motherDOB: '',
      motherOccupation: '',
    });
  };

  const handleReset = () => {
    setFormData({
      admissionNumber: '',
      admissionDate: '',
      admissionClass:'',
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      countryCode: '',
      mobileNumber: '',
      alternateMobileNumber: '',
      email: '',
      previousSchool: '',
      siblings: false,
      parentalStatus: '',
      fatherName: '',
      fatherDOB: '',
      fatherOccupation: '',
      motherName: '',
      motherDOB: '',
      motherOccupation: '',
    });
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Admission</h2>
      <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
        {/* Admission Number */}
        <div>
          <label className="block font-semibold mb-1">Admission Number *</label>
          <input
            type="text"
            name="admissionNumber"
            value={formData.admissionNumber}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Admission Date */}
        <div>
          <label className="block font-semibold mb-1">Admission Date *</label>
          <input
            type="date"
            name="admissionDate"
            value={formData.admissionDate}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* First Name */}
        <div>
          <label className="block font-semibold mb-1">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Middle Name */}
        <div>
          <label className="block font-semibold mb-1">Middle Name</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-semibold mb-1">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>
           {/* Class*/}
           <div>
          <label className="block font-semibold mb-1">Class *</label>
          <input
            type="number"
            name="admissionClass"
            value={formData.admissionClass}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>
        {/* Date of Birth */}
        <div>
          <label className="block font-semibold mb-1">Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
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

        {/* Address */}
        <div>
          <label className="block font-semibold mb-1">Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block font-semibold mb-1">City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* State */}
        <div>
          <label className="block font-semibold mb-1">State *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Zip Code */}
        <div>
          <label className="block font-semibold mb-1">Zip Code *</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Country Code */}
        <div>
          <label className="block font-semibold mb-1">Country Code *</label>
          <input
            type="text"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block font-semibold mb-1">Mobile Number *</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Alternate Mobile Number */}
        <div>
          <label className="block font-semibold mb-1">Alternate Mobile Number</label>
          <input
            type="text"
            name="alternateMobileNumber"
            value={formData.alternateMobileNumber}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Previous School */}
        <div>
          <label className="block font-semibold mb-1">Previous School</label>
          <input
            type="text"
            name="previousSchool"
            value={formData.previousSchool}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Siblings */}
        <div>
          <label className="block font-semibold mb-1">Siblings</label>
          <input
            type="checkbox"
            name="siblings"
            checked={formData.siblings}
            onChange={handleChange}
            className="mt-2"
          />
        </div>

        {/* Parental Status */}
        <div>
          <label className="block font-semibold mb-1">Parental Status *</label>
          <input
            type="text"
            name="parentalStatus"
            value={formData.parentalStatus}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Father Name */}
        <div>
          <label className="block font-semibold mb-1">Father's Name *</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Father DOB */}
        <div>
          <label className="block font-semibold mb-1">Father's Date of Birth</label>
          <input
            type="date"
            name="fatherDOB"
            value={formData.fatherDOB}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Father Occupation */}
        <div>
          <label className="block font-semibold mb-1">Father's Occupation</label>
          <input
            type="text"
            name="fatherOccupation"
            value={formData.fatherOccupation}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Mother Name */}
        <div>
          <label className="block font-semibold mb-1">Mother's Name *</label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Mother DOB */}
        <div>
          <label className="block font-semibold mb-1">Mother's Date of Birth</label>
          <input
            type="date"
            name="motherDOB"
            value={formData.motherDOB}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Mother Occupation */}
        <div>
          <label className="block font-semibold mb-1">Mother's Occupation</label>
          <input
            type="text"
            name="motherOccupation"
            value={formData.motherOccupation}
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
