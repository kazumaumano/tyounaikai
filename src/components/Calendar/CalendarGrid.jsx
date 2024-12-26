import React from 'react';

export function CalendarGrid({ currentDate, selectedDate, setSelectedDate, reservations }) {
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startingDay = firstDay.getDay();
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const totalDays = lastDay.getDate();
  const days = [];

  // Empty cells before first day
  for (let i = 0; i < startingDay; i++) {
    days.push(
      <div key={`empty-${i}`} className="text-center p-2 border"></div>
    );
  }

  // Calendar days
  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const dateStr = date.toISOString().split('T')[0];
    const hasReservation = reservations.some(r => r.date === dateStr);

    days.push(
      <div
        key={i}
        className={`text-center p-2 border cursor-pointer hover:bg-blue-50 
          ${hasReservation ? 'bg-blue-100' : ''} 
          ${selectedDate === dateStr ? 'ring-2 ring-blue-500' : ''}`}
        onClick={() => setSelectedDate(dateStr)}
      >
        <div className="text-sm">{i}</div>
        {hasReservation && (
          <div className="text-xs text-blue-600">
            <i className="fas fa-circle"></i>
          </div>
        )}
      </div>
    );
  }

  // Empty cells after last day
  const remainingCells = 42 - days.length;
  for (let i = 0; i < remainingCells; i++) {
    days.push(
      <div key={`remaining-${i}`} className="text-center p-2 border"></div>
    );
  }

  return (
    <div className="grid grid-cols-7 gap-1 mb-4">
      {['日', '月', '火', '水', '木', '金', '土'].map(day => (
        <div key={day} className="text-center font-bold p-2 bg-gray-100">
          {day}
        </div>
      ))}
      {days}
    </div>
  );
}