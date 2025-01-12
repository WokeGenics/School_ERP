"use client";

import { useState } from "react";

export default function TransportManagement() {
  const [routes, setRoutes] = useState([]);
  const [fees, setFees] = useState([]);
  const [collections, setCollections] = useState([]);
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", route: "Route A", pickupPoint: "Stop 1" },
    { id: 2, name: "Jane Smith", route: "Route B", pickupPoint: "Stop 3" },
  ]);

  const [activeTab, setActiveTab] = useState("routes"); // Manage active tab
  const [form, setForm] = useState({}); // Shared form state for all tabs
  const [isEditing, setIsEditing] = useState(false);

  // Handle tab switching
  const switchTab = (tab) => {
    setActiveTab(tab);
    setForm({});
    setIsEditing(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle CRUD operations based on active tab
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "routes") {
      handleRoutesSubmit();
    } else if (activeTab === "fees") {
      handleFeesSubmit();
    } else if (activeTab === "collections") {
      handleCollectionsSubmit();
    }
  };

  const handleRoutesSubmit = () => {
    if (isEditing) {
      setRoutes((prev) =>
        prev.map((route) => (route.id === form.id ? form : route))
      );
    } else {
      setRoutes((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
    resetForm();
  };

  const handleFeesSubmit = () => {
    if (isEditing) {
      setFees((prev) => prev.map((fee) => (fee.id === form.id ? form : fee)));
    } else {
      setFees((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
    resetForm();
  };

  const handleCollectionsSubmit = () => {
    if (isEditing) {
      setCollections((prev) =>
        prev.map((collection) => (collection.id === form.id ? form : collection))
      );
    } else {
      setCollections((prev) => [
        ...prev,
        { ...form, id: Date.now().toString() },
      ]);
    }
    resetForm();
  };

  const handleEdit = (id, tab) => {
    let data = [];
    if (tab === "routes") data = routes;
    else if (tab === "fees") data = fees;
    else if (tab === "collections") data = collections;

    const item = data.find((item) => item.id === id);
    setForm(item);
    setIsEditing(true);
  };

  const handleDelete = (id, tab) => {
    if (tab === "routes") setRoutes((prev) => prev.filter((route) => route.id !== id));
    else if (tab === "fees") setFees((prev) => prev.filter((fee) => fee.id !== id));
    else if (tab === "collections")
      setCollections((prev) => prev.filter((collection) => collection.id !== id));
  };

  const resetForm = () => {
    setForm({});
    setIsEditing(false);
  };

  // Tab content render functions
  const renderRoutesTab = () => (
    <>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block text-gray-600">Route Name</label>
          <input
            type="text"
            name="route_name"
            value={form.route_name || ""}
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
            value={form.total_stops || ""}
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
                  onClick={() => handleEdit(route.id, "routes")}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(route.id, "routes")}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  const renderFeesTab = () => (
    <>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block text-gray-600">Route ID</label>
          <input
            type="text"
            name="route_id"
            value={form.route_id || ""}
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
            value={form.fee_amount || ""}
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
                  onClick={() => handleEdit(fee.id, "fees")}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(fee.id, "fees")}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  const renderCollectionsTab = () => (
    <>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block text-gray-600">Student ID</label>
          <input
            type="text"
            name="student_id"
            value={form.student_id || ""}
            onChange={handleInputChange}
            className="border w-full px-4 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Route ID</label>
          <input
            type="text"
            name="route_id"
            value={form.route_id || ""}
            onChange={handleInputChange}
            className="border w-full px-4 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Amount Paid</label>
          <input
            type="number"
            name="amount_paid"
            value={form.amount_paid || ""}
            onChange={handleInputChange}
            className="border w-full px-4 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Payment Date</label>
          <input
            type="date"
            name="payment_date"
            value={form.payment_date || ""}
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
          {isEditing ? "Update Collection" : "Record Fee"}
        </button>
      </form>

      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Student ID</th>
            <th className="border border-gray-200 px-4 py-2">Route ID</th>
            <th className="border border-gray-200 px-4 py-2">Amount Paid</th>
            <th className="border border-gray-200 px-4 py-2">Payment Date</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection) => (
            <tr key={collection.id}>
              <td className="border border-gray-200 px-4 py-2">{collection.student_id}</td>
              <td className="border border-gray-200 px-4 py-2">{collection.route_id}</td>
              <td className="border border-gray-200 px-4 py-2">{collection.amount_paid}</td>
              <td className="border border-gray-200 px-4 py-2">{collection.payment_date}</td>
              <td className="border border-gray-200 px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(collection.id, "collections")}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(collection.id, "collections")}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  const renderPickupPointsTab = () => (
    <div>
      <input
        type="text"
        placeholder="Search by student name, route, or pickup point..."
        className="border w-full px-4 py-2 rounded-md mb-4"
      />
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Student Name</th>
            <th className="border border-gray-200 px-4 py-2">Route</th>
            <th className="border border-gray-200 px-4 py-2">Pickup Point</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border border-gray-200 px-4 py-2">{student.name}</td>
              <td className="border border-gray-200 px-4 py-2">{student.route}</td>
              <td className="border border-gray-200 px-4 py-2">{student.pickupPoint}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Transport Management</h1>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => switchTab("routes")}
            className={`px-4 py-2 rounded ${
              activeTab === "routes"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Manage Routes
          </button>
          <button
            onClick={() => switchTab("fees")}
            className={`px-4 py-2 rounded ${
              activeTab === "fees"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Manage Fees
          </button>
          <button
            onClick={() => switchTab("collections")}
            className={`px-4 py-2 rounded ${
              activeTab === "collections"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Fee Collection
          </button>
          <button
            onClick={() => switchTab("pickupPoints")}
            className={`px-4 py-2 rounded ${
              activeTab === "pickupPoints"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Pickup Points
          </button>
        </div>

        {activeTab === "routes" && renderRoutesTab()}
        {activeTab === "fees" && renderFeesTab()}
        {activeTab === "collections" && renderCollectionsTab()}
        {activeTab === "pickupPoints" && renderPickupPointsTab()}
      </div>
    </div>
  );
}
