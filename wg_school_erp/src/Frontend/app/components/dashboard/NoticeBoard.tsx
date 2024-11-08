'use client';

export default function NoticeBoard() {
    const notices = [
      { date: '10 June 2019', message: 'Great School managing exam text of the printing.' },
      { date: '12 June 2019', message: 'Great School managing printing.' },
      { date: '15 June 2019', message: 'Great School managing menseson.' },
    ];
  
    return (
      <div className="bg-white shadow-md p-4 rounded-md">
        <h3 className="text-gray-600 text-lg font-semibold mb-4">Notice Board</h3>
        <ul>
          {notices.map((notice, index) => (
            <li key={index} className="mb-2">
              <p className="text-sm text-gray-500">{notice.date}</p>
              <p  className="text-sm text-red-300">{notice.message}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  