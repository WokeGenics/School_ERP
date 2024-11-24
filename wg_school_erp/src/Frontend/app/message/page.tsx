"use client";
import React, { useState } from "react";
import FileUpload from "../components/message/FileUpload";
import FilterOptions from "../components/message/FilterOptions";
import MessageForm from "../components/message/MessageForm";
import MessageRecords from "../components/message/MessageRecords";
import UserTable from "../components/message/UserTable";
import AddContactForm from "../components/message/AddContactForm";
const MessagingPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [filters, setFilters] = useState({ name: "", role: "", email: "", contact: "" });
    const [message, setMessage] = useState({ title: "", body: "" });
    const [messageRecords, setMessageRecords] = useState([]);
  
    const handleFileUpload = (data) => {
      const newUsers = data.map((row, index) => ({
        id: users.length + index + 1,
        name: row.name || "Unnamed",
        email: row.email || "No email",
        contact: row.contact || "No contact",
        role: row.role || "User",
      }));
      setUsers((prev) => [...prev, ...newUsers]);
    };
  
    const handleAddContact = (newContact) => {
      const newUser = {
        id: users.length + 1,
        ...newContact,
      };
      setUsers((prev) => [...prev, newUser]);
    };
  
    const handleFilterChange = (e) => {
      setFilters({ ...filters, [e.target.name]: e.target.value });
    };
  
    const filteredUsers = users.filter(
      (user) =>
        (filters.name === "" || user.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.role === "" || user.role.toLowerCase().includes(filters.role.toLowerCase())) &&
        (filters.email === "" || user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
        (filters.contact === "" || user.contact.includes(filters.contact))
    );
  
    const handleUserSelect = (id) => {
      setSelectedUsers((prev) =>
        prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
      );
    };
  
    const handleSelectAll = (selectedIds) => {
      setSelectedUsers(selectedIds);
    };
  
    const handleSendMessage = () => {
      if (!message.title || !message.body || selectedUsers.length === 0) {
        alert("Please fill all fields and select at least one user.");
        return;
      }
  
      const recipients = users.filter((user) => selectedUsers.includes(user.id));
      const newRecord = {
        title: message.title,
        body: message.body,
        recipients,
        date: new Date().toLocaleString(),
      };
  
      setMessageRecords((prev) => [...prev, newRecord]);
      setMessage({ title: "", body: "" });
      setSelectedUsers([]);
      alert("Message sent successfully!");
    };
  
    const handleDeleteRecord = (index) => {
      setMessageRecords((prev) => prev.filter((_, i) => i !== index));
    };
  
    return (
      <div className="p-4 bg-gray-100 min-h-screen text-black">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-xl font-semibold mb-4">Messaging System</h1>
  
          {/* Add Contact Form */}
          <AddContactForm onAddContact={handleAddContact} />
  
          {/* File Upload */}
          <FileUpload onFileUpload={handleFileUpload} />
  
          {/* Filter Options */}
          <FilterOptions filters={filters} onFilterChange={handleFilterChange} />
  
          {/* User Table */}
          <UserTable
            users={filteredUsers}
            selectedUsers={selectedUsers}
            onUserSelect={handleUserSelect}
            onSelectAll={handleSelectAll}
          />
  
          {/* Message Form */}
          <MessageForm
            message={message}
            onMessageChange={setMessage}
            onSendMessage={handleSendMessage}
          />
  
          {/* Message Records */}
          <MessageRecords records={messageRecords} onDeleteRecord={handleDeleteRecord} />
        </div>
      </div>
    );
  };
  
  export default MessagingPage;