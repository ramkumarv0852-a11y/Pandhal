
import React, { useState, useEffect } from 'react';
import { AppView, Temple, QueueEntry, UserProfile, UserRole, BugReport } from './types';
import { TEMPLES as INITIAL_TEMPLES } from './constants';
import Header from './components/Header';
import TempleList from './components/TempleList';
import QueueForm from './components/QueueForm';
import VirtualToken from './components/VirtualToken';
import TempleDetail from './components/TempleDetail';
import ProfileSetup from './components/ProfileSetup';
import EmployeePanel from './components/EmployeePanel';
import AdminDashboard from './components/AdminDashboard';
import RoleSelector from './components/RoleSelector';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.ROLE_SELECTOR);
  const [temples, setTemples] = useState<Temple[]>(INITIAL_TEMPLES);
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
  const [myToken, setMyToken] = useState<QueueEntry | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [bugReports, setBugReports] = useState<BugReport[]>([]);

  useEffect(() => {
    const savedToken = localStorage.getItem('pandhal_token');
    if (savedToken) {
      try {
        const parsed = JSON.parse(savedToken);
        parsed.joinedAt = new Date(parsed.joinedAt);
        setMyToken(parsed);
      } catch (e) { console.error(e); }
    }

    const savedProfile = localStorage.getItem('pandhal_profile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setUserProfile(profile);
        if (profile.role) setCurrentView(AppView.HOME);
      } catch (e) { console.error(e); }
    }
  }, []);

  const handleUpdateTemples = (updatedTemple: Temple) => {
    setTemples(temples.map(t => t.id === updatedTemple.id ? updatedTemple : t));
  };

  const handleLeaveQueue = () => {
    setMyToken(null);
    localStorage.removeItem('pandhal_token');
    setCurrentView(AppView.HOME);
  };

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto bg-[#fdf6f0] shadow-xl relative overflow-x-hidden font-sans">
      {currentView !== AppView.ROLE_SELECTOR && (
        <Header 
          onHome={() => setCurrentView(AppView.HOME)} 
          hasActiveToken={!!myToken}
          onViewToken={() => setCurrentView(AppView.MY_TOKEN)}
          role={userProfile?.role}
          onSwitchRole={() => setCurrentView(AppView.ROLE_SELECTOR)}
          onOpenEmployee={() => setCurrentView(AppView.EMPLOYEE_PANEL)}
          onOpenAdmin={() => setCurrentView(AppView.ADMIN_DASHBOARD)}
        />
      )}

      <main className="px-4 py-6">
        {currentView === AppView.ROLE_SELECTOR && (
          <RoleSelector onSelect={(role) => {
            setUserProfile({ name: '', phone: '', location: '', preferredLanguage: 'English', role });
            setCurrentView(AppView.PROFILE_SETUP);
          }} />
        )}

        {currentView === AppView.HOME && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 px-1">Sacred Locations</h3>
            <TempleList temples={temples} onSelect={(t) => {setSelectedTemple(t); setCurrentView(AppView.TEMPLE_DETAILS);}} onJoin={(t) => {setSelectedTemple(t); setCurrentView(AppView.JOIN_QUEUE);}} />
          </div>
        )}

        {currentView === AppView.PROFILE_SETUP && userProfile && (
          <ProfileSetup role={userProfile.role} onComplete={(p) => {setUserProfile(p); setCurrentView(AppView.HOME);}} onCancel={() => setCurrentView(AppView.ROLE_SELECTOR)} />
        )}

        {currentView === AppView.JOIN_QUEUE && selectedTemple && userProfile && (
          <QueueForm 
            temple={selectedTemple} 
            userProfile={userProfile}
            onCancel={() => setCurrentView(AppView.HOME)} 
            onSuccess={(entry) => {setMyToken(entry); setCurrentView(AppView.MY_TOKEN);}} 
          />
        )}

        {currentView === AppView.MY_TOKEN && myToken && (
          <VirtualToken 
            entry={myToken} 
            activeAlerts={temples.find(t => t.id === myToken.templeId)?.activeAlerts}
            onLeave={handleLeaveQueue}
            onBack={() => setCurrentView(AppView.HOME)}
          />
        )}

        {currentView === AppView.ADMIN_DASHBOARD && userProfile && (
          <AdminDashboard 
            temples={temples} 
            bugReports={bugReports}
            userProfile={userProfile}
            onUpdate={handleUpdateTemples} 
            onReportBug={() => alert("Maintenance reported")}
            onBack={() => setCurrentView(AppView.HOME)} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
