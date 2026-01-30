
import React from 'react';
import { Temple } from '../types';

interface TempleListProps {
  temples: Temple[];
  onSelect: (temple: Temple) => void;
  onJoin: (temple: Temple) => void;
}

const TempleList: React.FC<TempleListProps> = ({ temples, onSelect, onJoin }) => {
  return (
    <div className="grid gap-5">
      {temples.map((temple) => {
        const totalWait = Math.round(temple.currentQueueCount * temple.baseWaitPerPerson);
        const hours = Math.floor(totalWait / 60);
        const mins = totalWait % 60;
        
        return (
          <div 
            key={temple.id} 
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all active:scale-[0.98]"
          >
            <div 
              className="relative h-40 cursor-pointer overflow-hidden"
              onClick={() => onSelect(temple)}
            >
              <img 
                src={temple.imageUrl} 
                alt={temple.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded font-bold">
                {temple.location}
              </div>
              <div className="absolute bottom-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {hours > 0 ? `${hours}h ${mins}m wait` : `${mins}m wait`}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 leading-tight">{temple.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{temple.currentQueueCount} people currently in queue</p>
                </div>
                <button 
                  onClick={() => onJoin(temple)}
                  className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange-600 hover:text-white transition-colors"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TempleList;
