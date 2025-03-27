'use client';

import { useState, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [context, setContext] = useState('');
  const [showContext, setShowContext] = useState(false);

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
      console.log('发送请求:', [{ role: 'user', content: input }]);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [
            { role: 'user', content: input } 
          ],
          context: context || undefined
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
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-2xl mx-auto p-4">
      <div className="mb-2">
        <button 
          className="text-sm text-blue-500 hover:text-blue-700"
          onClick={() => setShowContext(!showContext)}
        >
          {showContext ? '隐藏上下文' : '显示上下文'}
        </button>
        
        {showContext && (
          <div className="mt-2">
            <textarea
              className="w-full h-32 p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="在这里粘贴参考资料、文档或上下文..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            ></textarea>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-4 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              } inline-block max-w-[80%]`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 p-4 rounded-lg inline-block max-w-[80%]">
              正在思考...
            </div>
          </div>
        )}
        {errorMessage && (
          <div className="flex justify-start">
            <div className="bg-red-100 text-red-800 p-4 rounded-lg inline-block max-w-full text-sm">
              错误详情: {errorMessage}
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入消息..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          <PaperAirplaneIcon className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
} 