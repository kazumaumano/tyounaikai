import React from 'react';

export function ReservationForm({
  selectedDate,
  selectedTime,
  setSelectedTime,
  purpose,
  setPurpose,
  name,
  setName,
  contact,
  setContact,
  onSubmit,
  onCancel
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4" onClick={(e) => e.stopPropagation()}>
      <div>
        <label className="block mb-2 text-lg font-bold">予約日: {selectedDate}</label>
      </div>
      <div>
        <label className="block mb-2 text-lg font-bold">時間帯を選択</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="w-full p-3 border-2 border-blue-300 rounded-lg focus:border-blue-500"
          required
        >
          <option value="">選択してください</option>
          {Array.from({ length: 24 }, (_, i) => i).map(hour => {
            if (hour >= 9 && hour <= 21) {
              return (
                <option key={hour} value={`${hour}:00-${hour}:30`}>
                  {`${hour}:00-${hour}:30`}
                </option>
              );
            }
            return null;
          }).filter(Boolean)}
        </select>
      </div>
      <div>
        <label className="block mb-1">利用目的</label>
        <input
          type="text"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">予約者名</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">連絡先</label>
        <input
          type="tel"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
        >
          予約する
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex-1"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}