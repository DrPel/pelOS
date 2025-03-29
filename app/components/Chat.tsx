'use client';

import { useState, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { SYSTEM_PROMPTS } from '@/config/prompts';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 添加欢迎消息
  useEffect(() => {
    setMessages([
      { role: 'assistant', content: '你好！有什么我可以帮助你的吗？' }
    ]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage]
        }),
      });

      console.log('收到响应状态:', response.status);
      
      const rawText = await response.text();
      console.log('原始响应:', rawText);
      
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (e) {
        throw new Error(`解析响应失败: ${rawText}`);
      }
      
      console.log('解析的响应数据:', data);

      if (!response.ok) {
        throw new Error(data.details || `HTTP 错误! 状态: ${response.status}`);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error: any) {
      console.error('错误:', error);
      setErrorMessage(error.message || '发生未知错误');
      setMessages(prev => [...prev, { role: 'assistant', content: '抱歉，发生错误，请稍后重试。' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link 
          href="/"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← 返回首页
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Chat with PelOS</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 bg-white rounded-xl shadow-sm p-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div
              className={`p-4 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              } inline-block max-w-[80%] shadow-sm`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-4 rounded-2xl inline-block max-w-[80%] shadow-sm">
              正在思考...
            </div>
          </div>
        )}
        {errorMessage && (
          <div className="flex justify-start">
            <div className="bg-red-50 text-red-800 p-4 rounded-2xl inline-block max-w-full text-sm shadow-sm">
              错误详情: {errorMessage}
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-3 bg-white p-4 rounded-xl shadow-sm">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入消息..."
          className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading}
          className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <PaperAirplaneIcon className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
} 