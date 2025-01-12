"use client";
import React, { useState, useEffect } from "react";
import { read, utils, writeFile } from "xlsx";

const Attendance = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Jake Gyllenhaal", group: "Play Group-Red", class: "1", section: "A", date: "2024-12-28", status: "", remarks: "" },
    { id: 2, name: "Natalie Portman", group: "Play Group-Red", class: "1", section: "A", date: "2024-12-28", status: "", remarks: "" },
    { id: 3, name: "Elle Fanning", group: "Play Group-Red", class: "2", section: "B", date: "2024-12-28", status: "", remarks: "" },
  ]);

  const [filters, setFilters] = useState({ class: "", section: "", date: "2024-12-28", search: "" });
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 5 });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const existingRecords = students.filter((student) => student.date === filters.date);
    if (existingRecords.length === 0) {
      const newRecords = students
        .filter((student) => student.date === "2024-12-28")
        .map((student) => ({
          ...student,
          date: filters.date,
          id: Date.now() + Math.random(),
          status: "",
          remarks: "",
        }));
      setStudents((prev) => [...prev, ...newRecords]);
    }
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, [filters.date, students]);

  const handleStatusChange = (id, status) => {
    setHasChanges(true);
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? { ...student, status } : student))
    );
  };

  const handleRemarksChange = (id, remarks) => {
    setHasChanges(true);
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? { ...student, remarks } : student))
    );
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateNavigation = (direction) => {
    const currentDate = new Date(filters.date);
    currentDate.setDate(currentDate.getDate() + direction);
    setFilters((prev) => ({ ...prev, date: currentDate.toISOString().split("T")[0] }));
  };

  const filteredStudents = students.filter((student) => {
    const isClassMatch = !filters.class || student.class === filters.class;
    const isSectionMatch = !filters.section || student.section === filters.section;
    const isDateMatch = student.date === filters.date;
    const isSearchMatch = !filters.search || student.name.toLowerCase().includes(filters.search.toLowerCase());

    return isClassMatch && isSectionMatch && isDateMatch && isSearchMatch;
  });

  const paginatedStudents = filteredStudents.slice(
    (pagination.currentPage - 1) * pagination.rowsPerPage,
    pagination.currentPage * pagination.rowsPerPage
  );

  const handleSave = () => {
    alert("Attendance data saved successfully!");
    setHasChanges(false);
  };

  const handleExport = () => {
    const ws = utils.json_to_sheet(filteredStudents);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Attendance");
    writeFile(wb, `attendance_${filters.date}.xlsx`);
  };


  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const importedData = utils.sheet_to_json(sheet);
      setStudents((prev) => [...prev, ...importedData]);
      alert("Data imported successfully!");
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Attendance System</h1>

      {/* Filters */}
      <div className="mb-4 grid grid-cols-5 gap-4">
        <div>
          <label htmlFor="class" className="block text-sm font-medium">
            Class
          </label>
          <select name="class" value={filters.class} onChange={handleFilterChange} className="border rounded p-2 w-full">
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div>
          <label htmlFor="section" className="block text-sm font-medium">
            Section
          </label>
          <select name="section" value={filters.section} onChange={handleFilterChange} className="border rounded p-2 w-full">
            <option value="">All</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium">
            Date
          </label>
          <div className="flex items-center space-x-2">
            <button onClick={() => handleDateNavigation(-1)} className="p-2 bg-gray-300 rounded">
              &lt;
            </button>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="border rounded p-2 w-full"
            />
            <button onClick={() => handleDateNavigation(1)} className="p-2 bg-gray-300 rounded">
              &gt;
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="search" className="block text-sm font-medium">
            Search
          </label>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="import" className="block text-sm font-medium">
            Import Data
          </label>
          <input type="file" accept=".xlsx, .xls" onChange={handleImport} className="border rounded p-2 w-full" />
        </div>
      </div>

      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-200 mb-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Group</th>
            <th className="border border-gray-300 p-2">Class</th>
            <th className="border border-gray-300 p-2">Section</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStudents.map((student) => (
            <tr key={student.id} className="text-center">
              <td className="border border-gray-300 p-2">{student.id}</td>
              <td className="border border-gray-300 p-2">{student.name}</td>
              <td className="border border-gray-300 p-2">{student.group}</td>
              <td className="border border-gray-300 p-2">{student.class}</td>
              <td className="border border-gray-300 p-2">{student.section}</td>
              <td className="border border-gray-300 p-2">{student.date}</td>
              <td className="border border-gray-300 p-2">
                <select
                  value={student.status}
                  onChange={(e) => handleStatusChange(student.id, e.target.value)}
                  className="border rounded p-1 w-full"
                >
                  <option value="">Select</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                  <option value="Leave">Leave</option>
                </select>
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={student.remarks}
                  onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                  className="border rounded p-1 w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Export Buttons */}
      <div className="flex space-x-4 mb-4">
        <button onClick={handleExport} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Export Attendance
        </button>
      
      </div>

      {/* Save Button */}
      {hasChanges && (
        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save
        </button>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPagination((prev) => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }))}
          disabled={pagination.currentPage === 1}
          className="bg-gray-300 p-2 rounded"
        >
          Previous
        </button>
        <span>Page {pagination.currentPage}</span>
        <button
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              currentPage: Math.min(
                Math.ceil(filteredStudents.length / pagination.rowsPerPage),
                prev.currentPage + 1
              ),
            }))
          }
          disabled={pagination.currentPage * pagination.rowsPerPage >= filteredStudents.length}
          className="bg-gray-300 p-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Attendance;
