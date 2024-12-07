"use client";
import React, { useState, useEffect } from "react";
import FileUpload from "../components/message/FileUpload";
import FilterOptions from "../components/message/FilterOptions";
import MessageForm from "../components/message/MessageForm";
import MessageRecords from "../components/message/MessageRecords";
import UserTable from "../components/message/UserTable";
import AddContactForm from "../components/message/AddContactForm";

const MessagingPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]); // State for selected users
  const [filters, setFilters] = useState({ name: "", role: "", email: "", contact: "" });
  const [message, setMessage] = useState({ title: "", body: "" });
  const [messageRecords, setMessageRecords] = useState([]);
  

  // Fetch users on page load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  // Fetch message records on page load
  useEffect(() => {
    const fetchMessageRecords = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/messages");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setMessageRecords(data);
      } catch (error) {
        console.error("Error fetching message records:", error);
        alert("Failed to fetch message records.");
      }
    };

    fetchMessageRecords();
  }, []);

  const handleAddContact = async (newContact) => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        alert("Error adding contact: " + errorResponse.message);
        return;
      }

      const addedUser = await response.json();
      setUsers((prev) => [...prev, addedUser]);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.title || !message.body || selectedUsers.length === 0) {
      alert("Please fill all fields and select at least one user.");
      return;
    }

    const recipients = users.filter((user) => selectedUsers.includes(user._id));
    const newMessage = { title: message.title, body: message.body, recipients };

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });
      const addedMessage = await response.json();
      setMessageRecords((prev) => [...prev, addedMessage]);
      setMessage({ title: "", body: "" });
      setSelectedUsers([]);
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const errorResponse = await response.json();
        alert(`Failed to delete message: ${errorResponse.message}`);
        return;
      }

      setMessageRecords((prev) => prev.filter((record) => record._id !== id));
      alert("Message deleted successfully!");
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Error deleting message. Please try again later.");
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredUsers = users.filter(
    (user) =>
      (!filters.name || user.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.role || user.role.toLowerCase().includes(filters.role.toLowerCase())) &&
      (!filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.contact || user.contact.includes(filters.contact))
  );

  const handleUserSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };
  const handleSelectAll = (userIds) => {
    setSelectedUsers(userIds);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen text-black">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl font-semibold mb-4">Messaging System</h1>

        <AddContactForm onAddContact={handleAddContact} />
        <FileUpload />
        <FilterOptions filters={filters} onFilterChange={handleFilterChange} />
        <UserTable
          users={filteredUsers}
          selectedUsers={selectedUsers}
          onUserSelect={handleUserSelect}
          onSelectAll={handleSelectAll}
        />
        <MessageForm message={message} onMessageChange={setMessage} onSendMessage={handleSendMessage} />
        <MessageRecords records={messageRecords} onDeleteRecord={handleDeleteRecord} />
      </div>
    </div>
  );
};

export default MessagingPage;
