import React, { useEffect, useRef } from 'react';
import { Message as MessageType } from '../types';
import { Message } from './Message';

interface MessageListProps {
  messages: MessageType[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          Start a conversation by typing a message or using voice input
        </div>
      ) : (
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};