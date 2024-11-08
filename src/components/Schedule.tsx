import React from 'react';
import { Calendar as CalendarIcon, Clock, RefreshCw } from 'lucide-react';
import { mockMessages } from '../data/mockData';

export default function Schedule() {
  const scheduledMessages = mockMessages.filter(m => m.schedule);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Schedule</h2>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-4">
          {scheduledMessages.map((message) => (
            <div key={message.id} className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{message.content}</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {message.schedule?.date}
                    </div>
                    {message.schedule?.recurrence && message.schedule.recurrence !== 'none' && (
                      <div className="flex items-center text-sm text-gray-600">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Repeats {message.schedule.recurrence}
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  message.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                  message.status === 'sent' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}