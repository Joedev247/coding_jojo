export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }
  
  export interface ChatbotResponse {
    message: string;
    followUpQuestions?: string[];
  }
  