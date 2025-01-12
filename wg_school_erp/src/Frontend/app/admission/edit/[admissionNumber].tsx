// pages/admission/edit/[admissionNumber].tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';

// Define the Admission interface
interface Admission {
  _id: string;
  admissionNumber: string;
  admissionDate: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  admissionClass: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  countryCode: string;
  mobileNumber: string;
  alternateMobileNumber?: string;
  email: string;
  previousSchool?: string;
  siblings: boolean;
  fatherName: string;
  fatherDOB: string;
  fatherOccupation?: string;
  motherName: string;
  motherDOB: string;
  motherOccupation?: string;
  createdAt: string;
  updatedAt: string;
}

export default function EditAdmissionPage() {
  const router = useRouter();
  const { admissionNumber } = useParams(); // Extract admissionNumber from URL
  const [admission, setAdmission] = useState<Admission | null>(null);
  const [formData, setFormData] = useState<Admission | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Admission Details
  useEffect(() => {
    if (admissionNumber) {
      fetchAdmission();
    }
  }, [admissionNumber]);

  const fetchAdmission = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admissions/${admissionNumber}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch admission details.');
      }
      const data = await response.json();
      setAdmission(data.data);
      setFormData(data.data);
    } catch (err: any) {
      console.error('Error fetching admission:', err);
      setError(err.message);
      setAdmission(null);
      setFormData(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle Form Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formData) {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!admissionNumber) {
      alert('Admission number is missing.');
      return;
    }
    try {
      const response = await fetch(`/api/admissions/${admissionNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update admission.');
      }

      const data = await response.json();
      alert('Admission updated successfully!');
      router.push('/admission'); // Redirect to admissions table
    } catch (err: any) {
      console.error('Error updating admission:', err);
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center p-4">Loading admission details...</p>;
  if (error) return <p className="text-center p-4 text-red-500">{error}</p>;
  if (!admission) return <p className="text-center p-4">Admission not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Admission</h1>
      {formData && (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {/* Admission Number - Readonly */}
          <div>
            <label className="block mb-2 font-semibold">Admission Number</label>
            <input
              name="admissionNumber"
              type="text"
              value={formData.admissionNumber}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
              disabled
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block mb-2 font-semibold">First Name</label>
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>

          {/* Middle Name */}
          <div>
            <label className="block mb-2 font-semibold">Middle Name</label>
            <input
              name="middleName"
              type="text"
              value={formData.middleName || ''}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2 font-semibold">Last Name</label>
            <input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>

          {/* Admission Class */}
          <div>
            <label className="block mb-2 font-semibold">Class</label>
            <input
              name="admissionClass"
              type="text"
              value={formData.admissionClass}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>

          {/* Admission Date */}
          <div>
            <label className="block mb-2 font-semibold">Admission Date</label>
            <input
              name="admissionDate"
              type="date"
              value={formData.admissionDate.split('T')[0]} // Assuming ISO format
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block mb-2 font-semibold">Date of Birth</label>
            <input
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth.split('T')[0]} // Assuming ISO format
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 font-semibold">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 font-semibold">Address</label>
            <input
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block mb-2 font-semibold">City</label>
            <input
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>

          {/* State */}
          <div>
            <label className="block mb-2 font-semibold">State</label>
            <input
              name="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>

          {/* ZIP Code */}
          <div>
            <label className="block mb-2 font-semibold">ZIP Code</label>
            <input
              name="zipCode"
              type="text"
              value={formData.zipCode}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>

          {/* Country Code */}
          <div>
            <label className="block mb-2 font-semibold">Country Code</label>
            <input
              name="countryCode"
              type="text"
              value={formData.countryCode}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block mb-2 font-semibold">Mobile Number</label>
            <input
              name="mobileNumber"
              type="tel"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
              pattern="\d{10,15}"
              title="Please enter a valid Mobile Number (10-15 digits)"
            />
          </div>

          {/* Alternate Mobile Number */}
          <div>
            <label className="block mb-2 font-semibold">Alternate Mobile Number</label>
            <input
              name="alternateMobileNumber"
              type="tel"
              value={formData.alternateMobileNumber || ''}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              pattern="\d{10,15}"
              title="Please enter a valid Alternate Mobile Number (10-15 digits)"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>

          {/* Previous School */}
          <div>
            <label className="block mb-2 font-semibold">Previous School</label>
            <input
              name="previousSchool"
              type="text"
              value={formData.previousSchool || ''}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>

          {/* Siblings */}
          <div className="flex items-center">
            <input
              name="siblings"
              type="checkbox"
              checked={formData.siblings}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="font-semibold">Has Siblings</label>
          </div>

          {/* Father's Name */}
          <div>
            <label className="block mb-2 font-semibold">Father's Name</label>
            <input
              name="fatherName"
              type="text"
              value={formData.fatherName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>

          {/* Father's DOB */}
          <div>
            <label className="block mb-2 font-semibold">Father's Date of Birth</label>
            <input
              name="fatherDOB"
              type="date"
              value={formData.fatherDOB.split('T')[0]} // Assuming ISO format
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>

          {/* Father's Occupation */}
          <div>
            <label className="block mb-2 font-semibold">Father's Occupation</label>
            <input
              name="fatherOccupation"
              type="text"
              value={formData.fatherOccupation || ''}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>

          {/* Mother's Name */}
          <div>
            <label className="block mb-2 font-semibold">Mother's Name</label>
            <input
              name="motherName"
              type="text"
              value={formData.motherName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>

          {/* Mother's DOB */}
          <div>
            <label className="block mb-2 font-semibold">Mother's Date of Birth</label>
            <input
              name="motherDOB"
              type="date"
              value={formData.motherDOB.split('T')[0]} // Assuming ISO format
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>

          {/* Mother's Occupation */}
          <div>
            <label className="block mb-2 font-semibold">Mother's Occupation</label>
            <input
              name="motherOccupation"
              type="text"
              value={formData.motherOccupation || ''}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Update Admission
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
