// components/class/ClassSchedulesTable.js
"use client";

import React from "react";

const ClassSchedulesTable = ({ users, selectedUsers, onUserSelect, onSelectAll, schedulesData }) => {
  // Check if all users are selected
  const allSelected = users.length > 0 && users.every((user) => selectedUsers.includes(user._id));
  const partiallySelected = users.some((user) => selectedUsers.includes(user._id)) && !allSelected;

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectAll([]); 
  // Deselect all
    } else {
      onSelectAll(users.map((user) => user._id)); // Select all
    }
  };

  return (
    <div className="overflow-auto max-h-64 border border-gray-300 rounded-lg mb-6">
   <h2 className="text-lg font-bold mb-4">All Class Schedules</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left"><input type="checkbox" /></th>
            <th className="p-3 text-left">ID</th>

            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Gender</th>
            <th className="p-3 text-left">Class</th>
            <th className="p-3 text-left">Section</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {schedulesData.map((schedule) => (
            <tr key={schedule.idNo} className="border-b">
              <td className="p-3"><input type="checkbox" /></td>
              <td className="p-3">{schedule.idNo}</td>
          
              <td className="p-3">{schedule.teachername}</td>
              <td className="p-3">{schedule.gender}</td>
              <td className="p-3">{schedule.class}</td>
              <td className="p-3">{schedule.section}</td>
              <td className="p-3">{schedule.date}</td>
              <td className="p-3">{schedule.time}</td>
              <td className="p-3">{schedule.phone}</td>
              <td className="p-3">{schedule.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassSchedulesTable;

'