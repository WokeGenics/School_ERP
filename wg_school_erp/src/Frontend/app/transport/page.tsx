'use client';
import React, { useState, useEffect } from 'react';
import AddTransportForm from '../components/transport/AddTransportForm';
import TransportTable from '../components/transport/TransportTable';

const TransportPage = () => {
  const BaseUrl = "http://localhost:5000"
  const [transports, setTransports] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch transport data from the backend API
  const fetchTransports = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
      });

      const response = await fetch(`${BaseUrl}/api/transport?${queryParams.toString()}`);
      const result = await response.json();

      setTransports(result.data);
      setTotalItems(result.totalItems);
    } catch (error) {
      console.error('Error fetching transports:', error);
    }
  };

  useEffect(() => {
    fetchTransports();
  }, [currentPage]);

  // Add a new transport entry
  const addTransport = async (newTransport) => {
    try {
      const response = await fetch(`${BaseUrl}/api/transport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransport),
      });

      if (response.ok) {
        fetchTransports(); // Re-fetch transport data after adding a new transport
      } else {
        console.error('Error adding transport');
      }
    } catch (error) {
      console.error('Error adding transport:', error);
    }
  };

  // Handle pagination change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddTransportForm onAddTransport={addTransport} />
        <TransportTable transports={transports} />
      </div>
    </div>
  );
};

export default TransportPage;
