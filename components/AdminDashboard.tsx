
import React, { useState } from 'react';
import { Temple, BugReport, TempleStaff, UserProfile } from '../types';
import EmployeePanel from './EmployeePanel';

interface AdminDashboardProps {
  temples: Temple[];
  bugReports: BugReport[];
  userProfile: UserProfile;
  onUpdate: (updatedTemple: Temple) => void;
  onReportBug: () => void;
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ temples, bugReports, userProfile, onUpdate, onReportBug, onBack }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'temple' | 'staff' | 'entries'>('stats');
  const [staffTab, setStaffTab] = useState<'list' | 'requests' | 'attendance'>('list');
  
  const selectedTemple = temples.find(t => t.id === userProfile.assignedTempleId);

  if (!selectedTemple) {
    return (
      <div className="p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <p className="text-gray-600 font-medium">No assigned temple found for your account.</p>
        <button onClick={onBack} className="text-blue-600 font-bold text-sm">Return Home</button>
      </div>
    );
  }

  const toggleDate = (date: string) => {
    const newDates = selectedTemple.enabledDates.includes(date) 
      ? selectedTemple.enabledDates.filter(d => d !== date) 
      : [...selectedTemple.enabledDates, date].sort();
    onUpdate({ ...selectedTemple, enabledDates: newDates });
  };

  const staffList = selectedTemple.staff || [];

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 pb-12">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-serif leading-none">Admin Control</h2>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Authorized: {selectedTemple.name}</p>
        </div>
      </div>

      <div className="flex gap-2 bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
        {[
          {id: 'stats', label: 'Stats', icon: '📊'},
          {id: 'temple', label: 'Darshan', icon: '⛩️'},
          {id: 'staff', label: 'Staff', icon: '👮'},
          {id: 'entries', label: 'Verify', icon: '🎟️'}
        ].map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id as any)} 
            className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all justify-center ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400'}`}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'stats' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Queue Size</p>
              <p className="text-3xl font-black text-blue-600">{selectedTemple.currentQueueCount}</p>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Staff</p>
              <p className="text-3xl font-black text-green-600">{staffList.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Temple Maintenance</h3>
            {bugReports.length > 0 ? (
               <div className="space-y-2">{bugReports.map(report => (<div key={report.id} className="p-3 bg-red-50 rounded-xl flex justify-between items-start"><p className="text-[11px] text-red-700 font-medium leading-tight">{report.description}</p><button className="text-[10px] font-black text-red-500 uppercase">Solve</button></div>))}</div>
            ) : (<p className="text-xs text-gray-400 italic">No open maintenance reports.</p>)}
            <button onClick={onReportBug} className="w-full mt-4 py-3 bg-gray-50 text-gray-400 rounded-xl text-[10px] font-black uppercase hover:bg-red-50 hover:text-red-500 transition-colors">Log System Issue</button>
          </div>
        </div>
      )}

      {activeTab === 'temple' && (
        <div className="bg-white rounded-[2rem] shadow-lg border border-blue-50 overflow-hidden">
          <div className="p-6 bg-blue-600 text-white">
            <h3 className="text-lg font-black font-serif">Queue Configuration</h3>
            <p className="text-xs opacity-80">{selectedTemple.name}</p>
          </div>
          <div className="p-6 space-y-8">
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">Active Darshan Dates</h3>
              <div className="space-y-2 h-64 overflow-y-auto pr-2 custom-scrollbar">
                {Array.from({length: 30}, (_, i) => {
                  const d = new Date(); d.setDate(d.getDate() + i);
                  const ds = d.toISOString().split('T')[0];
                  const isEnabled = selectedTemple.enabledDates.includes(ds);
                  return (
                    <div 
                      key={ds} 
                      onClick={() => toggleDate(ds)}
                      className={`flex justify-between items-center p-3 rounded-2xl border transition-all cursor-pointer ${
                        isEnabled ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-100'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className={`text-xs font-black uppercase tracking-widest ${isEnabled ? 'text-blue-700' : 'text-gray-400'}`}>
                          {d.toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className={`text-sm font-bold ${isEnabled ? 'text-blue-900' : 'text-gray-600'}`}>
                          {d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${isEnabled ? 'left-7' : 'left-1'}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'staff' && (
        <div className="p-8 text-center bg-white rounded-3xl border border-gray-100">
          <p className="text-gray-400 text-sm">Staff Management Module</p>
          <p className="text-[10px] uppercase font-black text-blue-600 mt-2">Coming Soon</p>
        </div>
      )}

      {activeTab === 'entries' && (
        <div className="animate-in fade-in duration-300">
           <EmployeePanel temples={temples} lockedTempleId={userProfile.assignedTempleId} onUpdate={onUpdate} onBack={() => setActiveTab('stats')} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
