"use client";
import React, { useState } from "react";

export default function FeeForm({ selectedClass, onSave, onCancel }) {
  const [formData, setFormData] = useState(
    selectedClass || {
      class: "",
      coreAcademicFees: {
        tuitionFee: "",
        admissionFee: "",
        reAdmissionFee: "",
        annualFee: "",
        termFee: "",
      },
      examinationAndAcademicServices: {
        examinationFee: "",
        labFee: "",
        libraryFee: "",
        practicalFee: "",
      },
      coCurricularAndExtracurricularActivities: {
        activityFee: "",
        sportsFee: "",
        culturalEventFee: "",
      },
      facilityAndServices: {
        transportFee: "",
        hostelFee: "",
        mealFee: "",
        uniformFee: "",
        booksAndStationeryFee: "",
      },
      developmentAndMaintenance: {
        infrastructureFee: "",
        technologyFee: "",
      },
      specialServicesAndActivities: {
        fieldTripFee: "",
        workshopFee: "",
        extraClassesFee: "",
        alumniFee: "",
      },
      finesAndPenalties: {
        lateFee: "",
        libraryFine: "",
        disciplineFee: "",
      },
      miscellaneousFees: {
        examBoardRegistrationFee: "",
        graduationConvocationFee: "",
        medicalFee: "",
        securityDeposit: "",
      },
    }
  );

  const handleChange = (e, category, key) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = selectedClass ? "PUT" : "POST";
    const url = selectedClass
      ? `/api/admin/fees/${selectedClass.class}`
      : "/api/admin/fees";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      onSave();
    } catch (error) {
      console.error("Failed to save fee structure:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 space-x-6">
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">General Information</h2>
        <div>
          <label className="block text-sm font-medium">Class</label>
          <input
            type="text"
            name="class"
            value={formData.class}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, class: e.target.value }))
            }
            disabled={!!selectedClass}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>
      </div>

      {Object.entries(formData).map(([category, fields]) =>
        category === "class" ? null : (
          <div key={category} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">
              {category.replace(/([A-Z])/g, " $1")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(fields).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={value}
                    onChange={(e) => handleChange(e, category, key)}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        )
      )}

      <div className="mt-4 flex justify-end space-x-2">
        <button
          type="button"
          className="bg-gray-200 px-4 py-2 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}
