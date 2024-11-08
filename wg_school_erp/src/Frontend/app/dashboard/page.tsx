import HeaderStats from '../components/dashboard/HeaderStats';
import EarningsChart from '../components/dashboard/EarningsChart';
import StudentsPieChart from '../components/dashboard/StudentsPieChart';
import EventCalendar from '../components/dashboard/EventCalendar';
import NoticeBoard from '../components/dashboard/NoticeBoard';
import FooterStats from '../components/dashboard/FooterStats';


export default function Dashboard() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <HeaderStats />

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EarningsChart />
        <StudentsPieChart />
        <EventCalendar />
        <NoticeBoard />
      </div>

      {/* Footer */}
      <FooterStats />
    </div>
  );
}
