import React from 'react';
import { Menu, MessageSquare, Calendar, Settings, Clock, Users } from 'lucide-react';
import { mockUser } from '../data/mockData';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'recipients', icon: Users, label: 'Recipients' },
    { id: 'history', icon: Clock, label: 'History' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
        <Menu className="w-6 h-6 text-gray-600" />
        <span className="font-semibold text-gray-800">MessageBot</span>
      </div>
      
      <div className="flex-1 py-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left
                ${activeTab === tab.id 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1">
            <div className="font-medium text-sm text-gray-900">{mockUser.name}</div>
            <div className="text-xs text-gray-500">{mockUser.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}