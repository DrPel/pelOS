'use client';

import React from 'react';
import Chat from './components/Chat';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <h1 className="text-center pt-4 text-2xl">pelOS</h1>
      <Chat />
    </main>
  );
} 