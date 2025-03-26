import React from 'react';
import { Message as MessageType } from '../types';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`message ${isUser ? 'message-user' : 'message-bot'}`}>
      <div className="message-content">
        {message.content}
      </div>
    </div>
  );
};

export default Message; 