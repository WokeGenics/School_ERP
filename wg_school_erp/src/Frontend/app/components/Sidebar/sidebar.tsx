// app/components/Sidebar.tsx
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, UserIcon, CalendarIcon, DocumentReportIcon, CogIcon, ChevronDownIcon, ChevronUpIcon, CurrencyRupeeIcon,KeyIcon, ChevronRightIcon } from '@heroicons/react/outline';

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="w-64 bg-transparent text-white pt-12 mt-0 ml-0 zee">
     
      <ul className='text-xl' >
      <li>
          <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-600 px-4 rounded" onClick={() => toggleDropdown('dashboard')}>
            <div className="flex items-center">
              <HomeIcon className="h-5 w-5 mr-2" /> Dashboard
            </div>
            {openMenu === 'dashboard' ? <ChevronDownIcon className="h-4 w-4 " /> : <ChevronRightIcon className="h-5 w-5" />}
          </div>
          {openMenu === 'dashboard' && (
            <ul className="pl-6">
              <li><Link href="/dashboard" className="block py-2 hover:bg-gray-700 rounded">Admin</Link></li>
              <li><Link href="/students-dashboard" className="block py-2 hover:bg-gray-700 rounded">Students</Link></li>
              <li><Link href="/teachers-dashboard" className="block py-2 hover:bg-gray-700 rounded">Teachers</Link></li>
            
            </ul>
          )}
        </li>

        <li>
          <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 px-4 rounded" onClick={() => toggleDropdown('students')}>
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2" /> Student
            </div>
            {openMenu === 'students' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
          </div>
          {openMenu === 'students' && (
            <ul className="pl-6">
              <li><Link href="/students/add-student" className="block py-2 hover:bg-gray-700 rounded">Add Students</Link></li>
              <li><Link href="/students/all-students/" className="block py-2 hover:bg-gray-700 rounded">View Students</Link></li>
              <li><Link href="/students/students-detail" className="block py-2 hover:bg-gray-700 rounded">Student Details</Link></li>
              <li><Link href="/students/promotion" className="block py-2 hover:bg-gray-700 rounded">Students Promotion</Link></li>

            </ul>
          )}
        </li>
        <li>
          <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 px-4 rounded" onClick={() => toggleDropdown('teachers')}>
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2" /> Teachers
            </div>
            {openMenu === 'teachers' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
          </div>
          {openMenu === 'teachers' && (
            <ul className="pl-6">
              <li><Link href="/teachers/all-teachers" className="block py-2 hover:bg-gray-700 rounded">All Teachers</Link></li>
              <li><Link href="/teachers/add-teacher" className="block py-2 hover:bg-gray-700 rounded">Add Teachers</Link></li>
              <li><Link href="/teachers/about-teacher" className="block py-2 hover:bg-gray-700 rounded">Teachers Details </Link></li>
              <li><Link href="/teachers/teachers-payment" className="block py-2 hover:bg-gray-700 rounded">Payments</Link></li>

            </ul>
          )}
        </li>

        <li>
          <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 px-4 rounded" onClick={() => toggleDropdown('library')}>
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" /> Library
            </div>
            {openMenu === 'library' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
          </div>
          {openMenu === 'library' && (
            <ul className="pl-6">
              <li><Link href="/library/add-book" className="block py-2 hover:bg-gray-700 rounded">Add Books</Link></li>
              <li><Link href="/library/all-books" className="block py-2 hover:bg-gray-700 rounded">All Books</Link></li>
          
            </ul>
          )}
        </li>

        <li>
          <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 px-4 rounded" onClick={() => toggleDropdown('accounts')}>
            <div className="flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-2" /> Accounts
            </div>
            {openMenu === 'accounts' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
          </div>
          {openMenu === 'accounts' && (
            <ul className="pl-6">
              <li><Link href="/accounts/add-expense" className="block py-2 hover:bg-gray-700 rounded">Add Expenses</Link></li>
              <li><Link href="/accounts/all-fee-details" className="block py-2 hover:bg-gray-700 rounded">All Fee Collection</Link></li>
              <li><Link href="/accounts/expenses" className="block py-2 hover:bg-gray-700 rounded">Expenses</Link></li>

            </ul>
          )}
        </li>
        <li>
          <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 px-4 rounded" onClick={() => toggleDropdown('class')}>
            <div className="flex items-center">
              <KeyIcon className="h-5 w-5 mr-2" /> Class
            </div>
            {openMenu === 'class' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
          </div>
          {openMenu === 'class' && (
            <ul className="pl-6">
              <li><Link href="/class/add-new-class" className="block py-2 hover:bg-gray-700 rounded">Add Class </Link></li>
              <li><Link href="/class/all-class" className="block py-2 hover:bg-gray-700 rounded">All Class</Link></li>
            

            </ul>
          )}
        </li>
        <li>
          <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 px-4 rounded">
            <div className="flex items-center">
              <KeyIcon className="h-5 w-5 mr-2" /> <Link href="/class-routine" className="block py-2 hover:bg-gray-700 rounded">Class Routine</Link>
            </div>
            </div>
       
        </li>
        <li>
          <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 px-4 rounded">
            <div className="flex items-center">
              <KeyIcon className="h-5 w-5 mr-2" /><Link href="/attendence" className="block py-2 hover:bg-gray-700 rounded">Attendence</Link> 
            </div>
            </div>
       
        </li>


        <li>
          <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 px-4 rounded" onClick={() => toggleDropdown('exam')}>
            <div className="flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-2" /> Exam
            </div>
            {openMenu === 'exam' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
          </div>
          {openMenu === 'exam' && (
            <ul className="pl-6">
              <li><a href="/exam/exam-schedule" className="block py-2 hover:bg-gray-700 rounded">Exam Schedule</a></li>
              <li><a href="/exam/exam-grades" className="block py-2 hover:bg-gray-700 rounded">Exam Grades</a></li>
           

            </ul>
          )}
        </li>
        <li>
          <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 px-4 rounded">
            <div className="flex items-center">
              <KeyIcon className="h-5 w-5 mr-2" /><Link href="/transport" className="block py-2 hover:bg-gray-700 rounded">Transport</Link> 
            </div>
            </div>
       
        </li>         <li>
          <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 px-4 rounded">
            <div className="flex items-center">
              <KeyIcon className="h-5 w-5 mr-2" /><Link href="/hostel" className="block py-2 hover:bg-gray-700 rounded">Hostel</Link> 
            </div>
            </div>
       
        </li>
        <li>
          <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 px-4 rounded">
            <div className="flex items-center">
              <KeyIcon className="h-5 w-5 mr-2" /><Link href="/notice" className="block py-2 hover:bg-gray-700 rounded">Notice</Link> 
            </div>
            </div>
       
        </li>
        <li>
          <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 px-4 rounded">
            <div className="flex items-center">
              <KeyIcon className="h-5 w-5 mr-2" /><Link href="/message" className="block py-2 hover:bg-gray-700 rounded">Message</Link> 
            </div>
            </div>
       
        </li>
        <li>
          <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 px-4 rounded" onClick={() => toggleDropdown('other_pages')}>
            <div className="flex items-center">
              <KeyIcon className="h-5 w-5 mr-2" />Other Pages
            </div>
            {openMenu === 'other_pages' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
          </div>
          {openMenu === 'other_pages' && (
            <ul className="pl-6">
              <li><a href="/login/" className="block py-2 hover:bg-gray-700 rounded">Login</a></li>
              <li><a href="/signup/" className="block py-2 hover:bg-gray-700 rounded">Sign Up</a></li>
              <li><a href="#" className="block py-2 hover:bg-gray-700 rounded">404</a></li>
              <li><a href="#" className="block py-2 hover:bg-gray-700 rounded">Blank Page</a></li>
              <li><a href="#" className="block py-2 hover:bg-gray-700 rounded">Pricing</a></li>
              <li><a href="#" className="block py-2 hover:bg-gray-700 rounded">FAQ</a></li>
              <li><a href="#" className="block py-2 hover:bg-gray-700 rounded">Invoice</a></li>

            </ul>
          )}
        </li>

        <li>
          <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 px-4 rounded" onClick={() => toggleDropdown('reports')}>
            <div className="flex items-center">
              <DocumentReportIcon className="h-5 w-5 mr-2" /> Reports
            </div>
            {openMenu === 'reports' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
          </div>
          {openMenu === 'reports' && (
            <ul className="pl-6">
              <li><a href="#" className="block py-2 hover:bg-gray-700 rounded">Medical Reports</a></li>
              <li><a href="#" className="block py-2 hover:bg-gray-700 rounded">Lab Results</a></li>
            </ul>
          )}
        </li>

        <li>
          <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-700 px-4 rounded" onClick={() => toggleDropdown('settings')}>
            <div className="flex items-center">
              <CogIcon className="h-5 w-5 mr-2" /> Settings
            </div>
            {openMenu === 'settings' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
          </div>
          {openMenu === 'settings' && (
            <ul className="pl-6">
              <li><a href="#" className="block py-2 hover:bg-gray-700 rounded">Profile Settings</a></li>
              <li><a href="#" className="block py-2 hover:bg-gray-700 rounded">System Settings</a></li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;