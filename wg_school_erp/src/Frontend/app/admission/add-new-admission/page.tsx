'use client';

import React, { useState } from 'react';
import AddAdmission from '../../components/admission/addAdmission';

export default function Admission() {
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmission = async (formData) => {
    const BaseUrl = 'http://localhost:5000'; // Backend server base URL
    try {
      const response = await fetch(`${BaseUrl}/api/admissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage('Admission Record added successfully!');
        console.log('Added Admission:', responseData);
      } else {
        const errorResponse = await response.json();
        alert(`Error: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error('Error adding Admission:', error);
      alert('Failed to add Admission Record. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      <AddAdmission onFormSubmit={handleFormSubmission} />
    </div>
  );
}
