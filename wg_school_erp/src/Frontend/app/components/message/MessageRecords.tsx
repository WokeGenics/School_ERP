import React from "react";

const MessageRecords = ({ records, onDeleteRecord }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Message Records</h2>
      <div className="overflow-auto max-h-64 border border-gray-300 rounded-lg">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Body</th>
              <th className="px-4 py-2">Recipients</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2">{record.title}</td>
                <td className="px-4 py-2">{record.body}</td>
                <td className="px-4 py-2">
                  {record.recipients.map((r) => r.name).join(", ")}
                </td>
                <td className="px-4 py-2">{record.date}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    onClick={() => onDeleteRecord(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessageRecords;
