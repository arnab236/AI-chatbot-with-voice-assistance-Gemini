import React from 'react';
import { Message as MessageType } from '../types';

interface MessageProps {
  message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          message.isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
        <span className="text-xs opacity-75">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};