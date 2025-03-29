'use client';

import { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import RetroWindow from './RetroWindow';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatWidgetProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ChatWidget({ isOpen = false, onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { role: 'assistant', content: '你好！有什么我可以帮助你的吗？' }
      ]);
    }
  }, []);

  useEffect(() => {
    // 滚动到最新消息
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 800);
  };

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
      
      const rawText = await response.text();
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (e) {
        throw new Error(`解析响应失败: ${rawText}`);
      }

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

  // 如果通过 Dock 打开，显示完整窗口
  if (isOpen) {
    return (
      <RetroWindow title="Chat with PelOS">
        <div className="flex flex-col h-[500px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`p-4 rounded ${
                    message.role === 'user'
                      ? 'bg-[#333] text-[#00ff00]'
                      : 'bg-[#1a1a1a] text-[#00ff00] border border-[#333]'
                  } inline-block max-w-[80%]`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#1a1a1a] text-[#00ff00] p-4 rounded inline-block max-w-[80%] border border-[#333]">
                  正在思考...
                </div>
              </div>
            )}
            {errorMessage && (
              <div className="flex justify-start">
                <div className="bg-[#1a1a1a] text-[#ff0000] p-4 rounded inline-block max-w-full text-sm border border-[#333]">
                  错误详情: {errorMessage}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="mt-auto">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入消息..."
                className="flex-1 p-3 bg-[#1a1a1a] border border-[#333] rounded focus:outline-none focus:border-[#00ff00] text-[#00ff00] placeholder-[#666]"
              />
              <button
                type="submit"
                disabled={loading}
                className="p-3 bg-[#333] text-[#00ff00] rounded hover:bg-[#444] disabled:opacity-50 transition-colors border border-[#444]"
              >
                <PaperAirplaneIcon className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </RetroWindow>
    );
  }

  // 默认显示悬停式聊天按钮
  return (
    <div 
      ref={widgetRef}
      className="fixed top-4 right-4 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Chat Button */}
      <div className={`relative transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <button
          className="w-12 h-12 bg-[#1a1a1a] text-[#00ff00] rounded-full shadow-lg hover:bg-[#333] transition-colors flex items-center justify-center text-2xl border-2 border-[#333]"
          aria-label="Chat"
        >
          💬
        </button>
      </div>

      {/* Chat Window */}
      <div 
        className={`absolute top-0 right-0 w-96 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <RetroWindow title="Chat with PelOS">
          <div className="flex flex-col h-[500px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`p-4 rounded ${
                      message.role === 'user'
                        ? 'bg-[#333] text-[#00ff00]'
                        : 'bg-[#1a1a1a] text-[#00ff00] border border-[#333]'
                    } inline-block max-w-[80%]`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] text-[#00ff00] p-4 rounded inline-block max-w-[80%] border border-[#333]">
                    正在思考...
                  </div>
                </div>
              )}
              {errorMessage && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] text-[#ff0000] p-4 rounded inline-block max-w-full text-sm border border-[#333]">
                    错误详情: {errorMessage}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="mt-auto">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="输入消息..."
                  className="flex-1 p-3 bg-[#1a1a1a] border border-[#333] rounded focus:outline-none focus:border-[#00ff00] text-[#00ff00] placeholder-[#666]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="p-3 bg-[#333] text-[#00ff00] rounded hover:bg-[#444] disabled:opacity-50 transition-colors border border-[#444]"
                >
                  <PaperAirplaneIcon className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>
        </RetroWindow>
      </div>
    </div>
  );
} 