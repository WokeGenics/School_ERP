"use client";
import React, { useState } from "react";
import NoticeForm from "../components/notice/NoticeForm";
import NoticeList from "../components/notice/NoticeList";
import NoticeSearch from "../components/notice/NoticeSearch";

const NoticeBoardPage = () => {
  const [notices, setNotices] = useState([
    {
      title: "Great School Event",
      details: "Great School manages many great events...",
      postedBy: "Jennyfar Lopez",
      date: "16 June, 2019",
    },
    {
      title: "Exam Schedule Released",
      details: "Exam schedules for Class 10 are now available.",
      postedBy: "Admin",
      date: "15 June, 2019",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const addNotice = (newNotice) => {
    setNotices([newNotice, ...notices]);
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
