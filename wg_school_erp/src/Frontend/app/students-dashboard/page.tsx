import AboutMe from '../components/Student_dashboard/AboutMe';
import ExamResults from '../components/Student_dashboard/ExamResults';
import AttendanceChart from '../components/Student_dashboard/AttendanceChart';
import EventCalendar from '../components/Student_dashboard/EventCalendar';
import Notifications from '../components/Student_dashboard/Notifications';

export default function Dashboard() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen grid gap-6">
      {/* Top Row: About Me and Exam Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <AboutMe />
        <ExamResults />
      </div>

      {/* Bottom Row: Attendance Chart, Event Calendar, and Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AttendanceChart />
        <EventCalendar />
        <Notifications />
      </div>
    </div>
  );
}
