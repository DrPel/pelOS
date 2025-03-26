export interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  sessionId: string;
  messages: Message[];
}

export interface TopicRule {
  keywords: string[];
  response: string;
}

export interface BotConfig {
  allowedTopics: TopicRule[];
  forbiddenTopics: TopicRule[];
  defaultReply: string;
  welcomeMessage: string;
} 