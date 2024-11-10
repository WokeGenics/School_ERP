'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function EventCalendar() {
  return (
    <div className="bg-white shadow-md p-6 rounded-md text-black">
      <h2 className="text-lg font-bold mb-4 text-black">Event Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'Parent-Teacher Meeting', date: '2024-11-10' },
          { title: 'Science Fair', date: '2024-11-15' },
        ]}
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth',
        }}
      />
    </div>
  );
}
