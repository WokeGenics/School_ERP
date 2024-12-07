'use client';
import React, { useState, useEffect } from 'react';
import AddGradeForm from '../../components/exam/AddGradeForm';
import GradeTable from '../../components/exam/GradeTable';

const ExamGradesPage = () => {
  const BaseUrl = "http://localhost:5000";
  const [grades, setGrades] = useState([]);

  // Fetch grades from API
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await fetch(`${BaseUrl}/api/grades`);
        const data = await response.json();
        setGrades(data);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, []);

  // Add grade to the database
  const addGrade = async (newGrade) => {
    try {
      const response = await fetch(`${BaseUrl}/api/grades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGrade),
      });

      if (response.ok) {
        const savedGrade = await response.json();
        setGrades([...grades, savedGrade.grade]);
      }
    } catch (error) {
      console.error('Error adding grade:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddGradeForm onAddGrade={addGrade} />
        <GradeTable grades={grades} />
      </div>
    </div>
  );
};

export default ExamGradesPage;
