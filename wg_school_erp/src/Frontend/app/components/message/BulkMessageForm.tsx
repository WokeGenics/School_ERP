"use client";
import React, { useState } from "react";

const BulkMessageForm = ({ recipientsList, onBulkMessageSent }) => {
  const [bulkMessage, setBulkMessage] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bulkMessage.trim() && selectedRecipients.length > 0) {
      onBulkMessageSent({ bulkMessage, recipients: selectedRecipients });
      setBulkMessage("");
      setSelectedRecipients([]);
    } else {
      alert("Please enter a message and select recipients.");
    }
  };

  const handleRecipientChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedRecipients((prev) => [...prev, value]);
    } else {
      setSelectedRecipients((prev) => prev.filter((recipient) => recipient !== value));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Send Bulk Message</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          name="bulkMessage"
          placeholder="Type your message here..."
          value={bulkMessage}
          onChange={(e) => setBulkMessage(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          rows="6"
          required
        />
        <div>
          <h3 className="text-md font-semibold mb-2">Select Recipients:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {recipientsList.map((recipient) => (
              <label key={recipient.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={recipient.name}
                  checked={selectedRecipients.includes(recipient.name)}
                  onChange={handleRecipientChange}
                  className="form-checkbox h-4 w-4"
                />
                <span>{recipient.name}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Send Bulk Message
        </button>
      </form>
    </div>
  );
};

export default BulkMessageForm;
