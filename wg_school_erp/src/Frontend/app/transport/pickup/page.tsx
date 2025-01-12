"use client";

import { useState } from "react";

export default function PickupPoints() {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", route: "Route A", pickupPoint: "Stop 1" },
    { id: 2, name: "Jane Smith", route: "Route B", pickupPoint: "Stop 3" },
  ]);
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.route.toLowerCase().includes(search.toLowerCase()) ||
      student.pickupPoint.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">View Pickup Point-wise Students</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by student name, route, or pickup point..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border w-full px-4 py-2 rounded-md"
          />
        </div>

        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Student Name</th>
              <th className="border border-gray-200 px-4 py-2">Route</th>
              <th className="border border-gray-200 px-4 py-2">Pickup Point</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="border border-gray-200 px-4 py-2">{student.name}</td>
                <td className="border border-gray-200 px-4 py-2">{student.route}</td>
                <td className="border border-gray-200 px-4 py-2">{student.pickupPoint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
