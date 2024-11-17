"use client";
import React, { useState } from "react";

const AddTransportForm = ({ onAddTransport }) => {
  const [formValues, setFormValues] = useState({
    routeName: "",
    vehicleNumber: "",
    driverName: "",
    licenseNumber: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTransport(formValues);
    setFormValues({
      routeName: "",
      vehicleNumber: "",
      driverName: "",
      licenseNumber: "",
      phoneNumber: "",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Transport</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="routeName"
            placeholder="Route Name"
            value={formValues.routeName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="vehicleNumber"
            placeholder="Vehicle Number"
            value={formValues.vehicleNumber}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="driverName"
            placeholder="Driver Name"
            value={formValues.driverName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="licenseNumber"
            placeholder="License Number"
            value={formValues.licenseNumber}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Save
          </button>
          <button
            type="reset"
            onClick={() =>
              setFormValues({
                routeName: "",
                vehicleNumber: "",
                driverName: "",
                licenseNumber: "",
                phoneNumber: "",
              })
            }
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransportForm;
