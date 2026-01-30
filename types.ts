
export enum AppView {
  HOME = 'home',
  JOIN_QUEUE = 'join_queue',
  MY_TOKEN = 'my_token',
  TEMPLE_DETAILS = 'temple_details',
  PROFILE_SETUP = 'profile_setup',
  EMPLOYEE_PANEL = 'employee_panel',
  ADMIN_DASHBOARD = 'admin_dashboard',
  ROLE_SELECTOR = 'role_selector'
}

export enum UserRole {
  USER = 'user',
  EMPLOYEE = 'employee',
  ADMIN = 'admin'
}

export interface UserProfile {
  name: string;
  phone: string;
  location: string;
  preferredLanguage: string;
  role: UserRole;
  photoUrl?: string;
  assignedTempleId?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut?: string;
}

export interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'denied';
}

export interface TempleStaff {
  id: string;
  name: string;
  age: number;
  sex: 'Male' | 'Female' | 'Other';
  phone: string;
  address: string;
  aadharId: string;
  role: string;
  status: 'active' | 'on-leave';
  attendance: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
}

export interface Temple {
  id: string;
  name: string;
  location: string;
  baseWaitPerPerson: number; 
  currentQueueCount: number;
  maxDevoteesPerDay: number;
  imageUrl: string;
  description: string;
  enabledDates: string[]; 
  activeAlerts?: string[];
  staff?: TempleStaff[];
}

export interface QueueEntry {
  id: string;
  templeId: string;
  userName: string;
  userPhoto?: string;
  groupSize: number;
  joinedAt: Date;
  bookingDate: string; 
  position: number;
  tokenNumber: string;
  status: 'waiting' | 'called' | 'completed';
}

export interface BugReport {
  id: string;
  reporter: string;
  description: string;
  timestamp: Date;
  status: 'open' | 'resolved';
}

export interface AIInsights {
  prediction: string;
  bestTime: string;
  spiritualTip: string;
}
