import React from "react";

const Notification = ({ type, message }) => {
  const getStyle = () => {
    if (type === "success") {
      return "bg-green-100 text-green-700 border-green-300";
    }
    if (type === "error") {
      return "bg-red-100 text-red-700 border-red-300";
    }
    return "";
  };

  return (
    <div
      className={`border rounded p-4 flex items-center space-x-4 ${getStyle()}`}
    >
      {type === "success" ? (
        <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
          ✓
        </span>
      ) : (
        <span className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
          ✖
        </span>
      )}
      <span>{message}</span>
    </div>
  );
};

export default Notification;
