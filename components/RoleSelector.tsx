
import React from 'react';
import { UserRole } from '../types';

interface RoleSelectorProps {
  onSelect: (role: UserRole) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 bg-gradient-to-b from-[#fdf6f0] to-white animate-in fade-in duration-700">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm space-y-8">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-orange-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-2xl shadow-orange-200 mb-2 rotate-3 hover:rotate-0 transition-transform duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>
          </div>
          <h1 className="text-4xl font-black font-serif text-orange-950 tracking-tight">Pandhal</h1>
          <p className="text-gray-500 text-sm font-medium">Sacred darshan, simplified.</p>
        </div>

        {/* Primary Devotee Action */}
        <button 
          onClick={() => onSelect(UserRole.USER)}
          className="w-full group relative overflow-hidden bg-orange-600 p-8 rounded-[2rem] shadow-xl shadow-orange-200 transition-all active:scale-95"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <div className="relative z-10 text-left flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-md border border-white/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <p className="text-2xl font-black text-white">Devotee</p>
              <p className="text-orange-100 text-sm font-medium">Join Queue & Book Darshan</p>
            </div>
          </div>
        </button>
      </div>

      {/* Subtle Staff Links at the Bottom */}
      <div className="w-full max-w-sm pt-8 border-t border-orange-100/50 flex flex-col gap-4">
        <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Temple Administration</p>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => onSelect(UserRole.EMPLOYEE)}
            className="flex items-center justify-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 text-gray-600 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50 transition-all font-bold text-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Staff Portal
          </button>
          <button 
            onClick={() => onSelect(UserRole.ADMIN)}
            className="flex items-center justify-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all font-bold text-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Admin Desk
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
