'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StudentStatistics() {
  const data = {
    labels: ['Female Students', 'Male Students'],
    datasets: [
      {
        data: [10500, 24500],
        backgroundColor: ['#36A2EB', '#FDB45C'],
      },
    ],
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Students</h2>
      <Doughnut data={data} options={{ responsive: true }} />
      <div className="flex justify-between mt-4 text-sm text-gray-500 ">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Female Students</span>
          <span className="font-semibold">10,500</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span>Male Students</span>
          <span className="font-semibold">24,500</span>
        </div>
      </div>
    </div>
  );
}
