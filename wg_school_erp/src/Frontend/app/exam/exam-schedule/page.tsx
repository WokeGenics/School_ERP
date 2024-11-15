'use client';
import React, { useState } from 'react';
import ExamForm from '../../components/exam/ExamForm';
import ExamTable from '../../components/exam/ExamTable';

export default function ExamSchedulePage() {
  const [exams, setExams] = useState([
    {
      examName: 'Class Test',
      subjectType: 'Mathematics',
      class: '4',
      section: 'A',
      time: '10:00 am - 11:00 am',
      date: '2023-06-20',
    },
    {
      examName: 'Class Test',
      subjectType: 'English',
      class: '4',
      section: 'A',
      time: '11:00 am - 12:00 pm',
      date: '2023-06-21',
    },
    {
      examName: 'Class Test',
      subjectType: 'Chemistry',
      class: '5',
      section: 'B',
      time: '09:00 am - 10:00 am',
      date: '2023-06-22',
    },
    {
      examName: 'Midterm Exam',
      subjectType: 'Physics',
      class: '5',
      section: 'A',
      time: '02:00 pm - 03:30 pm',
      date: '2023-06-23',
    },
    {
      examName: 'Final Exam',
      subjectType: 'History',
      class: '6',
      section: 'C',
      time: '01:00 pm - 02:30 pm',
      date: '2023-06-24',
    },
  ]);

  const addExam = (examData) => {
    setExams([...exams, examData]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExamForm onAddExam={addExam} />
        <ExamTable exams={exams} />
      </div>
    </div>
  );
}
