"use client";

import React, { useState } from "react";

export default function IDManagement() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    id: "",
    schoolName: "",
    slogan: "",
    regNo: "",
    studentID: "",
    studentName: "",
    fatherName: "",
    className: "",
    emergencyContact: "",
    photo: "",
    joinedDate: "",
    expiryDate: "",
    email: "",
    phone: "",
    website: "",
    qrCode: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setStudents((prev) =>
        prev.map((student) => (student.id === form.id ? form : student))
      );
      setIsEditing(false);
    } else {
      setStudents((prev) => [
        ...prev,
        { ...form, id: Date.now().toString() },
      ]);
    }
    setForm({
      id: "",
      schoolName: "",
      slogan: "",
      regNo: "",
      studentID: "",
      studentName: "",
      fatherName: "",
      className: "",
      emergencyContact: "",
      photo: "",
      joinedDate: "",
      expiryDate: "",
      email: "",
      phone: "",
      website: "",
      qrCode: "",
    });
  };

  const handleEdit = (id) => {
    const student = students.find((student) => student.id === id);
    setForm(student);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const handleToggleList = () => {
    setIsListVisible((prev) => !prev);
  };

  const handlePrint = (student) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print ID Card</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f0f0; }
            .id-card { display: flex; flex-direction: column; width: 350px; border: 1px solid #ccc; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
            .front, .back { padding: 20px; }
            .front { background: linear-gradient(to right, #3B82F6, #2563EB); color: white; }
            .back { background: #f0f0f0; }
            .school-name { font-size: 24px; font-weight: bold; text-align: center; }
            .slogan { font-size: 14px; text-align: center; font-style: italic; margin-bottom: 20px; }
            .photo { width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; }
            .details { margin-bottom: 20px; }
            .details p { margin: 5px 0; font-size: 14px; }
            .terms { font-size: 14px; margin-bottom: 20px; }
            .qr-code { width: 80px; height: 80px; margin: 20px auto; }
            .signature { font-size: 14px; text-align: right; margin-top: 20px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="id-card">
            <!-- Front -->
            <div class="front">
              <div class="school-name">${student.schoolName}</div>
              <div class="slogan">${student.slogan}</div>
              <img src="${student.photo}" alt="Student Photo" class="photo" />
              <div class="details">
                <p><strong>Reg No:</strong> ${student.regNo}</p>
                <p><strong>Student ID:</strong> ${student.studentID}</p>
                <p><strong>Name:</strong> ${student.studentName}</p>
                <p><strong>Father/Guardian:</strong> ${student.fatherName}</p>
                <p><strong>Class:</strong> ${student.className}</p>
                <p><strong>Emergency Contact:</strong> ${student.emergencyContact}</p>
              </div>
            </div>
            <!-- Back -->
            <div class="back">
              <div class="terms">
                <h3>Terms and Conditions</h3>
                <p><ul><li>The ID card is non-transferable and must be carried at all times for identification within the institution.</li>
                <li>
Lost, damaged, or expired cards must be reported immediately, and a replacement fee may</li> </ul/></p>
              </div>
              <div class="details">
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Phone:</strong> ${student.phone}</p>
                <p><strong>Website:</strong> ${student.website}</p>
                <p><strong>Joined Date:</strong> ${student.joinedDate}</p>
                <p><strong>Expiry Date:</strong> ${student.expiryDate}</p>
              </div>
              <img src="${student.qrCode}" alt="QR Code" class="qr-code" />
              <div class="signature">Principal</div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Student ID Management</h1>

        {/* Toggle List */}
        <button
          onClick={handleToggleList}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          {isListVisible ? "Hide List" : "View List"}
        </button>

        {/* Form */}
        {!isListVisible && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600">School Name</label>
              <input
                type="text"
                name="schoolName"
                value={form.schoolName}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Slogan</label>
              <input
                type="text"
                name="slogan"
                value={form.slogan}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">Reg No</label>
                <input
                  type="text"
                  name="regNo"
                  value={form.regNo}
                  onChange={handleInputChange}
                  className="border w-full px-4 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600">Student ID</label>
                <input
                  type="text"
                  name="studentID"
                  value={form.studentID}
                  onChange={handleInputChange}
                  className="border w-full px-4 py-2 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-600">Student Name</label>
              <input
                type="text"
                name="studentName"
                value={form.studentName}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Father/Guardian</label>
              <input
                type="text"
                name="fatherName"
                value={form.fatherName}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Class</label>
              <input
                type="text"
                name="className"
                value={form.className}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Emergency Contact</label>
              <input
                type="text"
                name="emergencyContact"
                value={form.emergencyContact}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Photo </label>
              <input
                type="file"
                name="photo"
                value={form.photo}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">Joined Date</label>
                <input
                  type="date"
                  name="joinedDate"
                  value={form.joinedDate}
                  onChange={handleInputChange}
                  className="border w-full px-4 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={handleInputChange}
                  className="border w-full px-4 py-2 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-600">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Website</label>
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-600">QR Code URL</label>
              <input
                type="text"
                name="qrCode"
                value={form.qrCode}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
              />
            </div>
            <button
              type="submit"
              className={`px-4 py-2 rounded ${
                isEditing
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {isEditing ? "Update ID" : "Create ID"}
            </button>
          </form>
        )}

        {/* List View */}
        {isListVisible && (
          <div>
            <table className="w-full table-auto border-collapse border border-gray-200 mt-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-4 py-2">Student Name</th>
                  <th className="border border-gray-200 px-4 py-2">Class</th>
                  <th className="border border-gray-200 px-4 py-2">Email</th>
                  <th className="border border-gray-200 px-4 py-2">Phone</th>
                  <th className="border border-gray-200 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="border border-gray-200 px-4 py-2">
                      {student.studentName}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {student.className}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {student.email}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {student.phone}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(student.id)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handlePrint(student)}
                        className="text-green-500 hover:underline"
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
