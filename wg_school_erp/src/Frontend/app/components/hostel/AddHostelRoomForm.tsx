import React, { useState, useEffect } from "react";

const AddHostelRoomForm = ({ onAddRoom, onUpdateRoom, selectedRoom, resetSelectedRoom }) => {
  const [formData, setFormData] = useState({
    hostelName: "",
    roomNumber: "",
    name:"",
    roomType: "",
    numberOfBeds: "",
    costPerBed: "",
  });

  useEffect(() => {
    if (selectedRoom) {
      setFormData(selectedRoom);
    } else {
      resetForm();
    }
  }, [selectedRoom]);

  const resetForm = () => {
    setFormData({
      roomNumber:"",
      hostelName: "",
      name: "",
      roomType: "",
      numberOfBeds: "",
      costPerBed: "",

    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRoom) {
      onUpdateRoom(formData);
    } else {
      onAddRoom(formData);
    }
    resetForm();
    resetSelectedRoom();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        {selectedRoom ? "Edit Hostel Room" : "Add Hostel Room"}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {["hostelName", "roomNumber", "name", "roomType", "numberOfBeds", "costPerBed"].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field] || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder={field.split(/(?=[A-Z])/).join(" ")}
            required
            disabled={field === "roomNumber" && selectedRoom} // Room number is not editable in edit mode
          />
        ))}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
      >
        {selectedRoom ? "Update Room" : "Add Room"}
      </button>
    </form>
  );
};

export default AddHostelRoomForm;
