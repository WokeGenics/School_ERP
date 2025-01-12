"use client";

import { useState } from "react";

export default function ManageRoutes() {
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({ id: "", route_name: "", total_stops: 0 });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
    setForm({ id: "", route_name: "", total_stops: 0 });
  };

  const handleEdit = (id) => {
    const route = routes.find((route) => route.id === id);
    setForm(route);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setRoutes((prev) => prev.filter((route) => route.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Bus Routes</h1>

        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div>
            <label className="block text-gray-600">Route Name</label>
            <input
              type="text"
              name="route_name"
              value={form.route_name}
              onChange={handleInputChange}
              className="border w-full px-4 py-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Total Stops</label>
            <input
              type="number"
              name="total_stops"
              value={form.total_stops}
              onChange={handleInputChange}
              className="border w-full px-4 py-2 rounded-md"
              required
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
            {isEditing ? "Update Route" : "Create Route"}
          </button>
        </form>

        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Route Name</th>
              <th className="border border-gray-200 px-4 py-2">Total Stops</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id}>
                <td className="border border-gray-200 px-4 py-2">{route.route_name}</td>
                <td className="border border-gray-200 px-4 py-2">{route.total_stops}</td>
                <td className="border border-gray-200 px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(route.id)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(route.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
