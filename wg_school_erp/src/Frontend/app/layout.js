// app/layout.js
"use client";
import './globals.css';
import '@fullcalendar/daygrid'
import '@fullcalendar/timegrid'
import '@fullcalendar/core'
import LoginPage from "../app/login/page";
import Header from './Header/header';
import Sidebar from './components/Sidebar/sidebar';
import { useEffect, useState } from 'react';


export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or wait for children content to fully load
    const timer = setTimeout(() => setIsLoading(false), 1000); // Adjust timeout as needed
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const isLoggedIn = true; // Replace with your authentication logic

  if (!isLoggedIn) {
    return (
      <html>
        <head></head>
        <body>
          <LoginPage />
        </body>
      </html>
    );
  }

  return (
    <html>
      <head></head>
      <body>
        <div>
          <Header />
          <div className="flex">
            {/* Sidebar */}
            <div className="bg-orange-500">
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 cont">
              {isLoading ? (
                // Loader Component
                <div className="flex justify-center items-center h-screen">
                  <div className="loader border-t-transparent border-solid rounded-full border-orange-500 border-4 h-12 w-12 animate-spin"></div>
                </div>
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
