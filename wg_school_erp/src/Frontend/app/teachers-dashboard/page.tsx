import SummaryCard from '../components/teachers_dashboard/SummaryCard';
import StudentStatistics from '../components/teachers_dashboard/StudentStatistics';
import Notifications from '../components/teachers_dashboard/Notifications';
import StudentTable from '../components/teachers_dashboard/StudentTable';

export default function Dashboard() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen space-y-6 ">
      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 text-blue-600 ">
        <SummaryCard icon="students" count="35000" label="Total Students" color="text-purple-500" />
        <SummaryCard icon="exams" count="19050" label="Total Exams" color="text-blue-500" />
        <SummaryCard icon="graduates" count="23890" label="Graduate Studies" color="text-yellow-500" />
        <SummaryCard icon="income" count="$2102050" label="Total Income" color="text-red-500" />
      </div>

      {/* Student Statistics and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StudentStatistics />
        </div>
        <Notifications />
      </div>
      </div>
      {/* Student Table */}
      <StudentTable />
    </div>
  );
}
