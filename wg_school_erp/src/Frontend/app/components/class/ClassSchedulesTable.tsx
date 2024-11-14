"use client";
import React, { useState } from 'react';
import Pagination from './Pagination';

const sampleSchedules = Array(30).fill().map((_, index) => ({
  id: `#00${index + 1}`,
  photo: `https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg`, // Placeholder photo
  name: index % 2 === 0 ? 'Mark Willy' : 'Jessia Rose',
  gender: index % 2 === 0 ? 'Male' : 'Female',
  class: index % 3 + 1,
  section: 'A',
  date: '02/05/2001',
  time: index % 2 === 0 ? '10:00 am - 11:30 am' : '11:00 am - 12:30 pm',
  phone: '+123 9988558',
  email: 'kazifahim93@gmail.com',
}));

export default function ClassSchedulesTable() {
  const [schedulesData, setSchedulesData] = useState(sampleSchedules);
  const [sortConfig, setSortConfig] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchClass, setSearchClass] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = () => {
    const filteredSchedules = sampleSchedules.filter(
      (schedule) =>
        schedule.id.toLowerCase().includes(searchId.toLowerCase()) &&
        schedule.name.toLowerCase().includes(searchName.toLowerCase()) &&
        schedule.class.toString().includes(searchClass)
    );
    setSchedulesData(filteredSchedules);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...schedulesData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setSchedulesData(sortedData);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSchedules = schedulesData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">All Class Schedules</h2>
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
          placeholder="Search by Class..."
          value={searchClass}
          onChange={(e) => setSearchClass(e.target.value)}
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
            <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('id')}>ID</th>
            <th className="p-3 text-left">Photo</th>
            <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('name')}>Name</th>
            <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('gender')}>Gender</th>
            <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('class')}>Class</th>
            <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('section')}>Section</th>
            <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('date')}>Date</th>
            <th className="p-3 text-left cursor-pointer" onClick={() => handleSort('time')}>Time</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {paginatedSchedules.map((schedule) => (
            <tr key={schedule.id} className="border-b">
              <td className="p-3"><input type="checkbox" /></td>
              <td className="p-3">{schedule.id}</td>
              <td className="p-3">
                <img src={schedule.photo} alt="Profile" className="w-10 h-10 rounded-full" />
              </td>
              <td className="p-3">{schedule.name}</td>
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
      <Pagination
        totalItems={schedulesData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
