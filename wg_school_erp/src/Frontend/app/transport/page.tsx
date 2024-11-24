"use client"
import React, { useState } from "react";
import AddTransportForm from "../components/transport/AddTransportForm";
import TransportTable from "../components/transport/TransportTable";

const TransportPage = () => {
  const [transports, setTransports] = useState([
    {
      routeName: "Wales Road",
      vehicleNumber: "MT988800",
      driverName: "Johnathan John",
      licenseNumber: "DLNC025936",
      phoneNumber: "+889552365846",
    },
  ]);

  const addTransport = (newTransport) => {
    setTransports([...transports, newTransport]);
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
