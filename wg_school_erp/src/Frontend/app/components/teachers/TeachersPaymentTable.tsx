"use client";

import React, { useState } from 'react';
import Pagination from './Pagination';

const samplePayments = Array(30).fill().map((_, index) => ({
  id: `#00${index + 1}`,
  photo: `https://www.radiustheme.com/demo/html/psdboss/akkhor/akkhor/img/figure/student2.png`, // Placeholder photo
  name: index % 2 === 0 ? 'Mark Willy' : 'Jessia Rose',
  gender: index % 2 === 0 ? 'Male' : 'Female',
  class: index % 2 === 0 ? '2' : '1',
  subject: index % 2 === 0 ? 'English' : 'Mathematics',
  amount: `$${(Math.random() * 5000 + 1000).toFixed(2)}`,
  status: index % 2 === 0 ? 'Paid' : 'Unpaid',
  phone: '+123 9988558',
  email: 'kazifahim93@gmail.com',
}));

export default function TeachersPaymentTable() {
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [filteredPayments, setFilteredPayments] = useState(samplePayments);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = () => {
    const filtered = samplePayments.filter(
      (payment) =>
        payment.id.toLowerCase().includes(searchId.toLowerCase()) &&
        payment.name.toLowerCase().includes(searchName.toLowerCase()) &&
        payment.phone.toLowerCase().includes(searchPhone.toLowerCase())
    );
    setFilteredPayments(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg overflow-x-auto text-black">
      <h2 className="text-lg font-bold mb-4">All Teachers Payment History</h2>
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
            <th className="p-3 text-left">Roll</th>
            <th className="p-3 text-left">Photo</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Gender</th>
            <th className="p-3 text-left">Class</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">E-mail</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPayments.map((payment, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{payment.id}</td>
              <td className="p-3">
                <img src={payment.photo} alt="Profile" className="w-10 h-10 rounded-full" />
              </td>
              <td className="p-3">{payment.name}</td>
              <td className="p-3">{payment.gender}</td>
              <td className="p-3">{payment.class}</td>
              <td className="p-3">{payment.subject}</td>
              <td className="p-3">{payment.amount}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    payment.status === 'Paid' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {payment.status}
                </span>
              </td>
              <td className="p-3">{payment.phone}</td>
              <td className="p-3">{payment.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={filteredPayments.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
