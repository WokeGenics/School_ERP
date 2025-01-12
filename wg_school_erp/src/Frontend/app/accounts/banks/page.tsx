"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Chart for client-side rendering
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function FinanceManagement() {
  const [activeTab, setActiveTab] = useState("categories");

  // State for Categories
  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({ name: "", subcategory: "" });

  // State for Banks
  const [banks, setBanks] = useState([]);
  const [bankForm, setBankForm] = useState({ name: "", accountNumber: "", ifsc: "" });

  // State for Reports
  const [selectedReport, setSelectedReport] = useState("balanceSheet");
  const [reportData, setReportData] = useState(null);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Mock Data for Reports
  const mockData = {
    balanceSheet: { assets: 50000, liabilities: 30000 },
    profitAndLoss: { income: 70000, expenses: 50000 },
    cashFlow: { inflow: 60000, outflow: 40000 },
    gstReport: { collected: 20000, paid: 15000, pending: 5000 },
    stockSummary: { available: 12000, reserved: 3000, damaged: 500 },
    dayBook: {
      debit: 35000,
      credit: 40000,
      transactions: [
        { date: "2024-12-01", description: "Sales", amount: 5000, type: "credit" },
        { date: "2024-12-02", description: "Purchase", amount: -3000, type: "debit" },
      ],
    },
    ledgerAccount: {
      openingBalance: 10000,
      closingBalance: 14000,
      transactions: [
        { date: "2024-12-01", description: "Sales", amount: 5000, type: "credit" },
        { date: "2024-12-02", description: "Purchase", amount: -3000, type: "debit" },
      ],
    },
  };

  // Fetch Report Data
  const fetchReportData = (reportType, startDate, endDate) => {
    setReportData(mockData[reportType]);
  };

  // Handlers for Categories
  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm({ ...categoryForm, [name]: value });
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    setCategories([...categories, { ...categoryForm, id: Date.now() }]);
    setCategoryForm({ name: "", subcategory: "" });
  };

  const handleCategoryDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  // Handlers for Banks
  const handleBankInputChange = (e) => {
    const { name, value } = e.target;
    setBankForm({ ...bankForm, [name]: value });
  };

  const handleBankSubmit = (e) => {
    e.preventDefault();
    setBanks([...banks, { ...bankForm, id: Date.now() }]);
    setBankForm({ name: "", accountNumber: "", ifsc: "" });
  };

  const handleBankDelete = (id) => {
    setBanks(banks.filter((bank) => bank.id !== id));
  };

  // Handle Report Selection
  const handleReportChange = (reportType) => {
    setSelectedReport(reportType);
    fetchReportData(reportType, dateRange.start, dateRange.end);
  };

  // Handle Export
  const handleExport = (format) => {
    alert(`Exporting ${selectedReport} as ${format}`);
    // Implement PDF/Excel export logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Finance Management System</h1>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 py-2 rounded ${
              activeTab === "categories"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab("banks")}
            className={`px-4 py-2 rounded ${
              activeTab === "banks"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Banks
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-4 py-2 rounded ${
              activeTab === "reports"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Reports
          </button>
        </div>

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Finance Categories</h2>
            <form onSubmit={handleCategorySubmit} className="mb-6 space-y-4">
              <div>
                <label className="block text-gray-600">Category Name</label>
                <input
                  type="text"
                  name="name"
                  value={categoryForm.name}
                  onChange={handleCategoryInputChange}
                  className="border w-full px-4 py-2 rounded-md"
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600">Subcategory Name</label>
                <input
                  type="text"
                  name="subcategory"
                  value={categoryForm.subcategory}
                  onChange={handleCategoryInputChange}
                  className="border w-full px-4 py-2 rounded-md"
                  placeholder="Enter subcategory name"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Category
              </button>
            </form>

            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-4 py-2">Category</th>
                  <th className="border border-gray-200 px-4 py-2">Subcategory</th>
                  <th className="border border-gray-200 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="border border-gray-200 px-4 py-2">{category.name}</td>
                    <td className="border border-gray-200 px-4 py-2">{category.subcategory}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      <button
                        onClick={() => handleCategoryDelete(category.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Banks Tab */}
        {activeTab === "banks" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Bank Management</h2>
            <form onSubmit={handleBankSubmit} className="mb-6 space-y-4">
              <div>
                <label className="block text-gray-600">Bank Name</label>
                <input
                  type="text"
                  name="name"
                  value={bankForm.name}
                  onChange={handleBankInputChange}
                  className="border w-full px-4 py-2 rounded-md"
                  placeholder="Enter bank name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={bankForm.accountNumber}
                  onChange={handleBankInputChange}
                  className="border w-full px-4 py-2 rounded-md"
                  placeholder="Enter account number"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600">IFSC Code</label>
                <input
                  type="text"
                  name="ifsc"
                  value={bankForm.ifsc}
                  onChange={handleBankInputChange}
                  className="border w-full px-4 py-2 rounded-md"
                  placeholder="Enter IFSC code"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Bank
              </button>
            </form>

            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-4 py-2">Bank Name</th>
                  <th className="border border-gray-200 px-4 py-2">Account Number</th>
                  <th className="border border-gray-200 px-4 py-2">IFSC</th>
                  <th className="border border-gray-200 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {banks.map((bank) => (
                  <tr key={bank.id}>
                    <td className="border border-gray-200 px-4 py-2">{bank.name}</td>
                    <td className="border border-gray-200 px-4 py-2">{bank.accountNumber}</td>
                    <td className="border border-gray-200 px-4 py-2">{bank.ifsc}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      <button
                        onClick={() => handleBankDelete(bank.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Financial Reports</h2>
            {/* Report Navigation */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => handleReportChange("balanceSheet")}
                className={`px-4 py-2 rounded ${
                  selectedReport === "balanceSheet"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Balance Sheet
              </button>
              <button
                onClick={() => handleReportChange("profitAndLoss")}
                className={`px-4 py-2 rounded ${
                  selectedReport === "profitAndLoss"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Profit & Loss
              </button>
              <button
                onClick={() => handleReportChange("cashFlow")}
                className={`px-4 py-2 rounded ${
                  selectedReport === "cashFlow"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Cash Flow
              </button>
              <button
                onClick={() => handleReportChange("gstReport")}
                className={`px-4 py-2 rounded ${
                  selectedReport === "gstReport"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                GST Report
              </button>
            </div>
            {/* Display Report Details */}
            {selectedReport && reportData && (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {selectedReport.replace(/([A-Z])/g, " $1")}
                </h3>
                {/* Add dynamic charts or data rendering for each report */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
