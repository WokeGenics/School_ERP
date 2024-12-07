"use client";
import React, { useState } from "react";

const TransportTable = ({ transports }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransports = transports.filter(
    (transport) =>
      transport.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transport.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transport.phoneNumber.includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">All Transport Lists</h2>
      <input
        type="text"
        placeholder="Search by Route, Vehicle, or Phone..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded mb-4"
      />
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Route Name</th>
            <th className="border border-gray-300 p-2">Vehicle No</th>
            <th className="border border-gray-300 p-2">Driver Name</th>
            <th className="border border-gray-300 p-2">Driver License</th>
            <th className="border border-gray-300 p-2">Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransports.map((transport, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{transport.routeName}</td>
              <td className="border border-gray-300 p-2">{transport.vehicleNumber}</td>
              <td className="border border-gray-300 p-2">{transport.driverName}</td>
              <td className="border border-gray-300 p-2">{transport.licenseNumber}</td>
              <td className="border border-gray-300 p-2">{transport.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransportTable;
