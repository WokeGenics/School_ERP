"use client";
import React, { useState } from 'react';
import Pagination from './Pagination';
import { FaEllipsisV, FaTimes, FaEdit, FaSyncAlt } from 'react-icons/fa';

const sampleBooks = Array(30).fill().map((_, index) => ({
  id: `#00${index + 1}`,
  name: index % 2 === 0 ? 'English Grammar' : 'Expert Mathematics',
  subject: index % 2 === 0 ? 'English' : 'Math',
  writer: index % 2 === 0 ? 'David Morgan' : 'Robert John',
  class: index % 2 === 0 ? '5' : '8',
  published: index % 2 === 0 ? '2019' : '2020',
  creatingDate: '12.02.2019',
}));

export default function BooksTable() {
  const [books, setBooks] = useState(sampleBooks);
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [editingRow, setEditingRow] = useState(null);
  const [editedBook, setEditedBook] = useState({});

  const handleSearch = () => {
    const filteredBooks = sampleBooks.filter(
      (book) =>
        book.id.toLowerCase().includes(searchId.toLowerCase()) &&
        book.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setBooks(filteredBooks);
    setCurrentPage(1);
  };

  const handleEdit = (book) => {
    setEditingRow(book.id);
    setEditedBook(book);
  };

  const handleUpdate = () => {
    const updatedBooks = books.map((book) =>
      book.id === editedBook.id ? editedBook : book
    );
    setBooks(updatedBooks);
    setEditingRow(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleCloseEdit = () => {
    setEditingRow(null);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = books.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg overflow-x-auto text-black">
      <h2 className="text-lg font-bold mb-4">All Books</h2>
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
            <th className="p-3 text-left">Book Name</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Writer</th>
            <th className="p-3 text-left">Class</th>
            <th className="p-3 text-left">Published</th>
            <th className="p-3 text-left">Creating Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBooks.map((book) => (
            <tr key={book.id} className="border-b">
              <td className="p-3"><input type="checkbox" /></td>
              <td className="p-3">{book.id}</td>
              <td className="p-3">
                {editingRow === book.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedBook.name}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                  />
                ) : (
                  book.name
                )}
              </td>
              <td className="p-3">
                {editingRow === book.id ? (
                  <input
                    type="text"
                    name="subject"
                    value={editedBook.subject}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                  />
                ) : (
                  book.subject
                )}
              </td>
              <td className="p-3">
                {editingRow === book.id ? (
                  <input
                    type="text"
                    name="writer"
                    value={editedBook.writer}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                  />
                ) : (
                  book.writer
                )}
              </td>
              <td className="p-3">
                {editingRow === book.id ? (
                  <input
                    type="text"
                    name="class"
                    value={editedBook.class}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                  />
                ) : (
                  book.class
                )}
              </td>
              <td className="p-3">
                {editingRow === book.id ? (
                  <input
                    type="text"
                    name="published"
                    value={editedBook.published}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                  />
                ) : (
                  book.published
                )}
              </td>
              <td className="p-3">{book.creatingDate}</td>
              <td className="p-3">
                {editingRow === book.id ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white p-2 rounded-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCloseEdit}
                      className="bg-red-500 text-white p-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() => handleEdit(book)}
                      className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <FaEllipsisV />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={books.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
