'use client';

import React, { useState } from 'react';
import ChatDrawer from './components/ChatDrawer';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            I am Pel, a designer.
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Making tools
          </p>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Start Chatting
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
} 