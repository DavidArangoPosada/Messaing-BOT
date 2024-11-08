import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MessageList from './components/MessageList';
import Schedule from './components/Schedule';

function App() {
  const [activeTab, setActiveTab] = useState('messages');

  const renderContent = () => {
    switch (activeTab) {
      case 'messages':
        return <MessageList />;
      case 'schedule':
        return <Schedule />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            Coming soon...
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;