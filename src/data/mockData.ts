import { Message, Recipient, Category, User } from '../types';

export const mockRecipients: Recipient[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
  },
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Birthday', color: 'bg-pink-500' },
  { id: '2', name: 'Reminder', color: 'bg-blue-500' },
  { id: '3', name: 'Greeting', color: 'bg-green-500' },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Happy Birthday! 🎉',
    category: 'Birthday',
    recipients: [mockRecipients[0]],
    schedule: { date: '2024-03-15', recurrence: 'yearly' },
    status: 'scheduled',
    timestamp: '2024-03-10T10:00:00Z',
  },
  {
    id: '2',
    content: 'Meeting reminder for tomorrow',
    category: 'Reminder',
    recipients: [mockRecipients[1], mockRecipients[2]],
    status: 'sent',
    timestamp: '2024-03-09T15:30:00Z',
  },
];

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  preferences: {
    notifications: true,
    theme: 'light',
  },
};