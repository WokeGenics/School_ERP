"use client";
import React, { useState } from 'react';
import Pagination from './Pagination';

const sampleFees = Array(30).fill().map((_, index) => ({
  id: `#00${index + 1}`,
  photo: `https://www.konnectplugins.com/proclinic/Vertical/images/doctor.jpeg`, // Placeholder photo
  name: index % 2 === 0 ? 'Mark Willy' : 'Jessia Rose',
  number: '+1234567890',
  class: index % 2 === 0 ? '3' : '2',
  section: 'A',
  purpose: 'Class Test',
  amount: `$${(Math.random() * 5000 + 1000).toFixed(2)}`,
  status: index % 2 === 0 ? 'Paid' : 'Unpaid',
  phone: '+123 9988558',
  email: 'kazifahim93@gmail.com',
}));

export default function FeesCollectionTable() {
  const [feesData, setFeesData] = useState(sampleFees);
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = () => {
    const filteredFees = sampleFees.filter(
      (fee) =>
        fee.id.toLowerCase().includes(searchId.toLowerCase()) &&
        fee.name.toLowerCase().includes(searchName.toLowerCase()) &&
        fee.phone.toLowerCase().includes(searchPhone.toLowerCase())
    );
    setFeesData(filteredFees);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFees = feesData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg overflow-x-scroll">
      <h2 className="text-lg font-bold mb-4">All Fees Collection</h2>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border p-2 rounded-md w-1/3"
        />
        <input
          type="text"
          placeholder="Search by Name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border p-2 rounded-md w-1/3"
        />
        <input
          type="text"
          placeholder="Search by Phone..."
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          className="border p-2 rounded-md w-1/3"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-500 text-white p-2 rounded-md"
        >
          Search
        </button>
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left"><input type="checkbox" /></th>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Photo</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Number</th>
            <th className="p-3 text-left">Class</th>
            <th className="p-3 text-left">Section</th>
            <th className="p-3 text-left">Purpose</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {paginatedFees.map((fee) => (
            <tr key={fee.id} className="border-b">
              <td className="p-3"><input type="checkbox" /></td>
              <td className="p-3">{fee.id}</td>
              <td className="p-3">
                <img src={fee.photo} alt="Profile" className="w-10 h-10 rounded-full" />
              </td>
              <td className="p-3">{fee.name}</td>
              <td className="p-3">{fee.number}</td>
              <td className="p-3">{fee.class}</td>
              <td className="p-3">{fee.section}</td>
              <td className="p-3">{fee.purpose}</td>
              <td className="p-3">{fee.amount}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    fee.status === 'Paid' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {fee.status}
                </span>
              </td>
              <td className="p-3">{fee.phone}</td>
              <td className="p-3">{fee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={feesData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
