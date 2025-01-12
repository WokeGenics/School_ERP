"use client";

import { useState } from "react";

export default function ManageFees() {
  const [fees, setFees] = useState([]);
  const [form, setForm] = useState({ id: "", route_id: "", fee_amount: 0 });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setFees((prev) =>
        prev.map((fee) => (fee.id === form.id ? form : fee))
      );
      setIsEditing(false);
    } else {
      setFees((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setForm({ id: "", route_id: "", fee_amount: 0 });
  };

  const handleEdit = (id) => {
    const fee = fees.find((fee) => fee.id === id);
    setForm(fee);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setFees((prev) => prev.filter((fee) => fee.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Conveyance Fees</h1>

        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div>
            <label className="block text-gray-600">Route ID</label>
            <input
              type="text"
              name="route_id"
              value={form.route_id}
              onChange={handleInputChange}
              className="border w-full px-4 py-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Fee Amount</label>
            <input
              type="number"
              name="fee_amount"
              value={form.fee_amount}
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
            {isEditing ? "Update Fee" : "Create Fee"}
          </button>
        </form>

        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Route ID</th>
              <th className="border border-gray-200 px-4 py-2">Fee Amount</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee) => (
              <tr key={fee.id}>
                <td className="border border-gray-200 px-4 py-2">{fee.route_id}</td>
                <td className="border border-gray-200 px-4 py-2">{fee.fee_amount}</td>
                <td className="border border-gray-200 px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(fee.id)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(fee.id)}
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
