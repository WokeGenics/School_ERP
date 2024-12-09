"use client";

import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

export default function ExpensesTable() {
  const [allFees, setAllFees] = useState([]); // Holds the full dataset
  const [feesData, setFeesData] = useState([]); // Holds the currently displayed data
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch expenses from the backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/fee");
        if (!response.ok) throw new Error("Failed to fetch expenses");
        const data = await response.json();
        setAllFees(data);
        setFeesData(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        alert("Failed to load expenses!");
      }
    };

    fetchExpenses();
  }, []);

  const handleSearch = () => {
    const filteredFees = allFees.filter(
      (fee) =>
        fee.idNo.toLowerCase().includes(searchId.toLowerCase()) &&
        fee.name.toLowerCase().includes(searchName.toLowerCase()) &&
        fee.phone.toLowerCase().includes(searchPhone.toLowerCase())
    );
    setFeesData(filteredFees);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFees = feesData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">All Expenses</h2>
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
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Due</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedFees.map((fee) => (
            <tr key={fee.id} className="border-b">
              <td className="p-3"><input type="checkbox" /></td>
              <td className="p-3">{fee.idNo}</td>
              <td className="p-3">{fee.name}</td>
              <td className="p-3">{fee.amount}</td>
              <td className="p-3">{fee.due}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    fee.status === "Paid" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {fee.status}
                </span>
              </td>
              <td className="p-3">{fee.phone}</td>
              <td className="p-3">{fee.email}</td>
              <td className="p-3">{fee.date}</td>
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
