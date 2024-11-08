export interface Message {
  id: string;
  content: string;
  category: string;
  recipients: Recipient[];
  schedule?: Schedule;
  status: 'scheduled' | 'sent' | 'failed';
  timestamp: string;
}

export interface Recipient {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Schedule {
  date: string;
  recurrence?: 'none' | 'daily' | 'weekly' | 'monthly';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark';
  };
}