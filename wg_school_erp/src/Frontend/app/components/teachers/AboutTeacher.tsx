"use client";
import React, { useState } from 'react';
import { FaEdit, FaPrint, FaDownload, FaSave } from 'react-icons/fa';

export default function AboutMe() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Steven Johnson",
    gender: "Male",
    fatherName: "Steve Jones",
    motherName: "Naomi Rose",
    religion: "Islam",
    joiningDate: "07.08.2016",
    email: "stevenjohnson@gmail.com",
    subject: "English",
    class: "2",
    section: "Pink",
    id: "10005",
    address: "House #10, Road #6, Australia",
    phone: "+88 98568888418",
    bio: "Aliquam erat volutpat. Curabitur mattis massa sedde lacus sitiquen sodale word moun taiery."
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Optionally, save the data to a server here
    alert('Profile updated successfully!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(profileData, null, 2)
    )}`;
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "profile_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg flex items-start space-x-6">
      <img src="https://www.radiustheme.com/demo/html/psdboss/akkhor/akkhor/img/figure/teacher.jpg" alt="Profile" className="w-40 h-40 rounded-lg bg-gray-300" />
      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-black">About Me</h2>
          <div className="flex space-x-2">
            <button
              onClick={isEditing ? handleSave : handleEditToggle}
              className="p-2 bg-gray-500 rounded hover:bg-gray-300"
              title={isEditing ? "Save Profile" : "Edit Profile"}
            >
              {isEditing ? <FaSave /> : <FaEdit />}
            </button>
            <button
              onClick={handlePrint}
              className="p-2 bg-gray-500 rounded hover:bg-gray-300"
              title="Print Profile"
            >
              <FaPrint />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 bg-gray-500 rounded hover:bg-gray-300"
              title="Download Profile"
            >
              <FaDownload />
            </button>
          </div>
        </div>
        {isEditing ? (
          <form className="grid grid-cols-2 gap-4 text-black">
            <div>
              <label><strong>Name:</strong></label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full"
              />
              <label><strong>Gender:</strong></label>
              <input
                type="text"
                name="gender"
                value={profileData.gender}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full"
              />
              <label><strong>Father Name:</strong></label>
              <input
                type="text"
                name="fatherName"
                value={profileData.fatherName}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full"
              />
              <label><strong>Mother Name:</strong></label>
              <input
                type="text"
                name="motherName"
                value={profileData.motherName}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full"
              />
              <label><strong>Religion:</strong></label>
              <input
                type="text"
                name="religion"
                value={profileData.religion}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full"
              />
              <label><strong>Joining Date:</strong></label>
              <input
                type="date"
                name="joiningDate"
                value={profileData.joiningDate}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full"
              />
            </div>
            <div>
              <label><strong>E-mail:</strong></label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full"
              />
              <label><strong>Subject:</strong></label>
              <input
                type="text"
                name="subject"
                value={profileData.subject}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full"
              />
              <label><strong>Class:</strong></label>
              <input
                type="text"
                name="class"
                value={profileData.class}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full"
              />
              <label><strong>Section:</strong></label>
              <input
                type="text"
                name="section"
                value={profileData.section}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full"
              />
              <label><strong>ID No:</strong></label>
              <input
                type="text"
                name="id"
                value={profileData.id}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full"
              />
              <label><strong>Address:</strong></label>
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full"
              />
              <label><strong>Phone:</strong></label>
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full"
              />
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 gap-4 text-black p-2">
            <div className='grid grid-cols-1 gap-4 center'>
              <p><strong>Name:</strong> {profileData.name}</p>
              <p><strong>Gender:</strong> {profileData.gender}</p>
              <p><strong>Father Name:</strong> {profileData.fatherName}</p>
              <p><strong>Mother Name:</strong> {profileData.motherName}</p>
              <p><strong>Religion:</strong> {profileData.religion}</p>
              <p><strong>Joining Date:</strong> {profileData.joiningDate}</p>
              <p><strong>E-mail:</strong> {profileData.email}</p>
              <p><strong>Subject:</strong> {profileData.subject}</p>
              <p><strong>Class:</strong> {profileData.class}</p>
              <p><strong>Section:</strong> {profileData.section}</p>
              <p><strong>ID No:</strong> {profileData.id}</p>
              <p><strong>Address:</strong> {profileData.address}</p>
              <p><strong>Phone:</strong> {profileData.phone}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
