import React from "react";

export default function UserDetailsModal({ user, isOpen, onClose }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          User Details: {user.firstName} {user.lastName}
        </h2>

        {/* Personal Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">Personal Information</h3>
          <p>
            <strong>Full Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Date of Birth:</strong> {user.dateOfBirth || "N/A"}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender || "N/A"}
          </p>
          <p>
            <strong>Religion:</strong> {user.religion || "N/A"}
          </p>
        </div>

        {/* Contact Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">Contact Information</h3>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Address:</strong> {user.address || "N/A"}
          </p>
        </div>

        {/* Family Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">Family Information</h3>
          <p>
            <strong>Father's Name:</strong> {user.fathersName || "N/A"}
          </p>
          <p>
            <strong>Mother's Name:</strong> {user.mothersName || "N/A"}
          </p>
        </div>

        {/* Professional Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">Professional Information</h3>
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          <p>
            <strong>Joining Date:</strong> {user.joiningDate || "N/A"}
          </p>
          <p>
            <strong>Section:</strong> {user.section || "N/A"}
          </p>
          <p>
            <strong>Class:</strong> {user.class || "N/A"}
          </p>
          <p>
            <strong>Subject:</strong> {user.subject || "N/A"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
