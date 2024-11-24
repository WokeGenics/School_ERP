"use client";
import React from 'react';

export default function AttendanceTable({ attendanceData }) {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-lg font-bold mb-4 text-black">
        Attendance Sheet Of Class {attendanceData.class}: Section {attendanceData.section}, {attendanceData.month} {attendanceData.session}
      </h2>
      <table className="min-w-full border-collapse text-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Students</th>
            {Array.from({ length: 31 }, (_, i) => (
              <th key={i} className="p-3 text-center">{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attendanceData.students.map((student, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-3">{student.name}</td>
              {student.attendance.map((day, dayIdx) => (
                <td
                  key={dayIdx}
                  className={`p-3 text-center ${
                    day === 'Present' ? 'text-green-600' : day === 'Absent' ? 'text-red-600' : ''
                  }`}
                >
                  {day === 'Present' ? '✓' : day === 'Absent' ? '✗' : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
