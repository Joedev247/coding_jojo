import { NextRequest, NextResponse } from 'next/server';
import { ChatbotResponse } from '@/types/chatbot';

// This is a simple rule-based response system
// In a real application, you might want to connect to a more sophisticated NLP service
function processChatMessage(message: string): ChatbotResponse {
  const normalizedMessage = message.toLowerCase().trim();
  
  if (normalizedMessage.includes('hello') || normalizedMessage.includes('hi')) {
    return {
      message: "Hello! I'm your e-learning assistant. How can I help you today?",
      followUpQuestions: [
        "Do you need help with course materials?",
        "Would you like to track your progress?",
        "Need assistance with assignments?"
      ]
    };
  }
  
  if (normalizedMessage.includes('course') || normalizedMessage.includes('material')) {
    return {
      message: "I can help you find course materials! What subject are you studying?",
      followUpQuestions: [
        "Are you looking for lecture notes?",
        "Do you need access to practice exercises?",
        "Would you like video tutorials?"
      ]
    };
  }
  
  if (normalizedMessage.includes('assignment') || normalizedMessage.includes('homework')) {
    return {
      message: "I can assist with assignments! What specifically are you working on?",
      followUpQuestions: [
        "Would you like tips on how to approach this?",
        "Do you need related learning resources?",
        "Are you looking for examples?"
      ]
    };
  }
  
  if (normalizedMessage.includes('progress') || normalizedMessage.includes('track')) {
    return {
      message: "Tracking your progress is important! I can show you your course completion stats and suggest next steps.",
      followUpQuestions: [
        "Would you like to see your recent activity?",
        "Do you want to set learning goals?",
        "Should we review your weak areas?"
      ]
    };
  }
  
  // Default response
  return {
    message: "I'm not sure I understood that. Could you rephrase or choose from these common topics?",
    followUpQuestions: [
      "Course materials",
      "Assignment help",
      "Progress tracking",
      "Study tips"
    ]
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { message: 'Invalid request. Message is required.' },
        { status: 400 }
      );
    }
    
    const response = processChatMessage(message);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing chat message:', error);
    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}