import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const sampleStudents = [
  {
    name: 'Jessia Rose',
    parentName: 'Steve Jones',
    class: '2',
    section: 'A',
  }

];

export default function StudentSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(sampleStudents);

  const handleSearch = () => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = sampleStudents.filter((student) =>
      student.name.toLowerCase().includes(lowercasedTerm) ||
      student.parentName.toLowerCase().includes(lowercasedTerm) ||
      student.class.toLowerCase().includes(lowercasedTerm) ||
      student.section.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredStudents(filtered);
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg mb-6">
      <h2 className="text-lg font-bold mb-4">Search Students</h2>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, parent name, class, or section..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-500 text-white p-2 rounded-md flex items-center space-x-2"
        >
          <FaSearch />
          <span>Search</span>
        </button>
      </div>
      <div>
        {filteredStudents.length > 0 ? (
          <ul className="space-y-2">
            {filteredStudents.map((student, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-md">
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Parent Name:</strong> {student.parentName}</p>
                <p><strong>Class:</strong> {student.class}</p>
                <p><strong>Section:</strong> {student.section}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No students found.</p>
        )}
      </div>
    </div>
  );
}
