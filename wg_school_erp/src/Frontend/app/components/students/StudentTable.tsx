// pages/student/index.tsx (example)
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  gender: string;
  dob?: string;         
  roll?: string;
  bloodGroup?: string;
  religion?: string;
  email?: string;
  studentClass?: string;
  section?: string;
  admissionId?: string;
  phone?: string;
  bio?: string;
  photo?: string;       
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

/** Modal Props */
interface ModalProps {
  onClose: () => void;
  student: Student;
  mode: "view" | "edit";
  onUpdate: (updatedStudent: Student) => void;
}

/** Modal Component */
const Modal: React.FC<ModalProps> = ({ onClose, student, mode, onUpdate }) => {
  const [isEditMode, setIsEditMode] = useState(mode === "edit");

  // We'll store the editable fields in state
  const [formData, setFormData] = useState<Partial<Student>>({
    first_name: student.first_name,
    last_name: student.last_name,
    gender: student.gender,
    dob: student.dob,
    roll: student.roll,
    bloodGroup: student.bloodGroup,
    religion: student.religion,
    email: student.email,
    studentClass: student.studentClass,
    section: student.section,
    admissionId: student.admissionId,
    phone: student.phone,
    bio: student.bio,
  });

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit changes (PUT)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    try {
      // Replace with your actual backend route
      const response = await fetch(`http://localhost:5000/api/students/${student._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update student");
      }

      const updatedStudent = await response.json();
      // If your backend returns { data: ... }, use updatedStudent.data
      onUpdate(updatedStudent.data || updatedStudent);
      setIsEditMode(false);
    } catch (err: any) {
      console.error("Error updating student:", err);
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

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {isEditMode ? "Edit Student" : "Student Details"}
          </h2>
          <button
            onClick={() => setIsEditMode((prev) => !prev)}
            className="text-blue-500 hover:underline"
          >
            {isEditMode ? "View Mode" : "Edit Mode"}
          </button>
        </div>

        {/* Edit Mode */}
        {isEditMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700">First Name *</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>

            {/* Gender & DOB */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">DOB *</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob ? formData.dob.split("T")[0] : ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>

            {/* Roll & Blood Group */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700">Roll</label>
                <input
                  type="text"
                  name="roll"
                  value={formData.roll || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Blood Group *</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            {/* Religion & Email */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700">Religion *</label>
                <select
                  name="religion"
                  value={formData.religion || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Select Religion</option>
                  <option value="Islam">Islam</option>
                  <option value="Hinduism">Hinduism</option>
                  <option value="Christianity">Christianity</option>
                  <option value="Buddhism">Buddhism</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            {/* Class & Section */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700">Class *</label>
                <input
                  type="text"
                  name="studentClass"
                  value={formData.studentClass || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Section *</label>
                <input
                  type="text"
                  name="section"
                  value={formData.section || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>

            {/* Admission ID & Phone */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700">Admission ID</label>
                <input
                  type="text"
                  name="admissionId"
                  value={formData.admissionId || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            {/* Short BIO */}
            <div className="flex flex-col">
              <label className="block text-gray-700">Short BIO</label>
              <textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
                rows={3}
              />
            </div>

            {saveError && <p className="text-red-500 text-sm">{saveError}</p>}

            <div className="flex justify-end space-x-4 mt-4">
              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                  saving ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                }`}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          // VIEW MODE
          <div className="space-y-4">
            <p>
              <strong>First Name:</strong> {student.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> {student.last_name}
            </p>
            <p>
              <strong>Gender:</strong> {student.gender}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {student.dob ? new Date(student.dob).toLocaleDateString() : ""}
            </p>
            <p>
              <strong>Roll:</strong> {student.roll}
            </p>
            <p>
              <strong>Blood Group:</strong> {student.bloodGroup}
            </p>
            <p>
              <strong>Religion:</strong> {student.religion}
            </p>
            <p>
              <strong>E-mail:</strong> {student.email}
            </p>
            <p>
              <strong>Class:</strong> {student.studentClass}
            </p>
            <p>
              <strong>Section:</strong> {student.section}
            </p>
            <p>
              <strong>Admission ID:</strong> {student.admissionId}
            </p>
            <p>
              <strong>Phone:</strong> {student.phone}
            </p>
            <p>
              <strong>Short BIO:</strong> {student.bio}
            </p>
            {student.photo && (
              <p>
                <strong>Photo:</strong>
                <br />
                <img
                  src={student.photo}
                  alt="Student Photo"
                  className="w-24 h-24 object-cover mt-2"
                />
              </p>
            )}
            {student.createdAt && (
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(student.createdAt).toLocaleString()}
              </p>
            )}
            {student.updatedAt && (
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(student.updatedAt).toLocaleString()}
              </p>
            )}
          </div>
        )}

        {/* View Mode -> Edit Button */}
        {!isEditMode && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsEditMode(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Edit Student
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function StudentManagementPage() {
  const router = useRouter();
  const BASE_URL = "http://localhost:5000";
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchClass, setSearchClass] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchRoll, setSearchRoll] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [modalStudent, setModalStudent] = useState<Student | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/students`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch students");
      }
      const data = await response.json();

      // If your backend returns { data: [...] } or { students: [...] }, adapt here
      const studentsArray = data.students || [];
      setStudents(studentsArray);
      setFilteredStudents(studentsArray);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtering
  useEffect(() => {
    let filtered = students;

    if (searchClass.trim()) {
      filtered = filtered.filter((st) =>
        (st.studentClass || "").toLowerCase().includes(searchClass.toLowerCase())
      );
    }

    if (searchName.trim()) {
      filtered = filtered.filter((st) => {
        const fullName = `${st.first_name} ${st.last_name}`.toLowerCase();
        return fullName.includes(searchName.toLowerCase());
      });
    }

    if (searchRoll.trim()) {
      filtered = filtered.filter((st) =>
        (st.roll || "").toLowerCase().includes(searchRoll.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
    setCurrentPage(1);
  }, [searchClass, searchName, searchRoll, students]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Toggle the actions menu using the student's unique _id
  const toggleMenu = (id: string) => {
    setMenuOpen((prev) => (prev === id ? null : id));
  };

  const handleView = (student: Student) => {
    setModalStudent(student);
    setModalMode("view");
    setIsModalOpen(true);
    setMenuOpen(null);
  };

  const handleEdit = (student: Student) => {
    setModalStudent(student);
    setModalMode("edit");
    setIsModalOpen(true);
    setMenuOpen(null);
  };

  // Called after the modal saves changes
  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents((prev) =>
      prev.map((s) => (s._id === updatedStudent._id ? updatedStudent : s))
    );
    setFilteredStudents((prev) =>
      prev.map((s) => (s._id === updatedStudent._id ? updatedStudent : s))
    );
    setModalStudent(updatedStudent);
  };

  return (
    <div className="h-auto bg-gray-100 p-4 sm:p-8">
      <div className="bg-white shadow-md p-6 rounded-lg overflow-x-auto">
        {/* Add New Student */}
        <div className="flex justify-end mb-6">
          <Link
            href="/students/add-new-student"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Add New Student
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
          <input
            type="text"
            placeholder="Search by Class..."
            value={searchClass}
            onChange={(e) => setSearchClass(e.target.value)}
            className="border p-2 rounded-md w-full sm:w-1/3"
          />
          <input
            type="text"
            placeholder="Search by Student Name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border p-2 rounded-md w-full sm:w-1/3"
          />
          <input
            type="text"
            placeholder="Search by Roll..."
            value={searchRoll}
            onChange={(e) => setSearchRoll(e.target.value)}
            className="border p-2 rounded-md w-full sm:w-1/3"
          />
        </div>

        {loading && <p className="text-center text-gray-500">Loading students...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border text-left">First Name</th>
                <th className="px-4 py-2 border text-left">Last Name</th>
                <th className="px-4 py-2 border text-left">Gender</th>
                <th className="px-4 py-2 border text-left">DOB</th>
                <th className="px-4 py-2 border text-left">Roll</th>
                <th className="px-4 py-2 border text-left">Blood Group</th>
                <th className="px-4 py-2 border text-left">Religion</th>
                <th className="px-4 py-2 border text-left">Email</th>
                <th className="px-4 py-2 border text-left">Class</th>
                <th className="px-4 py-2 border text-left">Section</th>
                <th className="px-4 py-2 border text-left">Admission ID</th>
                <th className="px-4 py-2 border text-left">Phone</th>
                <th className="px-4 py-2 border text-left">Short BIO</th>
                <th className="px-4 py-2 border text-left">Photo</th>
                <th className="px-4 py-2 border text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border">{student.first_name}</td>
                    <td className="px-4 py-2 border">{student.last_name}</td>
                    <td className="px-4 py-2 border">{student.gender}</td>
                    <td className="px-4 py-2 border">
                      {student.dob ? new Date(student.dob).toLocaleDateString() : ""}
                    </td>
                    <td className="px-4 py-2 border">{student.roll}</td>
                    <td className="px-4 py-2 border">{student.bloodGroup}</td>
                    <td className="px-4 py-2 border">{student.religion}</td>
                    <td className="px-4 py-2 border">{student.email}</td>
                    <td className="px-4 py-2 border">{student.studentClass}</td>
                    <td className="px-4 py-2 border">{student.section}</td>
                    <td className="px-4 py-2 border">{student.admissionId}</td>
                    <td className="px-4 py-2 border">{student.phone}</td>
                    <td className="px-4 py-2 border">{student.bio}</td>
                    <td className="px-4 py-2 border">
                      {student.photo ? (
                        <img
                          src={student.photo}
                          alt="Student Photo"
                          className="w-12 h-12 object-cover"
                        />
                      ) : (
                        "No Photo"
                      )}
                    </td>
                    <td className="px-4 py-2 border relative">
                      {/* Use _id for toggling the dropdown */}
                      <button
                        onClick={() => toggleMenu(student._id)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-2 rounded inline-flex items-center"
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

                      {menuOpen === student._id && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-20">
                          <button
                            onClick={() => {
                              handleView(student);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                              handleEdit(student);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={15} className="text-center p-4">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {!loading && !error && filteredStudents.length > itemsPerPage && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l ${
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
              className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && modalStudent && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          student={modalStudent}
          mode={modalMode}
          onUpdate={handleUpdateStudent}
        />
      )}
    </div>
  );
}
