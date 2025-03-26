'use client';

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatWindow from './components/ChatWindow';
import { Message } from './types';
import { processMessage, defaultBotConfig } from './utils/botLogic';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // 初始化欢迎消息
  useEffect(() => {
    const welcomeMessage: Message = {
      id: uuidv4(),
      role: 'bot',
      content: defaultBotConfig.welcomeMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages([welcomeMessage]);
  }, []);

  // 处理发送消息
  const handleSendMessage = (content: string) => {
    // 添加用户消息
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: content,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // 模拟机器人思考时间
    setTimeout(() => {
      // 处理消息并获取回复
      const botResponse = processMessage(content);
      
      // 添加机器人回复
      const botMessage: Message = {
        id: uuidv4(),
        role: 'bot',
        content: botResponse,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">个人网站聊天机器人</h1>
        <p className="text-gray-600 dark:text-gray-300">
          欢迎与我的聊天机器人交流，了解更多关于我的信息
        </p>
      </header>
      
      <main className="w-full max-w-2xl">
        <ChatWindow 
          messages={messages}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
        />
      </main>
      
      <footer className="mt-8 text-center text-sm text-gray-500">
        © 2023 个人网站 - 基于Next.js开发
      </footer>
    </div>
  );
} 