"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HomeIcon,
  UserGroupIcon,
  BookOpenIcon,
  DocumentTextIcon,
  CogIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CurrencyRupeeIcon,
  ClipboardCheckIcon,
  CalendarIcon,
  BellIcon,
  ChatIcon,
  AcademicCapIcon,
  TruckIcon,
  OfficeBuildingIcon,
  ClipboardListIcon,
  AdjustmentsIcon,
  MenuIcon,
} from "@heroicons/react/outline";
const menuItems = [
  {
    label: "Dashboard",
    icon: <HomeIcon className="h-5 w-5" />,
    key: "dashboard",
    subItems: [
      { label: "Admin", href: "/dashboard" },
      { label: "Students", href: "/students-dashboard" },
      { label: "Teachers", href: "/teachers-dashboard" },
    ],
  },
  {
    label: "Student",
    icon: <AcademicCapIcon className="h-5 w-5" />,
    key: "students",
    subItems: [
      { label: "Add Students", href: "/students/add-student" },
      { label: "View Students", href: "/students/all-students" },
      { label: "Student Details", href: "/students/student-detail" },
      { label: "Students Promotion", href: "/students/promotion" },
    ],
  },
  {
    label: "Teachers",
    icon: <UserGroupIcon className="h-5 w-5" />,
    key: "teachers",
    subItems: [
      { label: "All Teachers", href: "/teachers/all-teachers" },
      { label: "Add Teachers", href: "/teachers/add-teacher" },
      { label: "Teachers Details", href: "/teachers/about-teacher" },
      { label: "Payments", href: "/teachers/teachers-payment" },
    ],
  },
  {
    label: "Library",
    icon: <BookOpenIcon className="h-5 w-5" />,
    key: "library",
    subItems: [
      { label: "Add Books", href: "/library/add-book" },
      { label: "All Books", href: "/library/all-books" },
    ],
  },
  {
    label: "Accounts",
    icon: <CurrencyRupeeIcon className="h-5 w-5" />,
    key: "accounts",
    subItems: [
      { label: "Add Fees", href: "/accounts/add-fee" },
      { label: "Add Expenses", href: "/accounts/add-expense" },
      { label: "All Fee Collection", href: "/accounts/all-fee-details" },
      { label: "Expenses", href: "/accounts/expenses" },
    ],
  },
  {
    label: "Class",
    icon: <ClipboardCheckIcon className="h-5 w-5" />,
    key: "class",
    subItems: [
      { label: "Add Class", href: "/class/add-new-class" },
      { label: "All Class", href: "/class/all-class" },
    ],
  },
  { label: "Class Routine", icon: <CalendarIcon className="h-5 w-5" />, href: "/class-routine" },
  { label: "Attendance", icon: <ClipboardListIcon className="h-5 w-5" />, href: "/attendance" },
  {
    label: "Exam",
    icon: <DocumentTextIcon className="h-5 w-5" />,
    key: "exam",
    subItems: [
      { label: "Exam Schedule", href: "/exam/exam-schedule" },
      { label: "Exam Grades", href: "/exam/exam-grades" },
    ],
  },
  { label: "Transport", icon: <TruckIcon className="h-5 w-5" />, href: "/transport" },
  { label: "Hostel", icon: <OfficeBuildingIcon className="h-5 w-5" />, href: "/hostel" },
  { label: "Notice", icon: <BellIcon className="h-5 w-5" />, href: "/notice" },
  { label: "Message", icon: <ChatIcon className="h-5 w-5" />, href: "/message" },
  {
    label: "Other Pages",
    icon: <AdjustmentsIcon className="h-5 w-5" />,
    key: "other_pages",
    subItems: [
      { label: "Login", href: "/login" },
      { label: "Sign Up", href: "/signup" },
      { label: "404", href: "/404" },
      { label: "Blank Page", href: "/blank" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
      { label: "Invoice", href: "/invoice" },
    ],
  },
  {
    label: "Reports",
    icon: <DocumentTextIcon className="h-5 w-5" />,
    key: "reports",
    subItems: [
      { label: "Medical Reports", href: "/reports/medical" },
      { label: "Lab Results", href: "/reports/lab" },
    ],
  },
  {
    label: "Settings",
    icon: <CogIcon className="h-5 w-5" />,
    key: "settings",
    subItems: [
      { label: "Profile Settings", href: "/settings/profile" },
      { label: "System Settings", href: "/settings/system" },
    ],
  },
];


const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleDropdown = (menu: string) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
    if (isCollapsed) {
      setIsCollapsed(false); // Expand sidebar if collapsed
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className={`${isCollapsed ? "w-16" : "w-60"} bg-orange-500 text-white h-full transition-all duration-300`}>
      {/* Toggle Button */}
      <div className="flex justify-end p-5 ">
        <button onClick={toggleSidebar} className="text-white">
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>
      <ul className="text-base">
        {menuItems.map((item) => (
          <li key={item.label} className="relative group">
            <div
              className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-600 px-4 rounded"
              onClick={() => item.subItems && toggleDropdown(item.key || "")}
            >
              <div className="flex items-center">
                <Link href={item.href || "#"} className="flex items-center">
                  {item.icon}
                  {!isCollapsed && <span className="ml-2">{item.label}</span>}
                </Link>
              </div>
              {item.subItems && !isCollapsed && (
                <>
                  {openMenu === item.key ? (
                    <ChevronDownIcon className="h-5 w-5" />
                  ) : (
                    <ChevronRightIcon className="h-5 w-5" />
                  )}
                </>
              )}
            </div>
            {isCollapsed && (
              <div className="absolute left-full top-2 bg-gray-700 text-white text-sm rounded shadow-md px-2 py-1 opacity-0 group-hover:opacity-100">
                {item.label}
              </div>
            )}
            {item.subItems && openMenu === item.key && !isCollapsed && (
              <ul className="pl-8">
                {item.subItems.map((subItem) => (
                  <li key={subItem.label}>
                    <Link
                      href={subItem.href}
                      className="block py-2 hover:bg-gray-700 rounded"
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
