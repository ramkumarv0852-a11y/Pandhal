
import React, { useState } from 'react';
import { Temple, UserProfile, AttendanceRecord, LeaveRequest } from '../types';

interface EmployeePanelProps {
  temples: Temple[];
  lockedTempleId?: string;
  userProfile?: UserProfile;
  onUpdate: (updatedTemple: Temple) => void;
  onBack: () => void;
}

const EmployeePanel: React.FC<EmployeePanelProps> = ({ temples, lockedTempleId, userProfile, onUpdate, onBack }) => {
  const templeId = lockedTempleId || userProfile?.assignedTempleId;
  const selectedTemple = temples.find(t => t.id === templeId);
  
  const [activeSubTab, setActiveSubTab] = useState<'verify' | 'attendance' | 'leave'>('verify');
  const [newAlert, setNewAlert] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{name: string, photo: string, token: string, status: 'valid' | 'invalid', message?: string} | null>(null);

  // Local state for attendance/leave simulation
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [leaveForm, setLeaveForm] = useState({ start: '', end: '', reason: '' });

  if (!selectedTemple) return (
    <div className="p-8 text-center space-y-4">
      <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <p className="text-gray-500 font-medium">No assigned temple station found.</p>
      <button onClick={onBack} className="text-amber-600 font-bold text-sm">Return Home</button>
    </div>
  );

  const addAlert = () => {
    if (!newAlert.trim()) return;
    onUpdate({ ...selectedTemple, activeAlerts: [newAlert.trim()] });
    setNewAlert('');
    alert("Broadcasted to queue.");
  };

  const simulateScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      const isCorrectTemple = Math.random() > 0.2;
      if (isCorrectTemple) {
        setScanResult({
          name: "Rahul Sharma",
          photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
          token: `PH-${selectedTemple.id.toUpperCase()}-9042`,
          status: 'valid'
        });
      } else {
        setScanResult({
          name: "Wrong Temple",
          photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper',
          token: "PH-OTHER-1122",
          status: 'invalid',
          message: `This pass is for another temple.`
        });
      }
    }, 1200);
  };

  const handleAttendance = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toISOString().split('T')[0];
    
    const updatedStaff = selectedTemple.staff?.map(s => {
      if (s.name === userProfile?.name) {
        if (!isCheckedIn) {
          const newRecord: AttendanceRecord = { id: Math.random().toString(), date: dateStr, checkIn: timeStr };
          return { ...s, attendance: [...(s.attendance || []), newRecord] };
        } else {
          const lastRecord = s.attendance[s.attendance.length - 1];
          const updatedRecords = [...s.attendance];
          updatedRecords[updatedRecords.length - 1] = { ...lastRecord, checkOut: timeStr };
          return { ...s, attendance: updatedRecords };
        }
      }
      return s;
    });

    onUpdate({ ...selectedTemple, staff: updatedStaff });
    setIsCheckedIn(!isCheckedIn);
    alert(isCheckedIn ? "Checked Out Successfully" : "Checked In Successfully");
  };

  const submitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveForm.start || !leaveForm.end || !leaveForm.reason) return;
    
    const newRequest: LeaveRequest = {
      id: Math.random().toString(),
      startDate: leaveForm.start,
      endDate: leaveForm.end,
      reason: leaveForm.reason,
      status: 'pending'
    };

    const updatedStaff = selectedTemple.staff?.map(s => {
      if (s.name === userProfile?.name) {
        return { ...s, leaveRequests: [...(s.leaveRequests || []), newRequest] };
      }
      return s;
    });

    onUpdate({ ...selectedTemple, staff: updatedStaff });
    setLeaveForm({ start: '', end: '', reason: '' });
    alert("Leave request submitted for Admin approval.");
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 bg-gray-100 rounded-full text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg></button>
          <h2 className="text-xl font-bold text-gray-900 font-serif">Staff Portal</h2>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
        {[
          { id: 'verify', label: 'Scanner', icon: '🔍' },
          { id: 'attendance', label: 'Attendance', icon: '⏱️' },
          { id: 'leave', label: 'Leave', icon: '📅' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center justify-center gap-2 ${
              activeSubTab === tab.id ? 'bg-amber-500 text-white shadow-md' : 'text-gray-400'
            }`}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] shadow-lg border border-orange-50 overflow-hidden">
        {activeSubTab === 'verify' && (
          <div className="p-6 space-y-6">
            <div className={`relative h-64 rounded-3xl overflow-hidden border-4 transition-all duration-300 ${isScanning ? 'border-orange-500 shadow-xl' : scanResult?.status === 'invalid' ? 'border-red-500 shadow-xl shadow-red-100' : 'border-gray-100'} bg-black flex flex-col items-center justify-center`}>
              {isScanning ? (
                <>
                  <div className="absolute top-0 w-full h-1.5 bg-orange-500 animate-scan z-10"></div>
                  <div className="text-orange-500 animate-pulse text-xs font-bold uppercase tracking-widest">Scanning QR...</div>
                </>
              ) : scanResult ? (
                <div className="text-center p-6 bg-white w-full h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
                  <p className={`text-[10px] font-black uppercase mb-4 px-3 py-1 rounded-full border tracking-widest ${scanResult.status === 'valid' ? 'text-green-600 bg-green-50 border-green-100' : 'text-red-600 bg-red-50 border-red-100'}`}>
                    {scanResult.status === 'valid' ? '✓ Verified' : '✗ Invalid Location'}
                  </p>
                  <div className={`w-20 h-20 rounded-full border-4 overflow-hidden mb-3 shadow-md ${scanResult.status === 'valid' ? 'border-blue-50' : 'border-red-50 opacity-40 grayscale'}`}>
                    <img src={scanResult.photo} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-lg font-black text-gray-900 leading-none">{scanResult.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-tighter">{scanResult.token}</p>
                  <div className="flex gap-2 mt-6">
                    <button onClick={() => setScanResult(null)} className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">Reset</button>
                    {scanResult.status === 'valid' && <button onClick={() => { alert("Entry Logged."); setScanResult(null); }} className="px-6 py-2 bg-green-600 text-white rounded-full text-xs font-bold shadow-md">Grant Entry</button>}
                  </div>
                </div>
              ) : (
                <button onClick={simulateScan} className="flex flex-col items-center gap-4 text-white/30 px-12"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 8V4"/><path d="M12 20v-4"/><path d="M2 12h4"/><path d="M18 12h4"/></svg><span className="text-[10px] uppercase font-bold tracking-[0.2em] text-center">Tap to verify devotee entry</span></button>
              )}
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Queue Broadcast</label>
              <div className="flex gap-2">
                <input type="text" placeholder="Updates for devotees..." className="flex-1 px-4 py-3 rounded-2xl bg-gray-50 border-none text-xs outline-none focus:ring-2 focus:ring-amber-500 font-medium" value={newAlert} onChange={e => setNewAlert(e.target.value)}/>
                <button onClick={addAlert} className="px-4 bg-amber-600 text-white rounded-2xl font-bold text-[10px] uppercase shadow-sm">Send</button>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'attendance' && (
          <div className="p-8 space-y-8 text-center animate-in fade-in duration-300">
            <div className="space-y-2">
              <div className={`w-24 h-24 rounded-[2rem] mx-auto flex items-center justify-center text-white shadow-xl transition-all duration-500 ${isCheckedIn ? 'bg-green-600 rotate-12' : 'bg-gray-400 rotate-0'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 pt-2">{isCheckedIn ? 'Clocked In' : 'Not Clocked In'}</h3>
              <p className="text-xs text-gray-400 font-medium">Record your daily attendance at {selectedTemple.name}.</p>
            </div>

            <button 
              onClick={handleAttendance}
              className={`w-full py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-lg transition-all active:scale-95 ${isCheckedIn ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-600 text-white shadow-green-100'}`}
            >
              {isCheckedIn ? 'End Shift (Clock Out)' : 'Start Shift (Clock In)'}
            </button>
          </div>
        )}

        {activeSubTab === 'leave' && (
          <div className="p-6 space-y-6 animate-in fade-in duration-300">
            <h3 className="font-bold text-gray-900">Apply for Leave</h3>
            <form onSubmit={submitLeave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Start Date</label>
                  <input type="date" required className="w-full px-4 py-2 bg-gray-50 rounded-xl border-none text-xs outline-none focus:ring-2 focus:ring-amber-500" value={leaveForm.start} onChange={e => setLeaveForm({...leaveForm, start: e.target.value})}/>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">End Date</label>
                  <input type="date" required className="w-full px-4 py-2 bg-gray-50 rounded-xl border-none text-xs outline-none focus:ring-2 focus:ring-amber-500" value={leaveForm.end} onChange={e => setLeaveForm({...leaveForm, end: e.target.value})}/>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Reason</label>
                <textarea required rows={3} placeholder="Provide a brief reason..." className="w-full px-4 py-3 bg-gray-50 rounded-2xl border-none text-xs outline-none focus:ring-2 focus:ring-amber-500" value={leaveForm.reason} onChange={e => setLeaveForm({...leaveForm, reason: e.target.value})}/>
              </div>
              <button type="submit" className="w-full py-4 bg-amber-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95">Submit Request</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeePanel;
