"use client";
import React, { useState } from 'react';
import Pagination from './Pagination';

const sampleTeachers = Array(30).fill(undefined).map((_, index) => ({
  id: `#00${index + 1}`,
  photo: `https://www.radiustheme.com/demo/html/psdboss/akkhor/akkhor/img/figure/teacher.jpg`, // Placeholder photo
  name: index % 2 === 0 ? 'Mark Willy' : 'Jessia Rose',
  gender: index % 2 === 0 ? 'Male' : 'Female',
  class: index % 2 === 0 ? '2' : '1',
  subject: index % 2 === 0 ? 'English' : 'Mathematics',
  section: 'A',
  address: index % 2 === 0 ? 'TA-107 New York' : '59 Australia, Sydney',
  phone: '+123 9988558',
  email: 'kazifahim93@gmail.com',
}));

export default function TeachersTable() {
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState(sampleTeachers);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = () => {
    const filtered = sampleTeachers.filter((teacher) => 
      teacher.id.toLowerCase().includes(searchId.toLowerCase()) &&
      teacher.name.toLowerCase().includes(searchName.toLowerCase()) &&
      teacher.phone.toLowerCase().includes(searchPhone.toLowerCase())
    );
    setFilteredTeachers(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTeachers = filteredTeachers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">All Teachers Data</h2>
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
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Photo</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Gender</th>
            <th className="p-3 text-left">Class</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Section</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">E-mail</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTeachers.map((teacher, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{teacher.id}</td>
              <td className="p-3">
                <img src={teacher.photo} alt="Profile" className="w-10 h-10 rounded-full" />
              </td>
              <td className="p-3">{teacher.name}</td>
              <td className="p-3">{teacher.gender}</td>
              <td className="p-3">{teacher.class}</td>
              <td className="p-3">{teacher.subject}</td>
              <td className="p-3">{teacher.section}</td>
              <td className="p-3">{teacher.address}</td>
              <td className="p-3">{teacher.phone}</td>
              <td className="p-3">{teacher.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={filteredTeachers.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
