"use client"
import { useState } from "react";
import UserForm from "../components/user/UserForm";
import UserList from "../components/user/UserList";

export default function Home() {
  const [users, setUsers] = useState([
    { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", phone: "1234567890" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", phone: "0987654321" },
    { id: 3, firstName: "Robert", lastName: "Brown", email: "robert.brown@example.com", phone: "1122334455" },
    { id: 4, firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", phone: "2233445566" },
    { id: 5, firstName: "Emma", lastName: "Davis", email: "emma.davis@example.com", phone: "6677889900" },
    { id: 6, firstName: "Michael", lastName: "Wilson", email: "michael.wilson@example.com", phone: "7788990011" },
    { id: 7, firstName: "Sarah", lastName: "Taylor", email: "sarah.taylor@example.com", phone: "5566778899" },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setUsers(users.map((user) => (user.id === formData.id ? { ...formData, id: user.id } : user)));
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
    }
    setFormData({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  const handleEdit = (id) => {
    const user = users.find((u) => u.id === id);
    setFormData(user);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleView = (id) => {
    const user = users.find((u) => u.id === id);
    alert(`Viewing user: ${user.firstName} ${user.lastName}\nEmail: ${user.email}\nPhone: ${user.phone}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-3xl font-bold text-center mb-6">User Management</h1>
      <UserForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
      <UserList
        users={users}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleView={handleView}
      />
      </div>
  );
}
