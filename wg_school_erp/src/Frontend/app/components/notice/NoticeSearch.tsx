
"use client";
import React from "react";

const NoticeSearch = ({ onSearch, searchQuery }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by Title..."
        onChange={(e) => onSearch(e.target.value.toLowerCase())}
        value={searchQuery}
        className="flex-1 border border-gray-300 p-2 rounded w-full"
      />
    </div>
  );
};

export default NoticeSearch;
