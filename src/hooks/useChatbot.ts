import { useState } from 'react';
import { Message, ChatbotResponse } from '@/types/chatbot';

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your e-learning assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const sendMessage = async (content: string) => {
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Call the API
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }
      
      const data: ChatbotResponse = await response.json();
      
      // Add bot response to chat
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Add follow-up questions if available
      if (data.followUpQuestions?.length) {
        const followUpContent = 'You can ask: ' + data.followUpQuestions.join(' • ');
        const followUpMessage: Message = {
          id: (Date.now() + 2).toString(),
          content: followUpContent,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, followUpMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I couldn't process your request. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages: () => setMessages([{
      id: '1',
      content: "Hello! I'm your e-learning assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }])
  };
}
