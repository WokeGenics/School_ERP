"use client"
import React, { useState } from 'react';

export default function ExamTable({ exams }) {
  const [search, setSearch] = useState({ exam: '', subject: '', date: '' });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const filteredExams = exams.filter((exam) => 
    (exam.examName.toLowerCase().includes(search.exam.toLowerCase())) &&
    (exam.subjectType.toLowerCase().includes(search.subject.toLowerCase())) &&
    (exam.date.includes(search.date))
  );

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-lg font-bold mb-4 text-black">All Exam Schedule</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          name="exam"
          placeholder="Search by Exam"
          value={search.exam}
          onChange={handleSearchChange}
          className="border p-2 rounded-md w-full text-black"
        />
        <input
          type="text"
          name="subject"
          placeholder="Search by Subject"
          value={search.subject}
          onChange={handleSearchChange}
          className="border p-2 rounded-md w-full text-black"
        />
        <input
          type="date"
          name="date"
          value={search.date}
          onChange={handleSearchChange}
          className="border p-2 rounded-md w-full text-black"
        />
      </div>
      <table className="min-w-full border-collapse text-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Exam Name</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Class</th>
            <th className="p-3 text-left">Section</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredExams.map((exam, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{exam.examName}</td>
              <td className="p-3">{exam.subjectType}</td>
              <td className="p-3">{exam.class}</td>
              <td className="p-3">{exam.section}</td>
              <td className="p-3">{exam.time}</td>
              <td className="p-3">{exam.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
