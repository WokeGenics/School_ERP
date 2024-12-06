"use client";
import React from "react";

const MessageRecords = ({ records, onDeleteRecord }) => {
  console.log(records);
  return (
    <div className="mt-6 overflow-y-scroll">
      <h2 className="text-lg font-semibold mb-4">Message Records</h2>
      <table className="table-auto w-full border border-gray-300 text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Body</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Contact</th>
            <th className="px-4 py-2 border">Recipients</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td className="px-4 py-2 border">{record.title}</td>
              <td className="px-4 py-2 border">{record.body}</td>
              <td className="px-4 py-2 border">
                {record.recipients.map((recipient) => recipient.email).join(",")}
              </td>
              <td className="px-4 py-2 border">
                {record.recipients.map((recipient) => recipient.contact).join(",")}
              </td>
              <td className="px-4 py-2 border">
                {record.recipients.map((recipient) => recipient.name).join(", ")}
              </td>
           
         
              <td className="px-4 py-2 border">
                <button
                  onClick={() => onDeleteRecord(record._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessageRecords;
