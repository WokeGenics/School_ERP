import React from "react";

const UserTable = ({ users, selectedUsers, onUserSelect, onSelectAll }) => {
  // Check if all users are selected
  const allSelected = users.length > 0 && users.every((user) => selectedUsers.includes(user._id));
  const partiallySelected = users.some((user) => selectedUsers.includes(user._id)) && !allSelected;

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectAll([]); 
  // Deselect all
    } else {
      onSelectAll(users.map((user) => user._id)); // Select all
    }
  };

  return (
    <div className="overflow-auto max-h-64 border border-gray-300 rounded-lg mb-6">
      <table className="table-auto w-full text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = partiallySelected; // Handle indeterminate state
                }}
                onChange={handleSelectAll}
              />
            </th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => onUserSelect(user._id)} // Handle individual selection
                />
              </td>
             
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.contact}</td>
              <td className="px-4 py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
