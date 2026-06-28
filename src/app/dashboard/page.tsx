"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Plus, Power, Trash2, MessageCircle } from "lucide-react";
import Link from "next/link";
import DashboardSidebar from "@/components/DashboardSidebar";
import { getChatbots, deleteChatbot, saveChatbot } from "@/lib/store";
import { Chatbot } from "@/lib/types";
import { DEMO_CHATBOT } from "@/lib/demoData";

export default function DashboardPage() {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [userName, setUserName] = useState("");
  const [showNameModal, setShowNameModal] = useState(true);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("nexbot-user");
    if (stored) {
      setUserName(stored);
      setShowNameModal(false);
    }
    const bots = getChatbots();
    if (bots.length === 0) {
      saveChatbot(DEMO_CHATBOT);
    }
    setChatbots(getChatbots());
  }, []);

  const handleLogin = () => {
    if (!nameInput.trim()) return;
    localStorage.setItem("nexbot-user", nameInput.trim());
    setUserName(nameInput.trim());
    setShowNameModal(false);
  };

  const handleDelete = (id: string) => {
    deleteChatbot(id);
    setChatbots(getChatbots());
  };

  const handleToggleStatus = (bot: Chatbot) => {
    bot.status = bot.status === "active" ? "inactive" : "active";
    saveChatbot(bot);
    setChatbots(getChatbots());
  };

  if (showNameModal) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="gradient-card rounded-2xl p-8 w-full max-w-md mx-4 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to NexBot</h2>
          <p className="text-muted text-sm mb-6">Enter your name to get started</p>
          <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Your name"
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors mb-4"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            disabled={!nameInput.trim()}
            className="w-full bg-primary text-black px-6 py-3 rounded-xl font-semibold disabled:opacity-50 transition-all"
          >
            Get Started
          </motion.button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <header className="border-b border-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">My Chatbots</h1>
              <p className="text-muted text-sm mt-1">Welcome back, {userName}</p>
            </div>
            <Link href="/builder">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-black px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,255,209,0.3)] transition-all"
              >
                <Plus className="w-4 h-4" />
                Create New Bot
              </motion.button>
            </Link>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          {chatbots.length === 0 ? (
            <div className="text-center py-20">
              <Bot className="w-16 h-16 text-muted mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No chatbots yet</h3>
              <p className="text-muted mb-6">Create your first AI chatbot and start automating customer support.</p>
              <Link href="/builder">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary text-black px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create Your First Bot
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chatbots.map((bot, i) => (
                <motion.div
                  key={bot.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="gradient-card rounded-2xl p-6 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${bot.customization.primaryColor}20` }}>
                        <Bot className="w-6 h-6" style={{ color: bot.customization.primaryColor }} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{bot.customization.botName}</h3>
                        <p className="text-muted text-xs">{bot.businessInfo.type}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        bot.status === "active"
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "bg-white/5 text-muted border border-white/10"
                      }`}
                    >
                      {bot.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted mb-4">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {bot.conversations} conversations
                    </span>
                    <span>Since {bot.createdAt}</span>
                  </div>
                  <p className="text-muted text-sm mb-4 line-clamp-2">{bot.businessInfo.name}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleStatus(bot)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                        bot.status === "active"
                          ? "border-primary/30 text-primary hover:bg-primary/10"
                          : "border-white/10 text-muted hover:text-white"
                      }`}
                    >
                      <Power className="w-3 h-3 inline mr-1" />
                      {bot.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleDelete(bot.id)}
                      className="py-2 px-3 rounded-lg text-xs font-medium border border-secondary/30 text-secondary hover:bg-secondary/10 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
