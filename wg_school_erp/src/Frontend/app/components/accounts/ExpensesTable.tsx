"use client";
import React, { useState } from 'react';
import Pagination from './Pagination';

const sampleExpenses = Array(30).fill().map((_, index) => ({
  id: `#00${index + 1}`,
  name: index % 2 === 0 ? 'Mark Willy' : 'Jessieal',
  expenseType: index % 3 === 0 ? 'Salary' : index % 3 === 1 ? 'Transport' : 'Utilities',
  amount: `$${(Math.random() * 5000 + 1000).toFixed(2)}`,
  status: index % 2 === 0 ? 'Paid' : 'Due',
  phone: '+123 9988558',
  email: 'kazifahim93@gmail.com',
  date: '02/02/2019',
}));

export default function ExpensesTable() {
  const [expensesData, setExpensesData] = useState(sampleExpenses);
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = () => {
    const filteredExpenses = sampleExpenses.filter(
      (expense) =>
        expense.id.toLowerCase().includes(searchId.toLowerCase()) &&
        expense.name.toLowerCase().includes(searchName.toLowerCase()) &&
        expense.phone.toLowerCase().includes(searchPhone.toLowerCase())
    );
    setExpensesData(filteredExpenses);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExpenses = expensesData.slice(startIndex, startIndex + itemsPerPage);

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
            <th className="p-3 text-left">Expense Type</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedExpenses.map((expense) => (
            <tr key={expense.id} className="border-b">
              <td className="p-3"><input type="checkbox" /></td>
              <td className="p-3">{expense.id}</td>
              <td className="p-3">{expense.name}</td>
              <td className="p-3">{expense.expenseType}</td>
              <td className="p-3">{expense.amount}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    expense.status === 'Paid' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {expense.status}
                </span>
              </td>
              <td className="p-3">{expense.phone}</td>
              <td className="p-3">{expense.email}</td>
              <td className="p-3">{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={expensesData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
