
import { Temple } from './types';

// Generate some initial enabled dates (next 10 days)
const getNextNDays = (n: number) => {
  const dates = [];
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
};

export const TEMPLES: Temple[] = [
  {
    // Fix: Added missing required property 'maxDevoteesPerDay'
    id: 't1',
    name: 'Sri Venkateswara Temple',
    location: 'Hill Top, Tirumala',
    baseWaitPerPerson: 1.5,
    currentQueueCount: 245,
    maxDevoteesPerDay: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1621360841013-c7683c659ec6?auto=format&fit=crop&q=80&w=800',
    description: 'An ancient and spiritual landmark dedicated to Lord Venkateswara.',
    enabledDates: getNextNDays(7)
  },
  {
    // Fix: Added missing required property 'maxDevoteesPerDay'
    id: 't2',
    name: 'Kashi Vishwanath',
    location: 'Varanasi, UP',
    baseWaitPerPerson: 2,
    currentQueueCount: 112,
    maxDevoteesPerDay: 500,
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-23a9d7f28a8a?auto=format&fit=crop&q=80&w=800',
    description: 'One of the most famous Hindu temples dedicated to Lord Shiva.',
    enabledDates: getNextNDays(5)
  },
  {
    // Fix: Added missing required property 'maxDevoteesPerDay'
    id: 't3',
    name: 'Meenakshi Amman',
    location: 'Madurai, Tamil Nadu',
    baseWaitPerPerson: 1.2,
    currentQueueCount: 89,
    maxDevoteesPerDay: 800,
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    description: 'A historic Hindu temple located on the southern bank of the Vaigai River.',
    enabledDates: getNextNDays(10)
  }
];

export const THEME_COLORS = {
  primary: 'bg-orange-600',
  secondary: 'bg-amber-500',
  accent: 'text-orange-800',
  background: 'bg-[#fdf6f0]'
};
