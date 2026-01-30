
import React, { useState, useEffect, useRef } from 'react';
import { QueueEntry, AIInsights } from '../types';
import { getTempleInsights } from '../services/geminiService';
import { TEMPLES } from '../constants';

interface VirtualTokenProps {
  entry: QueueEntry;
  activeAlerts?: string[];
  onLeave: () => void;
  onBack: () => void;
}

const VirtualToken: React.FC<VirtualTokenProps> = ({ entry, activeAlerts, onLeave, onBack }) => {
  const [insights, setInsights] = useState<AIInsights | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(entry.position);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const temple = TEMPLES.find(t => t.id === entry.templeId);
  const syncInterval = useRef<number | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      if (temple) {
        setLoadingInsights(true);
        const data = await getTempleInsights(temple);
        setInsights(data);
        setLoadingInsights(false);
      }
    };
    fetchInsights();

    syncInterval.current = window.setInterval(() => {
      setIsSyncing(true);
      setTimeout(() => {
        const moveCount = Math.floor(Math.random() * 2);
        setCurrentPosition(prev => Math.max(1, prev - moveCount));
        setIsSyncing(false);
      }, 800);
    }, 10000);

    return () => {
      if (syncInterval.current) clearInterval(syncInterval.current);
    };
  }, [entry.templeId, temple]);

  const handleLeaveClick = () => {
    if (window.confirm("Are you sure you want to leave the queue?")) {
      onLeave();
    }
  };

  const progress = Math.max(0, 100 - (currentPosition / (temple?.currentQueueCount || 100)) * 100);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${entry.tokenNumber}&color=ea580c&bgcolor=ffffff`;

  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-500 pb-12">
      <div className="flex items-center justify-between px-2">
        <button onClick={onBack} className="p-2 bg-white rounded-full text-gray-600 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="text-xl font-bold text-gray-900 font-serif">Pandhal Pass</h2>
        <div className="w-9 h-9"></div>
      </div>

      <div className="relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-2 border-orange-50">
        <div className="bg-orange-600 p-8 pb-12 text-center text-white">
          <p className="text-orange-200 text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Queue ID</p>
          <h3 className="text-3xl font-black font-serif tracking-tight">{entry.tokenNumber}</h3>
          <p className="mt-2 text-white/80 font-bold text-sm">{temple?.name}</p>
        </div>

        <div className="p-8 pt-10 space-y-8 text-center">
          <div className="flex flex-col items-center gap-4">
             <div className="p-3 bg-white border-2 border-orange-100 rounded-3xl shadow-lg">
                <img src={qrUrl} className="w-40 h-40" alt="QR PASS" />
             </div>
             <p className="text-xl font-black text-gray-900">{entry.userName}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-orange-50 rounded-3xl border border-orange-100 text-center">
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Position</p>
              <p className="text-3xl font-black text-orange-600">#{currentPosition}</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-3xl border border-orange-100 text-center">
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Wait Time</p>
              <p className="text-2xl font-bold text-gray-800">~{Math.round(currentPosition * (temple?.baseWaitPerPerson || 2))}m</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-6 shadow-lg border border-orange-50 space-y-4">
        <h3 className="text-lg font-bold text-gray-800">AI Darshan Insights</h3>
        {loadingInsights ? (
          <div className="h-20 bg-gray-100 rounded-2xl animate-pulse"></div>
        ) : (
          <p className="text-sm text-gray-600 italic">"{insights?.prediction}"</p>
        )}
      </div>

      <button onClick={handleLeaveClick} className="w-full py-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all text-xs uppercase tracking-[0.2em]">
        Leave Queue
      </button>
    </div>
  );
};

export default VirtualToken;
