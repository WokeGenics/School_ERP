"use client";
import React, { useState, useEffect } from "react";

const AddHostelRoomForm = ({ onAddRoom, onUpdateRoom, selectedRoom, resetSelectedRoom }) => {
  const [formValues, setFormValues] = useState({
    hostelName: "",
    roomNumber: "",
    roomType: "",
    numberOfBeds: "",
    costPerBed: "",
  });

  useEffect(() => {
    if (selectedRoom) {
      setFormValues(selectedRoom);
    }
  }, [selectedRoom]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRoom) {
      onUpdateRoom(formValues);
    } else {
      onAddRoom(formValues);
    }
    setFormValues({
      hostelName: "",
      roomNumber: "",
      roomType: "",
      numberOfBeds: "",
      costPerBed: "",
    });
    resetSelectedRoom();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        {selectedRoom ? "Update Room" : "Add New Room"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="hostelName"
            placeholder="Hostel Name"
            value={formValues.hostelName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={formValues.roomNumber}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <select
            name="roomType"
            value={formValues.roomType}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Select Room Type</option>
            <option value="Big">Big</option>
            <option value="Medium">Medium</option>
            <option value="Small">Small</option>
          </select>
        </div>
        <div className="mb-4">
          <select
            name="numberOfBeds"
            value={formValues.numberOfBeds}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Select Number of Beds</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="costPerBed"
            placeholder="Cost Per Bed ($)"
            value={formValues.costPerBed}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className={`${
              selectedRoom ? "bg-blue-500" : "bg-yellow-500"
            } text-white px-4 py-2 rounded hover:opacity-90`}
          >
            {selectedRoom ? "Update" : "Save"}
          </button>
          <button
            type="reset"
            onClick={() => {
              setFormValues({
                hostelName: "",
                roomNumber: "",
                roomType: "",
                numberOfBeds: "",
                costPerBed: "",
              });
              resetSelectedRoom();
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:opacity-90"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHostelRoomForm;
