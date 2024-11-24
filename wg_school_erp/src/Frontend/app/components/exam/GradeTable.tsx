"use client";
import React, { useState } from "react";

const GradeTable = ({ grades }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGrades = grades.filter((grade) =>
    grade.gradeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grade.gradePoint.includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-lg shadow p-6 text-black">
      <h2 className="text-xl font-semibold mb-4">Exam Grade Lists</h2>
      <input
        type="text"
        placeholder="Search by Grade or Point..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded mb-4"
      />
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Grade Name</th>
            <th className="border border-gray-300 p-2">Grade Point</th>
            <th className="border border-gray-300 p-2">Percent From</th>
            <th className="border border-gray-300 p-2">Percent Up To</th>
            <th className="border border-gray-300 p-2">Comment</th>
          </tr>
        </thead>
        <tbody>
          {filteredGrades.map((grade, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{grade.gradeName}</td>
              <td className="border border-gray-300 p-2">{grade.gradePoint}</td>
              <td className="border border-gray-300 p-2">{grade.percentFrom}</td>
              <td className="border border-gray-300 p-2">{grade.percentUpTo}</td>
              <td className="border border-gray-300 p-2">{grade.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeTable;
