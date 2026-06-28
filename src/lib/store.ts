import { Chatbot, BusinessInfo, KnowledgeBase, BotCustomization } from "./types";

const STORAGE_KEY = "nexbot-chatbots";

export function getChatbots(): Chatbot[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveChatbot(chatbot: Chatbot): void {
  const chatbots = getChatbots();
  const existingIndex = chatbots.findIndex(c => c.id === chatbot.id);
  if (existingIndex >= 0) {
    chatbots[existingIndex] = chatbot;
  } else {
    chatbots.push(chatbot);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chatbots));
}

export function deleteChatbot(id: string): void {
  const chatbots = getChatbots().filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chatbots));
}

export function getChatbotById(id: string): Chatbot | undefined {
  return getChatbots().find(c => c.id === id);
}

export function generateId(): string {
  return `nexbot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function createChatbot(
  businessInfo: BusinessInfo,
  knowledgeBase: KnowledgeBase,
  customization: BotCustomization
): Chatbot {
  return {
    id: generateId(),
    businessInfo,
    knowledgeBase,
    customization,
    status: "active",
    createdAt: new Date().toISOString().split("T")[0],
    conversations: 0,
  };
}
