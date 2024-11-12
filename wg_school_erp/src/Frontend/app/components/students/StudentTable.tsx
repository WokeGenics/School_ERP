"use client";
import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';

const sampleData = Array(30).fill().map((_, index) => ({
  roll: `#002${index + 1}`,
  photo: `https://icon-library.com/images/student-icon/student-icon-11.jpg`,
  name: index % 2 === 0 ? 'Mark Willy' : 'Jessia Rose',
  gender: index % 2 === 0 ? 'Male' : 'Female',
  class: index % 2 === 0 ? '2' : '1',
  section: 'A',
  parents: index % 2 === 0 ? 'Jack Sparrow' : 'Maria Jamans',
  address: index % 2 === 0 ? 'TA-107 New York' : '59 Australia, Sydney',
  dob: '02/05/2001',
  phone: '+123 9988558',
  email: 'kazifahim93@gmail.com',
}));

export default function StudentTable() {
  const [data, setData] = useState(sampleData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: 'roll', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const filtered = data.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roll.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white shadow-md p-6 rounded-md overflow-x-auto">
      <h2 className="text-lg font-bold mb-4 text-black">All Students Data</h2>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by Roll or Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border text-black p-2 rounded-md w-1/3"
        />
        <button className="bg-yellow-500 text-white p-2 rounded-md" onClick={() => setSearchTerm('')}>
          Clear
        </button>
      </div>
      <table className="min-w-full border-collapse text-gray-500">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('roll')}>Roll</th>
            <th className="p-3 text-left">Photo</th>
            <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('name')}>Name</th>
            <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('gender')}>Gender</th>
            <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('class')}>Class</th>
            <th className="p-3 text-left">Section</th>
            <th className="p-3 text-left">Parents</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Date of Birth</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">E-mail</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((student, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{student.roll}</td>
              <td className="p-3">
                <img src={student.photo} alt="Profile" className="w-10 h-10 rounded-full" />
              </td>
              <td className="p-3">{student.name}</td>
              <td className="p-3">{student.gender}</td>
              <td className="p-3">{student.class}</td>
              <td className="p-3">{student.section}</td>
              <td className="p-3">{student.parents}</td>
              <td className="p-3">{student.address}</td>
              <td className="p-3">{student.dob}</td>
              <td className="p-3">{student.phone}</td>
              <td className="p-3">{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
