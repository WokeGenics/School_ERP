'use client';
import React, { useState, useEffect } from 'react';
import ExamForm from '../../components/exam/ExamForm';
import ExamTable from '../../components/exam/ExamTable';

export default function ExamSchedulePage() {
     const BaseUrl = "http://localhost:5000";
  const [exams, setExams] = useState([]);

  const fetchExams = async () => {
    try {
      const response = await fetch(`${BaseUrl}/api/exams`);
      if (!response.ok) throw new Error('Failed to fetch exam schedules');
      const data = await response.json();
      setExams(data);
    } catch (error) {
      console.error('Error fetching exams:', error.message);
    }
  };

  const addExam = async (examData) => {
    try {
      const response = await fetch(`${BaseUrl}/api/exams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examData),
      });

      if (!response.ok) throw new Error('Failed to add exam schedule');

      const newExam = await response.json();
      setExams([...exams, newExam]);
    } catch (error) {
      console.error('Error adding exam:', error.message);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExamForm onAddExam={addExam} />
        <ExamTable exams={exams} />
      </div>
    </div>
  );
}
