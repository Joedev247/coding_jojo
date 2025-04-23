import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChatbot } from '@/hooks/useChatbot';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const { messages, isLoading, sendMessage } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 rounded-lg border border-gray-200 shadow-lg bg-white flex flex-col" style={{ maxHeight: 'calc(100vh - 120px)' }}>
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 bg-blue-600 text-white rounded-t-lg">
        <h2 className="text-sm font-medium">E-Learning Assistant</h2>
        <div className="flex space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex-grow overflow-auto p-3" style={{ maxHeight: '350px' }}>
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
}
