"use client"
import React, { useState } from 'react';
import AttendanceForm from '../components/attendence/AttendanceForm';
import AttendanceTable from '../components/attendence/AttendanceTable';

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState({
    class: '',
    section: '',
    month: '',
    session: '',
    students: [],
  });

  const handleSave = (formData) => {
    // Mock data: populate with sample students and attendance
    const sampleStudents = [
      { name: 'Michele Johnson', attendance: ['Present', 'Absent', 'Present', 'Present', 'Absent', 'Present', 'Absent'] },
      { name: 'Richi Akon', attendance: ['Absent', 'Present', 'Present', 'Absent', 'Present', 'Absent', 'Present'] },
      { name: 'Amanda Kherr', attendance: ['Present', 'Present', 'Absent', 'Present', 'Present', 'Absent', 'Present'] },
    ];
    
    setAttendanceData({
      ...formData,
      students: sampleStudents.map((student) => ({
        ...student,
        attendance: Array(31).fill().map(() => (Math.random() > 0.5 ? 'Present' : 'Absent'))
      })),
    });
  };

  const handleReset = () => {
    setAttendanceData({
      class: '',
      section: '',
      month: '',
      session: '',
      students: [],
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <AttendanceForm onSave={handleSave} onReset={handleReset} />
      {attendanceData.students.length > 0 && <AttendanceTable attendanceData={attendanceData} />}
    </div>
  );
}
