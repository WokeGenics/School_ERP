// components/ClassSchedulesTable.tsx
"use client";
import React, { useState, useEffect } from 'react';

const BaseUrl = 'http://localhost:5000'; // Your backend URL

interface Schedule {
  idNo: string;
  name: string;
  gender: string;
  class: string;
  section: string;
  date: string;
  time: string;
  phone: string;
  email: string;
  photo: string;
}

export default function ClassSchedulesTable() {
  const [schedulesData, setSchedulesData] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]); // Store filtered schedules
  const [searchId, setSearchId] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');
  const [searchClass, setSearchClass] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch schedules when component mounts
    fetchSchedules();
  }, []);

  useEffect(() => {
    // Apply filters whenever any filter value changes
    filterSchedules();
  }, [schedulesData, searchId, searchName, searchClass]);

  // Fetch all schedules (no filter or pagination here)
  const fetchSchedules = async () => {
    try {
      const response = await fetch(`${BaseUrl}/api/class-schedule`);
      const data = await response.json();
      setSchedulesData(data);
      setFilteredSchedules(data); // Initially show all schedules
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  // Filter schedules based on search inputs
  const filterSchedules = () => {
    let filtered = schedulesData;

    if (searchId) {
      filtered = filtered.filter(schedule => schedule.idNo.includes(searchId));
    }

    if (searchName) {
      filtered = filtered.filter(schedule => schedule.name.toLowerCase().includes(searchName.toLowerCase()));
    }

    if (searchClass) {
      filtered = filtered.filter(schedule => schedule.class.includes(searchClass));
    }

    setFilteredSchedules(filtered);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  // Handle page change for pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Paginate filtered schedules
  const getPaginatedSchedules = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSchedules.slice(startIndex, endIndex);
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg overflow-x-auto text-black">
      <h2 className="text-lg font-bold mb-4">All Class Schedules</h2>

      {/* Filter Section */}
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
          onClick={filterSchedules}
          className="bg-yellow-500 text-white p-2 rounded-md"
        >
          Search
        </button>
      </div>

      {/* Table Section */}
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
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
          {getPaginatedSchedules().length > 0 ? (
            getPaginatedSchedules().map((schedule) => (
              <tr key={schedule.idNo} className="border-b">
                <td className="p-3">{schedule.idNo}</td>
                <td className="p-3">{schedule.teacherName}</td>
                <td className="p-3">{schedule.gender}</td>
                <td className="p-3">{schedule.class}</td>
                <td className="p-3">{schedule.section}</td>
                <td className="p-3">{schedule.date}</td>
                <td className="p-3">{schedule.time}</td>
                <td className="p-3">{schedule.phone}</td>
                <td className="p-3">{schedule.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center p-4">No schedules found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-black p-2 rounded-md"
        >
          Previous
        </button>
        <span className="self-center">{`Page ${currentPage}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= filteredSchedules.length}
          className="bg-gray-300 text-black p-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}
