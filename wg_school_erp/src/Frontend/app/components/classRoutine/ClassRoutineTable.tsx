"use client";
import React, { useState } from 'react';
import Pagination from '../class/Pagination';

const sampleData = Array(20).fill().map((_, index) => ({
  day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][index % 7],
  class: 4,
  subject: ['Chemistry', 'English', 'Accounting', 'Economics', 'Drawing'][index % 5],
  section: 'A',
  teacher: ['Mike John', 'Adam John', 'Kate Well', 'Mike Jonas'][index % 4],
  time: '10:00 am - 11:00 am',
  date: '20/06/2019',
}));

export default function ClassRoutineTable() {
  const [data, setData] = useState(sampleData);
  const [searchDay, setSearchDay] = useState('');
  const [searchClass, setSearchClass] = useState('');
  const [searchSection, setSearchSection] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearch = () => {
    const filteredData = sampleData.filter(
      (item) =>
        item.day.toLowerCase().includes(searchDay.toLowerCase()) &&
        item.class.toString().includes(searchClass) &&
        item.section.toLowerCase().includes(searchSection.toLowerCase())
    );
    setData(filteredData);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg w-full md:w-2/3">
      <h2 className="text-lg font-bold mb-4 text-black">Class Routine</h2>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by Day..."
          value={searchDay}
          onChange={(e) => setSearchDay(e.target.value)}
          className="border p-2 rounded-md w-1/3 text-black"
        />
        <input
          type="text"
          placeholder="Search by Class..."
          value={searchClass}
          onChange={(e) => setSearchClass(e.target.value)}
          className="border p-2 rounded-md w-1/3 text-black"
        />
        <input
          type="text"
          placeholder="Search by Section..."
          value={searchSection}
          onChange={(e) => setSearchSection(e.target.value)}
          className="border p-2 rounded-md w-1/3 text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-500 text-white p-2 rounded-md"
        >
          Search
        </button>
      </div>
      <table className="min-w-full border-collapse text-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left"><input type="checkbox" /></th>
            <th className="p-3 text-left">Day</th>
            <th className="p-3 text-left">Class</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Section</th>
            <th className="p-3 text-left">Teacher</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-3"><input type="checkbox" /></td>
              <td className="p-3">{item.day}</td>
              <td className="p-3">{item.class}</td>
              <td className="p-3">{item.subject}</td>
              <td className="p-3">{item.section}</td>
              <td className="p-3">{item.teacher}</td>
              <td className="p-3">{item.time}</td>
              <td className="p-3">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
     
      />
    </div>
  );
}
