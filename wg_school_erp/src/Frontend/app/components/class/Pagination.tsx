"use client";
import React from 'react';

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex items-center justify-between mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50 text-black"
      >
        Previous
      </button>
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === index + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50 text-black"
      >
        Next
      </button>
    </div>
  );
}
