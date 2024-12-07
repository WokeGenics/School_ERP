"use client";
import React, { useState, useEffect } from "react";
import AddHostelRoomForm from "../components/hostel/AddHostelRoomForm";
import HostelRoomTable from "../components/hostel/HostelRoomTable";

const HostelPage = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Fetch the hostel rooms when the component mounts
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hostel-rooms");
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  // Add a new room
  const addRoom = async (newRoom) => {
    try {
      const response = await fetch("http://localhost:5000/api/hostel-rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoom),
      });
      if (!response.ok) {
        throw new Error("Failed to add room");
      }
      const addedRoom = await response.json();
      setRooms([...rooms, addedRoom]);
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  // Update a room
  const updateRoom = async (updatedRoom) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hostel-rooms/${updatedRoom.roomNumber}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRoom),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update room");
      }
      const updated = await response.json();
      setRooms(
        rooms.map((room) =>
          room.roomNumber === updatedRoom.roomNumber ? updated : room
        )
      );
      setSelectedRoom(null); // Reset selected room after update
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  // Delete a room
  const deleteRoom = async (roomNumber) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hostel-rooms/${roomNumber}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete room");
      }
      setRooms(rooms.filter((room) => room.roomNumber !== roomNumber));
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  // Select a room for editing
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
