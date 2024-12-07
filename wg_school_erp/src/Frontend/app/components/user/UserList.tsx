import React, { useState } from "react";
import { FaEdit, FaEye, FaTrash, FaSearch } from "react-icons/fa";
import UserDetailsModal from "./UserDetails";

export default function UserList({ users, handleEdit, handleDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selectedUser, setSelectedUser] = useState(null); // For the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const usersPerPage = 5;

  // Filter users based on the search query
  const filterUsers = () => {
    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toString().includes(searchQuery)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to the first page when a new search is performed
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">All Users</h2>

      {/* Search Bar with Button */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name, ID, or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-2 border rounded-l"
        />
        <button
          onClick={filterUsers}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 flex items-center"
        >
          <FaSearch className="mr-2" />
          Search
        </button>
      </div>

      {/* User Table */}
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-300 p-2">{startIndex + index + 1}</td>
              <td className="border border-gray-300 p-2">
                {user.firstName} {user.lastName}
              </td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.phone}</td>
              <td className="border border-gray-300 p-2 flex justify-center space-x-4">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleViewDetails(user)}
                >
                  <FaEye />
                </button>
                <button
                  className="text-yellow-500 hover:text-yellow-700"
                  onClick={() => handleEdit(user.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(user.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {filteredUsers.length > usersPerPage && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={handleNextPage}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* User Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
