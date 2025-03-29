'use client';

import React, { useState } from 'react';
import ChatWidget from './components/ChatWidget';
import ThemeToggle from './components/ThemeToggle';
import DraggableWindow from './components/DraggableWindow';
import Dock from './components/Dock';

interface WindowState {
  [key: string]: boolean;
}

export default function Home() {
  const [openWindows, setOpenWindows] = useState<WindowState>({
    myComputer: false,
    documents: false,
    recycleBin: false,
    settings: false,
    welcome: true,
    chat: false,
  });

  const toggleWindow = (windowName: string) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowName]: !prev[windowName]
    }));
  };

  const dockItems = [
    {
      icon: '💻',
      label: 'My Computer',
      onClick: () => toggleWindow('myComputer'),
      isActive: openWindows.myComputer
    },
    {
      icon: '📁',
      label: 'Documents',
      onClick: () => toggleWindow('documents'),
      isActive: openWindows.documents
    },
    {
      icon: '🗑️',
      label: 'Recycle Bin',
      onClick: () => toggleWindow('recycleBin'),
      isActive: openWindows.recycleBin
    },
    {
      icon: '⚙️',
      label: 'Settings',
      onClick: () => toggleWindow('settings'),
      isActive: openWindows.settings
    },
    {
      icon: '💬',
      label: 'Chat',
      onClick: () => toggleWindow('chat'),
      isActive: openWindows.chat
    }
  ];

  return (
    <main className="min-h-screen bg-[#000080] p-4 overflow-hidden">
      {/* Desktop Windows */}
      <DraggableWindow 
        title="My Computer" 
        className="w-[90vw] md:w-48"
        defaultPosition={{ x: 20, y: 20 }}
        isOpen={openWindows.myComputer}
        onClose={() => toggleWindow('myComputer')}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">💻</div>
          <div className="text-sm">My Computer</div>
        </div>
      </DraggableWindow>
      
      <DraggableWindow 
        title="Documents" 
        className="w-[90vw] md:w-48"
        defaultPosition={{ x: window.innerWidth > 768 ? 90 : 20, y: window.innerWidth > 768 ? 20 : 120 }}
        isOpen={openWindows.documents}
        onClose={() => toggleWindow('documents')}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">📁</div>
          <div className="text-sm">Documents</div>
        </div>
      </DraggableWindow>
      
      <DraggableWindow 
        title="Recycle Bin" 
        className="w-[90vw] md:w-48"
        defaultPosition={{ x: window.innerWidth > 768 ? 160 : 20, y: window.innerWidth > 768 ? 20 : 220 }}
        isOpen={openWindows.recycleBin}
        onClose={() => toggleWindow('recycleBin')}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">🗑️</div>
          <div className="text-sm">Recycle Bin</div>
        </div>
      </DraggableWindow>
      
      <DraggableWindow 
        title="Settings" 
        className="w-[90vw] md:w-48"
        defaultPosition={{ x: window.innerWidth > 768 ? 230 : 20, y: window.innerWidth > 768 ? 20 : 320 }}
        isOpen={openWindows.settings}
        onClose={() => toggleWindow('settings')}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">⚙️</div>
          <div className="text-sm">Settings</div>
        </div>
      </DraggableWindow>

      <DraggableWindow 
        title="Welcome" 
        className="w-[90vw] md:w-[600px]"
        defaultPosition={{ x: window.innerWidth > 768 ? 300 : 20, y: window.innerWidth > 768 ? 100 : 420 }}
        isOpen={openWindows.welcome}
        onClose={() => toggleWindow('welcome')}
      >
        <div className="space-y-4">
          <div className="text-2xl font-bold text-center mb-8">
            Welcome to PelOS
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">👋</div>
            <p className="text-lg">
              I am Pel, a designer.
              <br />
              Making tools
            </p>
          </div>
        </div>
      </DraggableWindow>

      <ChatWidget 
        isOpen={openWindows.chat}
        onClose={() => toggleWindow('chat')}
      />
      <ThemeToggle />
      <Dock items={dockItems} />
    </main>
  );
} 