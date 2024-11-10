export default function Notifications() {
    const notifications = [
      { date: '10 June 2019', message: 'Great School managing exam text.' },
      { date: '12 June 2019', message: 'New update for Chemistry class.' },
      { date: '15 June 2019', message: 'Parent-teacher meeting scheduled.' },
    ];
  
    return (
      <div className="bg-white shadow-md p-6 rounded-md text-black">
        <h2 className="text-lg font-bold mb-4">Notifications</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index} className="mb-2 text-blue-600">
              <p className="text-sm text-gray-500">{notification.date}</p>
              <p>{notification.message}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  