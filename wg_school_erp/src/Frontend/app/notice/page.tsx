"use client";
import React, { useState, useEffect } from "react";
import NoticeForm from "../components/notice/NoticeForm";
import NoticeList from "../components/notice/NoticeList";
import NoticeSearch from "../components/notice/NoticeSearch";

const NoticeBoardPage = () => {
  const [notices, setNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch notices from backend whenever the search query changes
    const fetchNotices = async () => {
      const response = await fetch(`http://localhost:5000/api/notices?searchQuery=${searchQuery}`);
      const data = await response.json();
      setNotices(data);
    };

    fetchNotices();
  }, [searchQuery]);

  const addNotice = async (newNotice) => {
    // Add notice to the backend
    const response = await fetch("http://localhost:5000/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNotice),
    });

    const addedNotice = await response.json();
    setNotices([addedNotice, ...notices]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-100 text-black">
      <NoticeForm onAddNotice={addNotice} />
      <div>
        <NoticeSearch onSearch={setSearchQuery} searchQuery={searchQuery} />
        <NoticeList notices={notices} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default NoticeBoardPage;
