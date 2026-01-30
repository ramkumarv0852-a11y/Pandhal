
import React from 'react';
import { Temple } from '../types';

interface TempleDetailProps {
  temple: Temple;
  onBack: () => void;
  onJoin: () => void;
}

const TempleDetail: React.FC<TempleDetailProps> = ({ temple, onBack, onJoin }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="relative h-72 -mx-4 -mt-6 mb-6">
        <img src={temple.imageUrl} className="w-full h-full object-cover" />
        <div className="absolute top-6 left-6">
          <button onClick={onBack} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <h2 className="text-3xl font-bold font-serif">{temple.name}</h2>
          <p className="text-orange-300 text-sm flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            {temple.location}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex gap-4">
          <div className="flex-1 bg-white p-4 rounded-3xl shadow-sm border border-orange-50 text-center">
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Crowd</p>
            <p className="text-xl font-black text-orange-600">{temple.currentQueueCount}</p>
          </div>
          <div className="flex-1 bg-white p-4 rounded-3xl shadow-sm border border-orange-50 text-center">
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Wait Time</p>
            <p className="text-xl font-black text-gray-800">{Math.round(temple.currentQueueCount * temple.baseWaitPerPerson)}m</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">About</h3>
          <p className="text-gray-600 leading-relaxed">
            {temple.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sacerdotum et templorum antiquitas est magna. This sacred site offers a serene environment for prayers and spiritual rejuvenation.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Services</h3>
          <div className="grid grid-cols-2 gap-3">
            {['General Darshan', 'Special Pooja', 'Laddoo Prasadam', 'Annadanam'].map(item => (
              <div key={item} className="flex items-center gap-2 p-3 bg-gray-50 rounded-2xl text-sm text-gray-700">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                {item}
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={onJoin}
          className="w-full py-5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-xl shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
          Join Virtual Pandhal
        </button>
      </div>
    </div>
  );
};

export default TempleDetail;
