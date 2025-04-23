import React from 'react';
import { Message } from '@/types/chatbot';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex w-full my-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-3/4 rounded-lg px-4 py-2 ${
        isUser 
          ? 'bg-blue-600 text-white rounded-br-none' 
          : 'bg-gray-200 text-gray-800 rounded-bl-none'
      }`}>
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-500'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}