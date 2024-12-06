import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const HostelRoomTable = ({ rooms, onEditRoom, onDeleteRoom }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Hostel Room Lists</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Hostel Name</th>
            <th className="border border-gray-300 p-2">Room No</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Room Type</th>
          
            <th className="border border-gray-300 p-2">No. of Beds</th>
            <th className="border border-gray-300 p-2">Cost Per Bed ($)</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{room.hostelName}</td>
              <td className="border border-gray-300 p-2">{room.roomNumber}</td>
              <td className="border border-gray-300 p-2">{room.name}</td>
              <td className="border border-gray-300 p-2">{room.roomType}</td>
           
              <td className="border border-gray-300 p-2">{room.numberOfBeds}</td>
              <td className="border border-gray-300 p-2">${room.costPerBed}</td>
              <td className="border border-gray-300 p-2 flex justify-center items-center space-x-4">
                <FaEdit
                  onClick={() => {
                    console.log("Editing room:", room);
                    onEditRoom(room);
                  }}
                  className="text-blue-500 cursor-pointer hover:opacity-80"
                  size={18}
                />
                <FaTrash
                  onClick={() => {
                    console.log("Deleting room:", room.roomNumber);
                    onDeleteRoom(room.roomNumber);
                  }}
                  className="text-red-500 cursor-pointer hover:opacity-80"
                  size={18}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HostelRoomTable;
