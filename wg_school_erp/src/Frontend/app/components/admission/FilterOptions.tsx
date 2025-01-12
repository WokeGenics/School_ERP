
import React from "react";

const FilterOptions = ({ filters, onFilterChange }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <input
        type="text"
        name="name"
        className="border border-gray-300 rounded-lg p-2"
        placeholder="Filter by Name"
        value={filters.name}
        onChange={onFilterChange}
      />
      <input
        type="text"
        name="role"
        className="border border-gray-300 rounded-lg p-2"
        placeholder="Filter by Role"
        value={filters.role}
        onChange={onFilterChange}
      />
      <input
        type="text"
        name="email"
        className="border border-gray-300 rounded-lg p-2"
        placeholder="Filter by Email"
        value={filters.email}
        onChange={onFilterChange}
      />
      <input
        type="text"
        name="contact"
        className="border border-gray-300 rounded-lg p-2"
        placeholder="Filter by Contact"
        value={filters.contact}
        onChange={onFilterChange}
      />
    </div>
  );
};

export default FilterOptions;
