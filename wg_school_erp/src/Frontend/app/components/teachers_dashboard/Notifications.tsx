export default function Notifications() {
    const notifications = [
      { date: '16 June, 2019', message: 'Great School managing exam text...', author: 'Jennyfar Lopez', time: '5 min ago', color: 'bg-teal-400' },
      { date: '16 June, 2019', message: 'Great School managing printing.', author: 'Jennyfar Lopez', time: '5 min ago', color: 'bg-yellow-400' },
      { date: '16 June, 2019', message: 'Great School managing mensesom.', author: 'Jennyfar Lopez', time: '5 min ago', color: 'bg-pink-400' },
    ];
  
    return (
      <div className="bg-white shadow-md p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-black">Notifications</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index} className="mb-4">
              <div className="flex items-center space-x-2 mb-1">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${notification.color}`}>
                  {notification.date}
                </span>
              </div>
              <p className="text-gray-700 mb-1">{notification.message}</p>
              <p className="text-gray-500 text-sm">
                {notification.author} / {notification.time}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  