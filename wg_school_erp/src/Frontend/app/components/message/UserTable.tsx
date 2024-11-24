import React from "react";

const UserTable = ({ users, selectedUsers, onUserSelect, onSelectAll }) => {
  const allSelected = users.length > 0 && users.every((user) => selectedUsers.includes(user.id));

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectAll([]); // Deselect all
    } else {
      onSelectAll(users.map((user) => user.id)); // Select all
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
                onChange={handleSelectAll}
              />
            </th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => onUserSelect(user.id)}
                />
              </td>
              <td className="px-4 py-2">{user.id}</td>
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
