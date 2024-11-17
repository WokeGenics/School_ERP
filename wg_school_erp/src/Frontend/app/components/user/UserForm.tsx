import React from "react";

export default function UserForm({ formData, setFormData, handleSubmit }) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className="bg-white shadow-md rounded p-6 mb-6 max-w-6xl mx-auto text-black"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">Add New User</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium mb-1">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* User Type */}
        <div>
          <label className="block text-sm font-medium mb-1">User Type *</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Please Select</option>
            <option value="Admin">Admin</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-1">Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Please Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Father's Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Father's Name *</label>
          <input
            type="text"
            name="fathersName"
            value={formData.fathersName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Mother's Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Mother's Name *</label>
          <input
            type="text"
            name="mothersName"
            value={formData.mothersName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Religion */}
        <div>
          <label className="block text-sm font-medium mb-1">Religion *</label>
          <select
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Please Select</option>
            <option value="Hindu">Hindu</option>
            <option value="Muslim">Muslim</option>
            <option value="Christian">Christian</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Joining Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Joining Date *</label>
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">E-Mail *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium mb-1">Subject *</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Please Select</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
          </select>
        </div>

        {/* Section */}
        <div>
          <label className="block text-sm font-medium mb-1">Section *</label>
          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Please Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        {/* Class */}
        <div>
          <label className="block text-sm font-medium mb-1">Class *</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Please Select</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>

        {/* ID No */}
        <div>
          <label className="block text-sm font-medium mb-1">ID No *</label>
          <input
            type="text"
            name="idNo"
            value={formData.idNo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Address *</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="2"
            required
          ></textarea>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Save
        </button>
        <button
          type="reset"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={() =>
            setFormData({
              id: null,
              firstName: "",
              lastName: "",
              fathersName: "",
              mothersName: "",
              dateOfBirth: "",
              religion: "",
              joiningDate: "",
              email: "",
              subject: "",
              section: "",
              idNo: "",
              phone: "",
              userType: "",
              gender: "",
              class: "",
              address: "",
            })
          }
        >
          Reset
        </button>
      </div>
    </form>
  );
}
