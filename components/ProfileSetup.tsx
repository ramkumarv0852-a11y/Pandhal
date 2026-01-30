
import React, { useState, useEffect } from 'react';
import { UserProfile, UserRole, Temple } from '../types';
import { TEMPLES } from '../constants';

interface ProfileSetupProps {
  role: UserRole;
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
}

const AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Buddy',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Coco',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna'
];

const ProfileSetup: React.FC<ProfileSetupProps> = ({ role, onComplete, onCancel }) => {
  const [formData, setFormData] = useState<UserProfile & { age?: number }>({
    name: '',
    phone: '',
    location: '',
    preferredLanguage: 'English',
    role: role,
    photoUrl: AVATARS[0],
    assignedTempleId: '',
    age: undefined
  });
  const [declared, setDeclared] = useState(false);

  useEffect(() => {
    setFormData(prev => ({ ...prev, role }));
  }, [role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      if ((role === UserRole.ADMIN || role === UserRole.EMPLOYEE)) {
        if (!formData.assignedTempleId) {
          alert("Please select a temple to manage.");
          return;
        }
        if (!formData.age || formData.age < 21) {
          alert("Registration failed: Minimum age for Temple Staff/Admin is 21 years.");
          return;
        }
      }
      
      if (role === UserRole.ADMIN && !declared) {
        alert("Please accept the solemn declaration to proceed as a Temple Administrator.");
        return;
      }
      
      if (role === UserRole.ADMIN) {
        const existingAdmins = JSON.parse(localStorage.getItem('pandhal_temple_admins') || '{}');
        if (existingAdmins[formData.assignedTempleId!]) {
          alert("This temple already has a registered administrator. Only one admin is permitted per temple.");
          return;
        }
        existingAdmins[formData.assignedTempleId!] = formData.name;
        localStorage.setItem('pandhal_temple_admins', JSON.stringify(existingAdmins));
      }

      onComplete(formData as UserProfile);
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
      <div className="text-center py-4 px-4">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl border-4 ${
          role === UserRole.USER ? 'border-orange-100 bg-white' : 
          role === UserRole.EMPLOYEE ? 'border-amber-100 bg-white' : 
          'border-blue-100 bg-white'
        } overflow-hidden`}>
          {role === UserRole.USER ? (
            <img src={formData.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={
              role === UserRole.USER ? 'text-orange-600' : role === UserRole.EMPLOYEE ? 'text-amber-600' : 'text-blue-600'
            }><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 font-serif">
          {role === UserRole.USER ? 'Devotee Registration' : role === UserRole.ADMIN ? 'Administrator Enrollment' : 'Staff Onboarding'}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {role === UserRole.USER 
            ? 'Complete your profile for a seamless darshan experience.' 
            : role === UserRole.ADMIN 
              ? 'Enrollment as an Admin is a permanent and serious commitment.'
              : 'Verified staff membership for a specific temple station.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-sm border border-orange-50 p-8 space-y-6">
        {role !== UserRole.USER && (
          <div className="space-y-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <div>
              <label className="block text-xs font-bold text-orange-900 uppercase tracking-widest mb-2">Temple Jurisdiction</label>
              <select 
                required
                className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-sm font-bold outline-none shadow-sm"
                value={formData.assignedTempleId}
                onChange={e => setFormData({...formData, assignedTempleId: e.target.value})}
              >
                <option value="">-- Select Temple Station --</option>
                {TEMPLES.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-orange-900 uppercase tracking-widest mb-2">Your Age</label>
              <input 
                type="number" required placeholder="Min 21 years" min="1"
                className="w-full px-4 py-3 rounded-xl bg-white border border-orange-200 outline-none font-bold text-sm shadow-sm"
                value={formData.age || ''}
                onChange={e => setFormData({...formData, age: parseInt(e.target.value)})}
              />
              <p className="text-[9px] text-orange-700 mt-1 font-bold">* Government regulations require staff to be 21+ years of age.</p>
            </div>

            {role === UserRole.ADMIN && (
              <div className="mt-2 flex gap-3 items-start bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                <input 
                  type="checkbox" 
                  id="declare" 
                  className="mt-1 accent-blue-600 h-4 w-4"
                  checked={declared}
                  onChange={e => setDeclared(e.target.checked)}
                />
                <label htmlFor="declare" className="text-[10px] text-blue-900 font-medium leading-relaxed">
                  I solemnly declare that I am the authorized administrator for this temple and accept full responsibility for its queue management and staff safety.
                </label>
              </div>
            )}
          </div>
        )}

        {role === UserRole.USER && (
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Select Profile Avatar</label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map(url => (
                <button
                  key={url}
                  type="button"
                  onClick={() => setFormData({...formData, photoUrl: url})}
                  className={`w-10 h-10 rounded-full border-2 transition-all overflow-hidden ${formData.photoUrl === url ? 'border-orange-500 scale-110 shadow-md' : 'border-gray-100 opacity-60'}`}
                >
                  <img src={url} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Legal Name</label>
            <input 
              type="text" required placeholder="e.g. Rahul Sharma"
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none outline-none font-medium text-sm shadow-inner"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Primary Phone</label>
            <input 
              type="tel" required placeholder="+91 90000 00000"
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none outline-none font-medium text-sm shadow-inner"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <button type="submit" className={`w-full py-4 text-white rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${
            role === UserRole.USER ? 'bg-orange-600' : role === UserRole.EMPLOYEE ? 'bg-amber-600' : 'bg-blue-600'
          }`}>
            Complete Enrollment
          </button>
          <button type="button" onClick={onCancel} className="w-full py-2 text-gray-400 font-medium text-sm hover:text-gray-600 transition-colors">
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSetup;
