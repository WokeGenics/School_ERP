"use client";
import React, { useState, useEffect } from 'react';
import AttendanceForm from '../components/attendence/AttendanceForm';
import AttendanceTable from '../components/attendence/AttendanceTable';

export default function AttendancePage() {
   const BaseUrl = "http://localhost:5000"
  const [attendanceData, setAttendanceData] = useState({
    class: '',
    section: '',
    month: '',
    session: '',
    students: [],
  });

  const handleSave = async (formData) => {
    try {
      const response = await fetch(`${BaseUrl}/api/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save attendance data');

      const data = await response.json();
      setAttendanceData(data);
    } catch (error) {
      console.error('Error saving attendance data:', error.message);
    }
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

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch('/api/attendance');
        if (!response.ok) throw new Error('Failed to fetch attendance data');

        const data = await response.json();
        setAttendanceData(data);
      } catch (error) {
        console.error('Error fetching attendance data:', error.message);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <AttendanceForm onSave={handleSave} onReset={handleReset} />
      {attendanceData.students.length > 0 && <AttendanceTable attendanceData={attendanceData} />}
    </div>
  );
}
