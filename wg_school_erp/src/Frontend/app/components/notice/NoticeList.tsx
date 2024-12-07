import React from "react";

const NoticeList = ({ notices, searchQuery }) => {
  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchQuery) ||
      notice.details.toLowerCase().includes(searchQuery) ||
      notice.date.includes(searchQuery)
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4 h-96 overflow-y-auto">
        {filteredNotices.map((notice, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded hover:bg-gray-100"
          >
            <div className="flex justify-between">
              <span className="text-sm font-semibold text-blue-600">
                {notice.date}
              </span>
              <span className="text-sm text-gray-500">By: {notice.postedBy}</span>
            </div>
            <h3 className="text-lg font-bold mt-2">{notice.title}</h3>
            <p className="text-gray-600">{notice.details}</p>
          </div>
        ))}
        {filteredNotices.length === 0 && (
          <p className="text-center text-gray-500">No notices found.</p>
        )}
      </div>
    </div>
  );
};

export default NoticeList;
