'use client';

import React from 'react';
import Chat from './components/Chat';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <h1 className="text-center pt-4 text-2xl">聊天机器人</h1>
      <Chat />
    </main>
  );
} 