import { FaUserGraduate, FaClipboardList, FaGraduationCap, FaDollarSign } from 'react-icons/fa';

export default function SummaryCard({ icon, count, label }) {
  const icons = {
    students: <FaUserGraduate className="text-3xl text-purple-500" />,
    exams: <FaClipboardList className="text-3xl text-blue-500" />,
    graduates: <FaGraduationCap className="text-3xl text-yellow-500" />,
    income: <FaDollarSign className="text-3xl text-red-500" />,
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-md flex items-center w-full	">
      <div>{icons[icon]}</div>
      <div>
        <p className="text-2xl font-bold">{count}</p>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  );
}
