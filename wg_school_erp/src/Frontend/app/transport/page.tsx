"use client";

import { useState } from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/solid";

export default function TransportSystem() {
  const [activeTab, setActiveTab] = useState("add"); // State to manage active tab
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({
    id: "",
    photo: "",
    routeName: "",
    vehicleIdentifier: "",
    vehicleRegNo: "",
    driverName: "",
    mobileNo: "",
    numberOfSeats: 0,
    fare: 0,
    students: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");
  const [viewData, setViewData] = useState(null); // For popup view

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
        setForm({ ...form, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStudentListChange = (e) => {
    setForm({ ...form, students: e.target.value.split(",").map((id) => id.trim()) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setRoutes((prev) =>
        prev.map((route) => (route.id === form.id ? form : route))
      );
      setIsEditing(false);
    } else {
      setRoutes((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
    resetForm();
  };

  const handleEdit = (id) => {
    const route = routes.find((route) => route.id === id);
    setForm(route);
    setPhotoPreview(route.photo);
    setIsEditing(true);
    setActiveTab("add");
  };

  const handleDelete = (id) => {
    setRoutes((prev) => prev.filter((route) => route.id !== id));
  };

  const handleView = (id) => {
    const route = routes.find((route) => route.id === id);
    setViewData(route);
  };

  const handlePrint = () => {
    window.print();
  };

  const resetForm = () => {
    setForm({
      id: "",
      photo: "",
      routeName: "",
      vehicleIdentifier: "",
      vehicleRegNo: "",
      driverName: "",
      mobileNo: "",
      numberOfSeats: 0,
      fare: 0,
      students: [],
    });
    setPhotoPreview("");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Transport System Management</h1>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("add")}
            className={`px-4 py-2 rounded ${
              activeTab === "add"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Add Route
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-2 rounded ${
              activeTab === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Route List
          </button>
        </div>

        {/* Add Route Tab */}
        {activeTab === "add" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600">Photo (Upload)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="border w-full px-4 py-2 rounded-md"
              />
              {photoPreview && (
                <div className="mt-4">
                  <img src={photoPreview} alt="Preview" className="w-24 h-24 rounded-md" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-gray-600">Route Name</label>
              <input
                type="text"
                name="routeName"
                value={form.routeName || ""}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Vehicle Identifier</label>
              <input
                type="text"
                name="vehicleIdentifier"
                value={form.vehicleIdentifier || ""}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Vehicle Reg. No.</label>
              <input
                type="text"
                name="vehicleRegNo"
                value={form.vehicleRegNo || ""}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Driver Name</label>
              <input
                type="text"
                name="driverName"
                value={form.driverName || ""}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Mobile No.</label>
              <input
                type="text"
                name="mobileNo"
                value={form.mobileNo || ""}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Number of Seats</label>
              <input
                type="number"
                name="numberOfSeats"
                value={form.numberOfSeats || ""}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Fare ($)</label>
              <input
                type="number"
                name="fare"
                value={form.fare || ""}
                onChange={handleInputChange}
                className="border w-full px-4 py-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Student List (IDs, comma-separated)</label>
              <input
                type="text"
                name="students"
                value={form.students.join(", ")}
                onChange={handleStudentListChange}
                className="border w-full px-4 py-2 rounded-md"
                placeholder="e.g., 101, 102, 103"
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
              {isEditing ? "Update Route" : "Add Route"}
            </button>
          </form>
        )}

        {/* Route List Tab */}
        {activeTab === "list" && (
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">Photo</th>
                <th className="border border-gray-200 px-4 py-2">Route Name</th>
                <th className="border border-gray-200 px-4 py-2">Vehicle Identifier</th>
                <th className="border border-gray-200 px-4 py-2">Vehicle Reg. No.</th>
                <th className="border border-gray-200 px-4 py-2">Driver Name</th>
                <th className="border border-gray-200 px-4 py-2">Mobile No.</th>
                <th className="border border-gray-200 px-4 py-2">Seats</th>
                <th className="border border-gray-200 px-4 py-2">Fare ($)</th>
                <th className="border border-gray-200 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route.id}>
                  <td className="border border-gray-200 px-4 py-2">
                    <img
                      src={route.photo || "https://via.placeholder.com/50"}
                      alt="Vehicle"
                      className="w-12 h-12 rounded"
                    />
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{route.routeName}</td>
                  <td className="border border-gray-200 px-4 py-2">{route.vehicleIdentifier}</td>
                  <td className="border border-gray-200 px-4 py-2">{route.vehicleRegNo}</td>
                  <td className="border border-gray-200 px-4 py-2">{route.driverName}</td>
                  <td className="border border-gray-200 px-4 py-2">{route.mobileNo}</td>
                  <td className="border border-gray-200 px-4 py-2">{route.numberOfSeats}</td>
                  <td className="border border-gray-200 px-4 py-2">{route.fare}</td>
                  <td className=" px-4 py-2 space-x-2 flex justify-center">
                    <button
                      onClick={() => handleEdit(route.id)}
                      className="text-blue-500 hover:underline"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(route.id)}
                      className="text-red-500 hover:underline"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleView(route.id)}
                      className="text-green-500 hover:underline"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* View Popup */}
        {viewData && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 max-w-lg relative">
              <h2 className="text-xl font-bold mb-4">Route Details</h2>
              <p><strong>Route Name:</strong> {viewData.routeName}</p>
              <p><strong>Vehicle Identifier:</strong> {viewData.vehicleIdentifier}</p>
              <p><strong>Vehicle Reg. No.:</strong> {viewData.vehicleRegNo}</p>
              <p><strong>Driver Name:</strong> {viewData.driverName}</p>
              <p><strong>Mobile No.:</strong> {viewData.mobileNo}</p>
              <p><strong>Number of Seats:</strong> {viewData.numberOfSeats}</p>
              <p><strong>Fare ($):</strong> {viewData.fare}</p>
              <p><strong>Students:</strong> {viewData.students.join(", ")}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => setViewData(null)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
                <button
                  onClick={handlePrint}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
