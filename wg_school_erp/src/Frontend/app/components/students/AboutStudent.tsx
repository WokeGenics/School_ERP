"use client";
import { useState } from 'react';
import { FaEdit, FaPrint, FaDownload, FaSave } from 'react-icons/fa';
import StudentSearch from './StudentSearch';

export default function AboutStudent() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Jessia Rose",
    gender: "Female",
    fatherName: "Steve Jones",
    motherName: "Naomi Rose",
    dob: "07.08.2016",
    religion: "Islam",
    occupation: "Graphic Designer",
    email: "jessiarose@gmail.com",
    admissionDate: "07.08.2019",
    class: "2",
    section: "Pink",
    roll: "10005",
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
    // Here, you could also send the updated profile data to a server
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

  return (<>

    <div className="text-black">
        <StudentSearch />
    <div className="bg-white shadow-md p-6 rounded-lg flex items-start space-x-6">
      <img src="https://www.radiustheme.com/demo/html/psdboss/akkhor/akkhor/img/figure/student1.jpg" alt="Profile" className="w-40 h-40 rounded-lg bg-blue-300" />
      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">About Me</h2>
          <div className="flex space-x-2">
            <button
              onClick={isEditing ? handleSave : handleEditToggle}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              title={isEditing ? "Save Profile" : "Edit Profile"}
            >
              {isEditing ? <FaSave /> : <FaEdit />}
            </button>
            <button
              onClick={handlePrint}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              title="Print Profile"
            >
              <FaPrint />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              title="Download Profile"
            >
              <FaDownload />
            </button>
          </div>
        </div>
        {isEditing ? (
          <form className="grid grid-cols-2 gap-4">
            <div>
              <label>
                <strong>Name:</strong>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md w-full"
                />
              </label>
              <label>
                <strong>Gender:</strong>
                <input
                  type="text"
                  name="gender"
                  value={profileData.gender}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md w-full"
                />
              </label>
              <label>
                <strong>Father Name:</strong>
                <input
                  type="text"
                  name="fatherName"
                  value={profileData.fatherName}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md w-full"
                />
              </label>
              <label>
                <strong>Mother Name:</strong>
                <input
                  type="text"
                  name="motherName"
                  value={profileData.motherName}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md w-full"
                />
              </label>
              <label>
                <strong>Date Of Birth:</strong>
                <input
                  type="text"
                  name="dob"
                  value={profileData.dob}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md w-full"
                />
              </label>
              <label>
                <strong>Religion:</strong>
                <input
                  type="text"
                  name="religion"
                  value={profileData.religion}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label>
                <strong>Father Occupation:</strong>
                <input
                  type="text"
                  name="occupation"
                  value={profileData.occupation}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md w-full"
                />
              </label>
              <label>
                <strong>E-mail:</strong>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md w-full"
                />
              </label>
              <label>
                <strong>Admission Date:</strong>
                <input
                  type="text"
                  name="admissionDate"
                  value={profileData.admissionDate}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md w-full"
                />
              </label>
              <label>
                <strong>Class:</strong>
                <input
                  type="text"
                  name="class"
                  value={profileData.class}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md w-full"
                />
              </label>
              <label>
                <strong>Section:</strong>
                <input
                  type="text"
                  name="section"
                  value={profileData.section}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md w-full"
                />
              </label>
              <label>
                <strong>Roll:</strong>
                <input
                  type="text"
                  name="roll"
                  value={profileData.roll}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md w-full"
                />
              </label>
              <label>
                <strong>Address:</strong>
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md w-full"
                />
              </label>
              <label>
                <strong>Phone:</strong>
                <input
                  type="text"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md w-full"
                />
              </label>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Name:</strong> {profileData.name}</p>
              <p><strong>Gender:</strong> {profileData.gender}</p>
              <p><strong>Father Name:</strong> {profileData.fatherName}</p>
              <p><strong>Mother Name:</strong> {profileData.motherName}</p>
              <p><strong>Date Of Birth:</strong> {profileData.dob}</p>
              <p><strong>Religion:</strong> {profileData.religion}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Father Occupation:</strong> {profileData.occupation}</p>
              <p><strong>E-mail:</strong> {profileData.email}</p>
              <p><strong>Admission Date:</strong> {profileData.admissionDate}</p>
              <p><strong>Class:</strong> {profileData.class}</p>
              <p><strong>Section:</strong> {profileData.section}</p>
              <p><strong>Roll:</strong> {profileData.roll}</p>
              <p><strong>Address:</strong> {profileData.address}</p>
              <p><strong>Phone:</strong> {profileData.phone}</p>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
    </>
  );
}
