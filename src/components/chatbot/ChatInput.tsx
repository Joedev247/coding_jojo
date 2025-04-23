

// /components/chatbot/ChatInput.tsx
import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex items-center border-t border-gray-200 p-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        className="flex-grow rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="ml-2 rounded-lg bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700 disabled:bg-blue-300"
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="mr-1 h-3 w-3 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-xs">Sending...</span>
          </span>
        ) : (
          'Send'
        )}
      </button>
    </form>
  );
}
