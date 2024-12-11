"use client";
import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { FaEllipsisV, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

export default function BooksTable() {
  const [books, setBooks] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [editingRow, setEditingRow] = useState(null);
  const [editedBook, setEditedBook] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch all books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/books");
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search books by ID or Name
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/books/search?id=${encodeURIComponent(
          searchId
        )}&name=${encodeURIComponent(searchName)}`
      );
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setBooks(data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Start editing a row
  const handleEdit = (book) => {
    setEditingRow(book.idNo);
    setEditedBook(book);
  };

  // Save the updated book
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/books/${editedBook._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedBook),
      });
      if (!response.ok) throw new Error("Failed to update book");
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === editedBook._id ? { ...editedBook } : book
        )
      );
      setEditingRow(null);
    } catch (error) {
      console.error("Error updating book:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a book
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete book");
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes in editable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  // Cancel editing
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
      {loading ? (
        <p>Loading...</p>
      ) : books.length > 0 ? (
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
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBooks.map((book) => (
              <tr key={book.idNo} className="border-b">
                <td className="p-3"><input type="checkbox" /></td>
                <td className="p-3">{book.idNo}</td>
                <td className="p-3">
                  {editingRow === book.idNo ? (
                    <input
                      type="text"
                      name="bookName"
                      value={editedBook.bookName}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md w-full"
                    />
                  ) : (
                    book.bookName
                  )}
                </td>
                <td className="p-3">
                  {editingRow === book.idNo ? (
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
                  {editingRow === book.idNo ? (
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
                  {editingRow === book.idNo ? (
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
                  {editingRow === book.idNo ? (
                    <input
                      type="number"
                      name="publishedYear"
                      value={editedBook.publishedYear}
                      onChange={handleInputChange}
                      className="border p-2 rounded-md w-full"
                    />
                  ) : (
                    book.publishedYear
                  )}
                </td>
                <td className="p-3">
                  {editingRow === book.idNo ? (
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
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(book)}
                        className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books found.</p>
      )}
      <Pagination
        totalItems={books.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
