"use client"
import React, { useState } from "react";
import AddGradeForm from "../../components/exam/AddGradeForm";
import GradeTable from "../../components/exam/GradeTable";

const ExamGradesPage = () => {
  const [grades, setGrades] = useState([
    { gradeName: "A+", gradePoint: "4.0", percentFrom: "95", percentUpTo: "100", comment: "Excellent" },
    { gradeName: "A", gradePoint: "3.5", percentFrom: "90", percentUpTo: "94", comment: "Very Good" },
    { gradeName: "B+", gradePoint: "3.0", percentFrom: "85", percentUpTo: "89", comment: "Good" },
  ]);

  const addGrade = (newGrade) => {
    setGrades([...grades, newGrade]);
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
