"use client";

import React, { useState } from "react";

export default function ReceiptForm({ onGenerateReceipt }) {
  const initialFormState = {
    studentName: "",
    class: "",
    feesPaid: {
      coreAcademicFees: {
        tuitionFee: 0,
        admissionFee: 0,
        reAdmissionFee: 0,
        annualFee: 0,
        termFee: 0,
      },
      examinationAndAcademicServices: {
        examinationFee: 0,
        labFee: 0,
        libraryFee: 0,
        practicalFee: 0,
      },
      coCurricularAndExtracurricularActivities: {
        activityFee: 0,
        sportsFee: 0,
        culturalEventFee: 0,
      },
      facilityAndServices: {
        transportFee: 0,
        hostelFee: 0,
        mealFee: 0,
        uniformFee: 0,
        booksAndStationeryFee: 0,
      },
      developmentAndMaintenance: {
        infrastructureFee: 0,
        technologyFee: 0,
      },
      specialServicesAndActivities: {
        fieldTripFee: 0,
        workshopFee: 0,
        extraClassesFee: 0,
        alumniFee: 0,
      },
      finesAndPenalties: {
        lateFee: 0,
        libraryFine: 0,
        disciplineFee: 0,
      },
      miscellaneousFees: {
        examBoardRegistrationFee: 0,
        graduationConvocationFee: 0,
        medicalFee: 0,
        securityDeposit: 0,
      },
    },
    total: 0,
    discount: 0,
    remarks: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [activeCategories, setActiveCategories] = useState({});

  const handleCategoryToggle = (category) => {
    setActiveCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleFieldToggle = (category, key) => {
    setActiveCategories((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category]?.[key],
      },
    }));
  };

  const handleChange = (e, category, key) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedFees = {
        ...prev.feesPaid[category],
        [key]: Number(value),
      };
      const total = Object.values(updatedFees).reduce((sum, val) => sum + val, 0);
      return {
        ...prev,
        feesPaid: {
          ...prev.feesPaid,
          [category]: updatedFees,
        },
        total,
      };
    });
  };

  const handleDiscountChange = (e) => {
    const discount = Number(e.target.value);
    setFormData((prev) => ({
      ...prev,
      discount,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateReceipt(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium">Student Name</label>
        <input
          type="text"
          value={formData.studentName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, studentName: e.target.value }))
          }
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Class</label>
        <input
          type="text"
          value={formData.class}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, class: e.target.value }))
          }
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </div>

      {/* Category Selection */}
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="text-lg font-semibold">Manage Fee Categories</h3>
        {Object.keys(formData.feesPaid).map((category) => (
          <div key={category} className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={!!activeCategories[category]}
              onChange={() => handleCategoryToggle(category)}
              className="mr-2"
            />
            <label className="capitalize">
              {category.replace(/([A-Z])/g, " $1")}
            </label>
          </div>
        ))}
      </div>

      {/* Fee Fields */}
      {Object.entries(formData.feesPaid).map(([category, fields]) =>
        activeCategories[category] ? (
          <div key={category} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {category.replace(/([A-Z])/g, " $1")}
            </h2>
            <div className="bg-gray-100 p-2 rounded">
              <h4 className="text-md font-medium mb-2">Select Fields</h4>
              {Object.keys(fields).map((key) => (
                <div key={key} className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    checked={!!activeCategories[category]?.[key]}
                    onChange={() => handleFieldToggle(category, key)}
                    className="mr-2"
                  />
                  <label className="capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {Object.entries(fields).map(
                ([key, value]) =>
                  activeCategories[category]?.[key] && (
                    <div key={key}>
                      <label className="block text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleChange(e, category, key)}
                        className="w-full mt-1 p-2 border rounded"
                      />
                    </div>
                  )
              )}
            </div>
          </div>
        ) : null
      )}

      {/* Discount Selection */}
      <div>
        <label className="block text-sm font-medium">Discount</label>
        <select
          value={formData.discount}
          onChange={handleDiscountChange}
          className="w-full mt-1 p-2 border rounded"
        >
          <option value={0}>0%</option>
          {Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map((percentage) => (
            <option key={percentage} value={percentage}>
              {percentage}%
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Remarks</label>
        <textarea
          value={formData.remarks}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, remarks: e.target.value }))
          }
          className="w-full mt-1 p-2 border rounded"
        ></textarea>
      </div>

      <div className="mt-4 flex justify-end">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Generate Receipt
        </button>
      </div>
    </form>
  );
}
