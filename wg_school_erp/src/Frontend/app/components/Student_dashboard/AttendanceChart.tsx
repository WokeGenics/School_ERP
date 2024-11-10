'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AttendanceChart() {
  const data = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [65.8, 28.2],
        backgroundColor: ['#FDB45C', '#36A2EB'],
      },
    ],
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-md text-black">
      <h2 className="text-lg font-bold mb-4">Attendance</h2>
      <Doughnut data={data} options={{ responsive: true }} />
    </div>
  );
}
