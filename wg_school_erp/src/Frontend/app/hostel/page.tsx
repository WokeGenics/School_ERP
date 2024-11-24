"use client";
import React, { useState } from "react";
import AddHostelRoomForm from "../components/hostel/AddHostelRoomForm";
import HostelRoomTable from "../components/hostel/HostelRoomTable";

const HostelPage = () => {
  const [rooms, setRooms] = useState([
    {
      hostelName: "Boys - 101",
      roomNumber: "HT3006",
      roomType: "Big",
      numberOfBeds: "3",
      costPerBed: "50",
    },
    {
      hostelName: "Boys - 105",
      roomNumber: "HT5016",
      roomType: "Medium",
      numberOfBeds: "4",
      costPerBed: "40",
    },
  ]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const addRoom = (newRoom) => {
    setRooms([...rooms, newRoom]);
  };

  const updateRoom = (updatedRoom) => {
    setRooms(
      rooms.map((room) =>
        room.roomNumber === updatedRoom.roomNumber ? updatedRoom : room
      )
    );
  };

  const deleteRoom = (roomNumber) => {
    setRooms(rooms.filter((room) => room.roomNumber !== roomNumber));
  };

  const editRoom = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddHostelRoomForm
          onAddRoom={addRoom}
          onUpdateRoom={updateRoom}
          selectedRoom={selectedRoom}
          resetSelectedRoom={() => setSelectedRoom(null)}
        />
        <HostelRoomTable
          rooms={rooms}
          onEditRoom={editRoom}
          onDeleteRoom={deleteRoom}
        />
      </div>
    </div>
  );
};

export default HostelPage;
