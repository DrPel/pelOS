import React, { useRef, useEffect } from 'react';
import Message from './Message';
import ChatInput from './ChatInput';
import { Message as MessageType } from '../types';

interface ChatWindowProps {
  messages: MessageType[];
  onSendMessage: (message: string) => void;
  isTyping?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  isTyping = false,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="chat-container bg-white dark:bg-gray-800">
      <div className="messages-container h-[500px] overflow-y-auto p-4">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="message message-bot">
            <div className="message-content">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={onSendMessage} disabled={isTyping} />
    </div>
  );
};

export default ChatWindow; 