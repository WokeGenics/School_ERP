"use client";
import React from "react";

const MessageForm = ({ message, onMessageChange, onSendMessage }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onMessageChange((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
          
      <input
        type="text"
        name="title"
        value={message.title}
        onChange={handleChange}
        placeholder="Message Title"
        className="w-full border border-gray-300 p-2 rounded"
        required
      />
      <textarea
        name="body"
        value={message.body}
        onChange={handleChange}
        placeholder="Message Body"
        className="w-full border border-gray-300 p-2 rounded"
        rows="4"
        required
      />

      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Send Message
      </button>
    </form>
  );
};

export default MessageForm;
