"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { ChatMessage, BusinessInfo, BotCustomization } from "@/lib/types";

interface ChatbotWidgetProps {
  business: BusinessInfo;
  bot: BotCustomization;
  onSendMessage?: (message: string, history: ChatMessage[]) => Promise<string>;
}

export default function ChatbotWidget({ business, bot, onSendMessage }: ChatbotWidgetProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      content: bot.welcomeMessage,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      let response: string;
      if (onSendMessage) {
        response = await onSendMessage(input.trim(), [...messages, userMsg]);
      } else {
        await new Promise(r => setTimeout(r, 1000));
        response = `Hello! Thanks for your interest in ${business.name}. For details about your query, please visit our website or call us at ${business.phone}.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "bot",
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "bot",
        content: bot.fallbackMessage,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center shadow-lg z-50 hover:shadow-[0_0_30px_rgba(0,255,209,0.4)] transition-shadow"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-120px)] rounded-2xl overflow-hidden z-50 flex flex-col"
            style={{ border: `1px solid ${bot.primaryColor}40`, boxShadow: `0 0 40px ${bot.primaryColor}20` }}
          >
            <div className="bg-card p-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${bot.primaryColor}20` }}>
                  <Bot className="w-5 h-5" style={{ color: bot.primaryColor }} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{bot.botName}</p>
                  <p className="text-muted text-xs">{business.name}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-card/50" style={{ background: "#0A0A0A" }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "text-black"
                        : "text-white border border-white/5"
                    }`}
                    style={{
                      backgroundColor: msg.role === "user" ? bot.primaryColor : "#0D0D0D",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-card rounded-2xl px-4 py-3 text-white border border-white/5">
                    <div className="flex gap-1.5">
                      <span className="typing-dot w-2 h-2 rounded-full bg-primary/60 inline-block" />
                      <span className="typing-dot w-2 h-2 rounded-full bg-primary/60 inline-block" />
                      <span className="typing-dot w-2 h-2 rounded-full bg-primary/60 inline-block" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-white/5 bg-card">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-30"
                  style={{ backgroundColor: bot.primaryColor }}
                >
                  <Send className="w-4 h-4 text-black" />
                </motion.button>
              </div>
              <p className="text-[10px] text-center text-muted mt-2">
                Powered by <span className="text-primary">NexBot</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
