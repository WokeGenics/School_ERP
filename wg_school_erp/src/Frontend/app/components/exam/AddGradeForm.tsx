"use client";
import React, { useState } from "react";

const AddGradeForm = ({ onAddGrade }) => {
  const [formValues, setFormValues] = useState({
    gradeName: "",
    gradePoint: "",
    percentFrom: "",
    percentUpTo: "",
    comment: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGrade(formValues);
    setFormValues({
      gradeName: "",
      gradePoint: "",
      percentFrom: "",
      percentUpTo: "",
      comment: "",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 text-black">
      <h2 className="text-xl font-semibold mb-4">Add New Grade</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="gradeName"
            placeholder="Grade Name"
            value={formValues.gradeName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="gradePoint"
            placeholder="Grade Point"
            value={formValues.gradePoint}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4 flex space-x-2">
          <input
            type="number"
            name="percentFrom"
            placeholder="Percentage From"
            value={formValues.percentFrom}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="number"
            name="percentUpTo"
            placeholder="Percentage Up To"
            value={formValues.percentUpTo}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            name="comment"
            placeholder="Comment"
            value={formValues.comment}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          ></textarea>
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Save
          </button>
          <button
            type="reset"
            onClick={() =>
              setFormValues({
                gradeName: "",
                gradePoint: "",
                percentFrom: "",
                percentUpTo: "",
                comment: "",
              })
            }
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGradeForm;
