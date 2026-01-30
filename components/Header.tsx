
import React from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  onHome: () => void;
  onViewToken: () => void;
  onOpenEmployee: () => void;
  onOpenAdmin: () => void;
  onSwitchRole: () => void;
  hasActiveToken: boolean;
  role?: UserRole;
}

const Header: React.FC<HeaderProps> = ({ onHome, onViewToken, onOpenEmployee, onOpenAdmin, onSwitchRole, hasActiveToken, role }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-orange-100 shadow-sm">
      <div className="flex items-center gap-2 cursor-pointer" onClick={onHome}>
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/><path d="M3 14v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6"/><path d="M12 2v4"/></svg>
        </div>
        <div>
          <h1 className="text-xl font-bold font-serif text-orange-900 leading-none">Pandhal</h1>
          {role && <span className="text-[9px] uppercase font-black text-orange-400 tracking-tighter">{role} Portal</span>}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {role === UserRole.EMPLOYEE && (
          <button onClick={onOpenEmployee} className="p-2.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 shadow-sm" title="Employee Panel">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
          </button>
        )}

        {role === UserRole.ADMIN && (
          <button onClick={onOpenAdmin} className="p-2.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 shadow-sm" title="Admin Panel">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/><path d="M16 5V3"/><path d="M8 5V3"/><path d="M3 9h18"/><path d="M20 14v6"/><path d="M17 17h6"/></svg>
          </button>
        )}

        {hasActiveToken && role === UserRole.USER && (
          <button onClick={onViewToken} className="relative p-2.5 rounded-full bg-orange-100 text-orange-600 border border-orange-200 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3z"/></svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[7px] text-white font-bold">!</span>
          </button>
        )}

        <button onClick={onSwitchRole} className="p-2.5 rounded-full bg-gray-50 text-gray-400 hover:text-orange-600 border border-gray-100 transition-colors" title="Change Role">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
