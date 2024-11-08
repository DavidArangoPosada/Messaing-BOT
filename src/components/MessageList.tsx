import React, { useState } from 'react';
import { Search, Plus, Filter, X, Check } from 'lucide-react';
import { mockMessages, mockCategories, mockRecipients } from '../data/mockData';
import type { Message, Recipient } from '../types';

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [newMessage, setNewMessage] = useState({
    content: '',
    category: mockCategories[0].name,
    recipients: [] as Recipient[],
  });

  const filteredMessages = messages.filter((message) => {
    const matchesSearch = message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? message.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleCreateMessage = () => {
    if (!newMessage.content.trim() || newMessage.recipients.length === 0) return;

    const message: Message = {
      id: (messages.length + 1).toString(),
      content: newMessage.content,
      category: newMessage.category,
      recipients: newMessage.recipients,
      status: 'scheduled',
      timestamp: new Date().toISOString(),
    };

    setMessages([message, ...messages]);
    setNewMessage({
      content: '',
      category: mockCategories[0].name,
      recipients: [],
    });
    setIsCreating(false);
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const toggleRecipient = (recipient: Recipient) => {
    setNewMessage(prev => {
      const exists = prev.recipients.find(r => r.id === recipient.id);
      if (exists) {
        return {
          ...prev,
          recipients: prev.recipients.filter(r => r.id !== recipient.id),
        };
      }
      return {
        ...prev,
        recipients: [...prev.recipients, recipient],
      };
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Message
          </button>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {mockCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <Filter className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {isCreating && (
          <div className="mb-4 p-4 bg-white rounded-lg border-2 border-blue-500">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type your message..."
              rows={3}
              value={newMessage.content}
              onChange={(e) => setNewMessage(prev => ({ ...prev, content: e.target.value }))}
            />
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newMessage.category}
                onChange={(e) => setNewMessage(prev => ({ ...prev, category: e.target.value }))}
              >
                {mockCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
              <div className="flex flex-wrap gap-2">
                {mockRecipients.map((recipient) => (
                  <button
                    key={recipient.id}
                    onClick={() => toggleRecipient(recipient)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${
                      newMessage.recipients.find(r => r.id === recipient.id)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <img
                      src={recipient.avatar}
                      alt={recipient.name}
                      className="w-4 h-4 rounded-full"
                    />
                    <span>{recipient.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateMessage}
                disabled={!newMessage.content.trim() || newMessage.recipients.length === 0}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-4 h-4 mr-2" />
                Create Message
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {filteredMessages.map((message: Message) => (
            <div
              key={message.id}
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-gray-900 font-medium line-clamp-2">{message.content}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      mockCategories.find(c => c.name === message.category)?.color
                    } bg-opacity-10 text-${
                      mockCategories.find(c => c.name === message.category)?.color.replace('bg-', '')
                    }`}>
                      {message.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteMessage(message.id)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="flex items-center -space-x-2">
                {message.recipients.map((recipient) => (
                  <img
                    key={recipient.id}
                    src={recipient.avatar}
                    alt={recipient.name}
                    className="w-6 h-6 rounded-full border-2 border-white"
                    title={recipient.name}
                  />
                ))}
                <span className="ml-4 text-xs text-gray-500">
                  {message.recipients.length} recipient{message.recipients.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}