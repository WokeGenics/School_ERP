"use client";
import React from "react";
import Papa from "papaparse";

const FileUpload = ({ onFileUpload }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === "text/csv") {
      // Parse CSV
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          onFileUpload(results.data);
        },
      });
    } else {
      alert("Unsupported file format. Please upload a CSV file.");
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">Import Users (CSV):</label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="border border-gray-300 rounded-lg p-2 w-full"
      />
    </div>
  );
};

export default FileUpload;
