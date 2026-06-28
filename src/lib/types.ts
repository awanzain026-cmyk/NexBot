export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  name: string;
  description: string;
  price: string;
}

export interface BusinessInfo {
  name: string;
  type: string;
  description: string;
  openingHours: string;
  address: string;
  phone: string;
  website: string;
}

export interface KnowledgeBase {
  faqs: FAQ[];
  services: ServiceItem[];
  extraInfo: string;
}

export interface BotCustomization {
  botName: string;
  personality: string;
  primaryColor: string;
  welcomeMessage: string;
  fallbackMessage: string;
  language: string;
}

export interface Chatbot {
  id: string;
  businessInfo: BusinessInfo;
  knowledgeBase: KnowledgeBase;
  customization: BotCustomization;
  status: "active" | "inactive";
  createdAt: string;
  conversations: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}
