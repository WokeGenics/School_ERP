"use client";
import React, { useState } from "react";

const MessageForm = ({ onMessageSent }) => {
  const [formData, setFormData] = useState({
    title: "",
    recipient: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.recipient && formData.message) {
      onMessageSent(formData);
      setFormStatus("success");
      setFormData({ title: "", recipient: "", message: "" });
    } else {
      setFormStatus("error");
    }
  };

  const handleReset = () => {
    setFormData({ title: "", recipient: "", message: "" });
    setFormStatus(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Write New Message</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          name="recipient"
          placeholder="Recipient"
          value={formData.recipient}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          rows="6"
          required
        />
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Reset
          </button>
        </div>
      </form>
      {formStatus === "success" && (
        <p className="text-green-500 mt-4">Successfully Message Sent</p>
      )}
      {formStatus === "error" && (
        <p className="text-red-500 mt-4">Some Fields Are Required</p>
      )}
    </div>
  );
};

export default MessageForm;