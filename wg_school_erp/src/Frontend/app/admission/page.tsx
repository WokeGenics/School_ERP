// pages/admission/index.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Admission Interface
interface Admission {
  _id: string;
  admissionNumber: string;
  admissionDate: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  admissionClass: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  countryCode: string;
  mobileNumber: string;
  alternateMobileNumber?: string;
  email: string;
  previousSchool?: string;
  siblings: boolean;
  fatherName: string;
  fatherDOB: string;
  fatherOccupation?: string;
  motherName: string;
  motherDOB: string;
  motherOccupation?: string;
  createdAt: string;
  updatedAt: string;
}

// Modal Component
const Modal: React.FC<{
  onClose: () => void;
  admission: Admission;
  mode: "view" | "edit";
  onUpdate: (updatedAdmission: Admission) => void;
}> = ({ onClose, admission, mode, onUpdate }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(mode === "edit");
  const [formData, setFormData] = useState<Partial<Admission>>({
    firstName: admission.firstName,
    middleName: admission.middleName,
    lastName: admission.lastName,
    gender: admission.gender,
    admissionClass: admission.admissionClass,
    admissionDate: admission.admissionDate,
    dateOfBirth: admission.dateOfBirth,
    address: admission.address,
    city: admission.city,
    state: admission.state,
    zipCode: admission.zipCode,
    countryCode: admission.countryCode,
    mobileNumber: admission.mobileNumber,
    alternateMobileNumber: admission.alternateMobileNumber,
    email: admission.email,
    previousSchool: admission.previousSchool,
    siblings: admission.siblings,
    fatherName: admission.fatherName,
    fatherDOB: admission.fatherDOB,
    fatherOccupation: admission.fatherOccupation,
    motherName: admission.motherName,
    motherDOB: admission.motherDOB,
    motherOccupation: admission.motherOccupation,
  });
  const [saving, setSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/admissions/${admission._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update admission");
      }

      const updatedAdmission = await response.json();
      onUpdate(updatedAdmission.data); // Update parent state
      setIsEditMode(false);
    } catch (err: any) {
      console.error("Error updating admission:", err);
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-4xl relative overflow-y-auto max-h-screen shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close Modal"
        >
          &times;
        </button>

        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {isEditMode ? "Edit Admission Details" : "Admission Details"}
          </h2>
          <button
            onClick={() => setIsEditMode((prev) => !prev)}
            className="text-blue-500 hover:underline"
          >
            {isEditMode ? "View Mode" : "Edit Mode"}
          </button>
        </div>

        {/* Modal Content */}
        {isEditMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student Name */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Gender and Admission Class */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Admission Class</label>
                <input
                  type="text"
                  name="admissionClass"
                  value={formData.admissionClass || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Admission Date and Date of Birth */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700">Admission Date</label>
                <input
                  type="date"
                  name="admissionDate"
                  value={formData.admissionDate?.split("T")[0] || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth?.split("T")[0] || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <label className="block text-gray-700">Address</label>
              <textarea
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              ></textarea>
            </div>

            {/* City, State, Zip Code */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Country Code and Mobile Numbers */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700">Country Code</label>
                <input
                  type="text"
                  name="countryCode"
                  value={formData.countryCode || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Alternate Mobile Number</label>
                <input
                  type="tel"
                  name="alternateMobileNumber"
                  value={formData.alternateMobileNumber || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Email and Previous School */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Previous School</label>
                <input
                  type="text"
                  name="previousSchool"
                  value={formData.previousSchool || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Siblings Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="siblings"
                checked={formData.siblings || false}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-gray-700">Has Siblings</label>
            </div>

            {/* Father's Details */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Father's Details</h3>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700">Father's Name</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName || ""}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700">Father's DOB</label>
                  <input
                    type="date"
                    name="fatherDOB"
                    value={formData.fatherDOB?.split("T")[0] || ""}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700">Father's Occupation</label>
                  <input
                    type="text"
                    name="fatherOccupation"
                    value={formData.fatherOccupation || ""}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Mother's Details */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Mother's Details</h3>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700">Mother's Name</label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName || ""}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700">Mother's DOB</label>
                  <input
                    type="date"
                    name="motherDOB"
                    value={formData.motherDOB?.split("T")[0] || ""}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700">Mother's Occupation</label>
                  <input
                    type="text"
                    name="motherOccupation"
                    value={formData.motherOccupation || ""}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Save Error */}
            {saveError && <p className="text-red-500 text-sm">{saveError}</p>}

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 ${
                  saving ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {/* Admission Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>ID Number:</strong> {admission.admissionNumber}
                </p>
                <p>
                  <strong>Name:</strong> {`${admission.firstName} ${
                    admission.middleName || ""
                  } ${admission.lastName}`}
                </p>
                <p>
                  <strong>Gender:</strong> {admission.gender}
                </p>
                <p>
                  <strong>Class:</strong> {admission.admissionClass}
                </p>
                <p>
                  <strong>Admission Date:</strong>{" "}
                  {new Date(admission.admissionDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(admission.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p>
                  <strong>Address:</strong>{" "}
                  {`${admission.address}, ${admission.city}, ${admission.state}, ${admission.zipCode}, ${admission.countryCode}`}
                </p>
                <p>
                  <strong>Phone:</strong> {admission.mobileNumber}
                </p>
                {admission.alternateMobileNumber && (
                  <p>
                    <strong>Alternate Phone:</strong>{" "}
                    {admission.alternateMobileNumber}
                  </p>
                )}
                <p>
                  <strong>Email:</strong> {admission.email}
                </p>
                {admission.previousSchool && (
                  <p>
                    <strong>Previous School:</strong> {admission.previousSchool}
                  </p>
                )}
                <p>
                  <strong>Siblings:</strong>{" "}
                  {admission.siblings ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Father's Name:</strong> {admission.fatherName}
                </p>
                <p>
                  <strong>Father's DOB:</strong>{" "}
                  {new Date(admission.fatherDOB).toLocaleDateString()}
                </p>
                {admission.fatherOccupation && (
                  <p>
                    <strong>Father's Occupation:</strong>{" "}
                    {admission.fatherOccupation}
                  </p>
                )}
              </div>
              <div>
                <p>
                  <strong>Mother's Name:</strong> {admission.motherName}
                </p>
                <p>
                  <strong>Mother's DOB:</strong>{" "}
                  {new Date(admission.motherDOB).toLocaleDateString()}
                </p>
                {admission.motherOccupation && (
                  <p>
                    <strong>Mother's Occupation:</strong>{" "}
                    {admission.motherOccupation}
                  </p>
                )}
              </div>
              <div>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(admission.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{" "}
                  {new Date(admission.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer (Only in View Mode) */}
        {!isEditMode && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsEditMode(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
            >
              Edit Admission
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function AdmissionManagementPage() {
  const router = useRouter();
  const BaseUrl = "http://localhost:5000"; // Update if different

  // State Management
  const [admissionsData, setAdmissionsData] = useState<Admission[]>([]);
  const [filteredAdmissions, setFilteredAdmissions] = useState<Admission[]>([]);
  const [searchClass, setSearchClass] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [searchAdmissionNumber, setSearchAdmissionNumber] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [modalAdmission, setModalAdmission] = useState<Admission | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch Admissions on Component Mount
  useEffect(() => {
    fetchAdmissions();
  }, []);

  // Fetch Admissions Function
  const fetchAdmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BaseUrl}/api/admissions`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch admissions");
      }
      const data = await response.json();
      const admissionsArray: Admission[] = Array.isArray(data.data) ? data.data : [];
      setAdmissionsData(admissionsArray);
      setFilteredAdmissions(admissionsArray);
    } catch (err: any) {
      console.error("Error fetching admissions:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter Admissions
  useEffect(() => {
    let filtered = admissionsData;

    if (searchClass.trim() !== "") {
      filtered = filtered.filter((admission) =>
        admission.admissionClass.toLowerCase().includes(searchClass.toLowerCase())
      );
    }

    if (searchName.trim() !== "") {
      filtered = filtered.filter((admission) =>
        `${admission.firstName} ${admission.middleName || ""} ${admission.lastName}`
          .toLowerCase()
          .includes(searchName.toLowerCase())
      );
    }

    if (searchAdmissionNumber.trim() !== "") {
      filtered = filtered.filter((admission) =>
        admission.admissionNumber
          .toLowerCase()
          .includes(searchAdmissionNumber.toLowerCase())
      );
    }

    setFilteredAdmissions(filtered);
    setCurrentPage(1); // Reset to first page on filter
  }, [searchClass, searchName, searchAdmissionNumber, admissionsData]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredAdmissions.length / itemsPerPage);
  const paginatedAdmissions = filteredAdmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Toggle Action Menu
  const toggleMenu = (admissionNumber: string) => {
    setMenuOpen((prev) => (prev === admissionNumber ? null : admissionNumber));
  };

  // Handle View Admission
  const handleView = (admission: Admission) => {
    setModalAdmission(admission);
    setModalMode("view");
    setIsModalOpen(true);
    setMenuOpen(null);
  };

  // Handle Edit Admission
  const handleEdit = (admission: Admission) => {
    setModalAdmission(admission);
    setModalMode("edit");
    setIsModalOpen(true);
    setMenuOpen(null);
  };

  // Handle Update Admission (from Modal)
  const handleUpdateAdmission = (updatedAdmission: Admission) => {
    setAdmissionsData((prev) =>
      prev.map((admission) =>
        admission._id === updatedAdmission._id
          ? updatedAdmission
          : admission
      )
    );
    setFilteredAdmissions((prev) =>
      prev.map((admission) =>
        admission.admissionNumber === updatedAdmission.admissionNumber
          ? updatedAdmission
          : admission
      )
    );
    setModalAdmission(updatedAdmission);
  };

  return (
    <div className="h-auto bg-gray-100 p-4 sm:p-8">
      <div className="bg-white shadow-md p-6 rounded-lg overflow-x-auto">
        {/* Add New Admission Button */}
        <div className="flex justify-end mb-6">
          <Link
            href="/admission/add-new-admission"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
          >
            Add New Admission
          </Link>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
          {/* Search by Class */}
          <input
            type="text"
            placeholder="Search by Class..."
            value={searchClass}
            onChange={(e) => setSearchClass(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Search by Name */}
          <input
            type="text"
            placeholder="Search by Student Name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Search by Admission Number */}
          <input
            type="text"
            placeholder="Search by Admission Number..."
            value={searchAdmissionNumber}
            onChange={(e) => setSearchAdmissionNumber(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Loading Indicator */}
        {loading && <p className="text-center text-gray-500">Loading admissions...</p>}

        {/* Error Message */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Admissions Table */}
        {!loading && !error && (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border text-left">Admission Number</th>
                <th className="px-4 py-2 border text-left">Student Name</th>
                <th className="px-4 py-2 border text-left">Gender</th>
                <th className="px-4 py-2 border text-left">Class</th>
                <th className="px-4 py-2 border text-left">Admission Date</th>
                <th className="px-4 py-2 border text-left">Phone</th>
                <th className="px-4 py-2 border text-left">Email</th>
                <th className="px-4 py-2 border text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAdmissions.length > 0 ? (
                paginatedAdmissions.map((admission) => (
                  <tr key={admission.admissionNumber} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border">{admission.admissionNumber}</td>
                    <td className="px-4 py-2 border">
                      {`${admission.firstName} ${admission.middleName || ""} ${admission.lastName}`}
                    </td>
                    <td className="px-4 py-2 border">{admission.gender}</td>
                    <td className="px-4 py-2 border">{admission.admissionClass}</td>
                    <td className="px-4 py-2 border">
                      {new Date(admission.admissionDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border">{admission.mobileNumber}</td>
                    <td className="px-4 py-2 border">{admission.email}</td>
                    <td className="px-4 py-2 border relative">
                      <button
                        onClick={() => toggleMenu(admission.admissionNumber)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-2 rounded inline-flex items-center transition-colors duration-200"
                      >
                        Actions
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Action Menu */}
                      {menuOpen === admission.admissionNumber && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-20">
                          <button
                            onClick={() => handleView(admission)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center transition-colors duration-200"
                          >
                            {/* View Icon */}
                            <svg
                              className="w-5 h-5 mr-2 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(admission)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center transition-colors duration-200"
                          >
                            {/* Edit Icon */}
                            <svg
                              className="w-5 h-5 mr-2 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-9-9l9 9m0 0l-9 9m9-9H13"
                              />
                            </svg>
                            Edit
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center p-4">
                    No admissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Pagination Controls */}
        {!loading && !error && filteredAdmissions.length > itemsPerPage && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l transition-colors duration-200 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r transition-colors duration-200 ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal for Viewing and Editing Admission Details */}
      {isModalOpen && modalAdmission && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          admission={modalAdmission}
          mode={modalMode}
          onUpdate={handleUpdateAdmission}
        />
      )}
    </div>
  );
}
