"use client";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddStudentForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    dob: '',
    roll: '',
    bloodGroup: '',
    religion: '',
    email: '',
    class: '',
    section: '',
    admissionId: '',
    phone: '',
    bio: '',
    photo: null,
  });

  // const handalesubmit = (e)=>{
  //   console.log(formData);
  // } 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, photo: file }));
  };

  const handalesubmit = async(e) => {
    e.preventDefault();
    // Perform validation here if needed
    console.log("hello")
    const response = await fetch('http://localhost:5000/auth/addStudent', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData: formData,
      })
    })

    const data = await response.json();
    if(data.Message == "The student has been created"){
      toast("The student has been created")
    }
    // Here, you could also send the data to a backend server
  };

  const handleReset = () => {
    setFormData({
      first_name: '',
      last_name: '',
      gender: '',
      dob: '',
      roll: '',
      bloodGroup: '',
      religion: '',
      email: '',
      class: '',
      section: '',
      admissionId: '',
      phone: '',
      bio: '',
      photo: null,
    });
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Students</h2>
      <ToastContainer/>
      <form onSubmit={handalesubmit} className="grid grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label className="block font-semibold mb-1">First Name *</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-semibold mb-1">Last Name *</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
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
            <option value="">Please Select Gender *</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block font-semibold mb-1">Date of Birth *</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        {/* Roll */}
        <div>
          <label className="block font-semibold mb-1">Roll</label>
          <input
            type="text"
            name="roll"
            value={formData.roll}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block font-semibold mb-1">Blood Group *</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Please Select Group *</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        {/* Religion */}
        <div>
          <label className="block font-semibold mb-1">Religion *</label>
          <select
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Please Select Religion *</option>
            <option value="Islam">Islam</option>
            <option value="Christianity">Christianity</option>
            <option value="Hinduism">Hinduism</option>
            <option value="Buddhism">Buddhism</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Class */}
        <div>
          <label className="block font-semibold mb-1">Class *</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Please Select Class *</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        {/* Section */}
        <div>
          <label className="block font-semibold mb-1">Section *</label>
          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Please Select Section *</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        {/* Admission ID */}
        <div>
          <label className="block font-semibold mb-1">Admission ID</label>
          <input
            type="text"
            name="admissionId"
            value={formData.admissionId}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
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

        {/* Short BIO */}
        <div className="col-span-2">
          <label className="block font-semibold mb-1">Short BIO</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            rows={4}
          ></textarea>
        </div>

        {/* Photo Upload */}
        <div className="col-span-2">
          <label className="block font-semibold mb-1">Upload Student Photo (150px X 150px)</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
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
