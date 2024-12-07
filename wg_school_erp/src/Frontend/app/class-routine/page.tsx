'use client';
import React, { useState, useEffect } from 'react';
import AddClassRoutineForm from '../components/classRoutine/AddClassRoutineForm';
import ClassRoutineTable from '../components/classRoutine/ClassRoutineTable';

export default function ClassRoutinePage() {
  const BaseUrl = "http://localhost:5000";
  const [classRoutines, setClassRoutines] = useState([]);

  // Fetch class routines from API
  useEffect(() => {
    const fetchClassRoutines = async () => {
      try {
        const response = await fetch(`${BaseUrl}/api/class-routines`);
        if (response.ok) {
          const data = await response.json();
          setClassRoutines(data);
        } else {
          console.error('Failed to fetch routines');
        }
      } catch (error) {
        console.error('Error fetching class routines:', error);
      }
    };

    fetchClassRoutines();
  }, []);
  const addClassRoutine = async (newschedule) => {
    try {
      const response = await fetch(`${BaseUrl}/api/class-routines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newschedule),
      });
  
      if (response.ok) {
        const savedRoutine = await response.json();
        setClassRoutines([...classRoutines, savedRoutine.routine]);
      } else {
        const errorData = await response.json();
        console.error('Failed to add routine:', errorData.message); // Log the error message
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding class routine:', error);
      alert('An error occurred while adding the class routine');
    }
  };
  

  

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-6 bg-gray-50 min-h-screen">
      <AddClassRoutineForm onAddRoutine={addClassRoutine} />
      <ClassRoutineTable routines={classRoutines} />
    </div>
  );
}
