"use client";
import React, { useState, useEffect } from "react";
import { read, utils, writeFile } from "xlsx";

const Attendance = () => {
  const [activeTab, setActiveTab] = useState("staff");
  const [staff, setStaff] = useState([
    { id: 1, name: "John Doe", department: "Administration", date: "2024-12-28", status: "", remarks: "" },
    { id: 2, name: "Jane Smith", department: "HR", date: "2024-12-28", status: "", remarks: "" },
    { id: 3, name: "Alice Johnson", department: "Finance", date: "2024-12-28", status: "", remarks: "" },
    { id: 4, name: "Bob Williams", department: "IT", date: "2024-12-28", status: "", remarks: "" },
    { id: 5, name: "Charlie Brown", department: "Operations", date: "2024-12-28", status: "", remarks: "" }
]);
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Mr. Adams", subject: "Math", date: "2024-12-28", status: "", remarks: "" },
    { id: 2, name: "Ms. Johnson", subject: "English", date: "2024-12-28", status: "", remarks: "" },
    { id: 3, name: "Mrs. Green", subject: "Science", date: "2024-12-28", status: "", remarks: "" },
    { id: 4, name: "Mr. White", subject: "History", date: "2024-12-28", status: "", remarks: "" },
    { id: 5, name: "Ms. Black", subject: "Art", date: "2024-12-28", status: "", remarks: "" }
]);

  const [filters, setFilters] = useState({ department: "", subject: "", date: "2024-12-28", search: "" });
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 5 });
  const [hasChanges, setHasChanges] = useState(false);

  const getData = () => {
    if (activeTab === "staff") return staff;
    return teachers;
  };

  const setData = (data) => {
    if (activeTab === "staff") setStaff(data);
    if (activeTab === "teachers") setTeachers(data);
  };

  // Ensure default data exists for the selected date
  useEffect(() => {
    const data = getData();
    const existingRecords = data.filter((item) => item.date === filters.date);
    if (existingRecords.length === 0) {
      const newRecords = data
        .filter((item) => item.date === "2024-12-28")
        .map((item) => ({
          ...item,
          date: filters.date,
          id: Date.now() + Math.random(),
          status: "",
          remarks: "",
        }));
      setData([...data, ...newRecords]);
    }
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, [filters.date, activeTab]);

  const handleStatusChange = (id, status) => {
    setHasChanges(true);
    setData(
      getData().map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleRemarksChange = (id, remarks) => {
    setHasChanges(true);
    setData(
      getData().map((item) => (item.id === id ? { ...item, remarks } : item))
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

  const filteredData = getData().filter((item) => {
    const isDepartmentMatch = !filters.department || item.department === filters.department;
    const isSubjectMatch = !filters.subject || item.subject === filters.subject;
    const isDateMatch = item.date === filters.date;
    const isSearchMatch = !filters.search || item.name.toLowerCase().includes(filters.search.toLowerCase());

    return isDepartmentMatch && isSubjectMatch && isDateMatch && isSearchMatch;
  });

  const paginatedData = filteredData.slice(
    (pagination.currentPage - 1) * pagination.rowsPerPage,
    pagination.currentPage * pagination.rowsPerPage
  );

  const handleSave = () => {
    alert(`${activeTab} attendance data saved successfully!`);
    setHasChanges(false);
  };

  const handleExport = () => {
    const ws = utils.json_to_sheet(filteredData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, `${activeTab}_Attendance`);
    writeFile(wb, `${activeTab}_attendance_${filters.date}.xlsx`);
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
      setData([...getData(), ...importedData]);
      alert("Data imported successfully!");
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Attendance System</h1>

      {/* Tabs */}
      <div className="flex mb-4 space-x-4">
        {["staff", "teachers"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-4 grid grid-cols-5 gap-4">
        {activeTab === "staff" && (
          <div>
            <label htmlFor="department" className="block text-sm font-medium">
              Department
            </label>
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              className="border rounded p-2 w-full"
            >
              <option value="">All</option>
              <option value="Administration">Administration</option>
              <option value="HR">HR</option>
            </select>
          </div>
        )}
        {activeTab === "teachers" && (
          <div>
            <label htmlFor="subject" className="block text-sm font-medium">
              Subject
            </label>
            <select
              name="subject"
              value={filters.subject}
              onChange={handleFilterChange}
              className="border rounded p-2 w-full"
            >
              <option value="">All</option>
              <option value="Math">Math</option>
              <option value="English">English</option>
            </select>
          </div>
        )}
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
            {activeTab === "staff" && (
              <th className="border border-gray-300 p-2">Department</th>
            )}
            {activeTab === "teachers" && (
              <th className="border border-gray-300 p-2">Subject</th>
            )}
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border border-gray-300 p-2">{item.id}</td>
              <td className="border border-gray-300 p-2">{item.name}</td>
              {activeTab === "staff" && (
                <td className="border border-gray-300 p-2">{item.department}</td>
              )}
              {activeTab === "teachers" && (
                <td className="border border-gray-300 p-2">{item.subject}</td>
              )}
              <td className="border border-gray-300 p-2">{item.date}</td>
              <td className="border border-gray-300 p-2">
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
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
                  value={item.remarks}
                  onChange={(e) => handleRemarksChange(item.id, e.target.value)}
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
          Export {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Attendance
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
                Math.ceil(filteredData.length / pagination.rowsPerPage),
                prev.currentPage + 1
              ),
            }))
          }
          disabled={pagination.currentPage * pagination.rowsPerPage >= filteredData.length}
          className="bg-gray-300 p-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Attendance;
