
import React, { useState } from 'react';
import { Temple, QueueEntry, UserProfile } from '../types';

interface QueueFormProps {
  temple: Temple;
  userProfile: UserProfile;
  onCancel: () => void;
  onSuccess: (entry: QueueEntry) => void;
}

const QueueForm: React.FC<QueueFormProps> = ({ temple, userProfile, onCancel, onSuccess }) => {
  const [selectedDate, setSelectedDate] = useState<string>(temple.enabledDates[0] || '');
  const [groupSize, setGroupSize] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return alert("Please select a darshan date.");

    if (temple.currentQueueCount >= (temple.maxDevoteesPerDay || 500)) {
      return alert("Sorry, the limit for this day has been reached. Please select another date.");
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      const newEntry: QueueEntry = {
        id: Math.random().toString(36).substr(2, 9),
        templeId: temple.id,
        userName: userProfile.name,
        userPhoto: userProfile.photoUrl,
        groupSize,
        joinedAt: new Date(),
        bookingDate: selectedDate,
        position: temple.currentQueueCount + Math.floor(Math.random() * 20),
        tokenNumber: `PH-${temple.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'waiting'
      };
      
      onSuccess(newEntry);
      setIsSubmitting(false);
    }, 1200);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-10">
      <div className="flex items-center gap-3">
        <button onClick={onCancel} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="text-xl font-bold text-gray-900 font-serif">Confirm Booking</h2>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-orange-100/50 border border-orange-50 p-6 space-y-6">
        <div className="flex gap-4 items-center p-4 bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-orange-100">
          <img src={temple.imageUrl} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
          <div className="flex-1">
            <h3 className="font-bold text-orange-900">{temple.name}</h3>
            <p className="text-[10px] text-orange-700 font-black uppercase tracking-widest opacity-60">Limit: {temple.maxDevoteesPerDay} / day</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Darshan Date</label>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
              {temple.enabledDates.map(date => {
                const isActive = selectedDate === date;
                const d = formatDate(date);
                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 w-20 py-4 rounded-2xl flex flex-col items-center border-2 transition-all ${
                      isActive 
                        ? 'bg-orange-600 border-orange-600 text-white shadow-lg scale-105' 
                        : 'bg-gray-50 border-gray-100 text-gray-600 hover:border-orange-200'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold opacity-80">{d.split(',')[0]}</span>
                    <span className="text-lg font-black">{d.split(' ')[1]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Devotees</label>
              <div className="flex items-center bg-gray-50 rounded-2xl p-2 border border-gray-100">
                <button type="button" onClick={() => setGroupSize(Math.max(1, groupSize - 1))} className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold text-orange-600">-</button>
                <div className="flex-1 text-center font-black text-xl text-gray-800">{groupSize}</div>
                <button type="button" onClick={() => setGroupSize(Math.min(10, groupSize + 1))} className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold text-orange-600">+</button>
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Applicant</label>
              <div className="flex items-center gap-2">
                <img src={userProfile.photoUrl} className="w-8 h-8 rounded-full border border-orange-100" />
                <p className="font-bold text-gray-800 truncate text-sm">{userProfile.name}</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || temple.enabledDates.length === 0}
            className={`w-full py-5 rounded-2xl font-bold text-white shadow-xl transition-all ${
              isSubmitting ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 active:scale-95'
            }`}
          >
            {isSubmitting ? "Generating Pass..." : "Join Queue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QueueForm;
