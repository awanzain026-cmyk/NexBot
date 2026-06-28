"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MessageCircle, TrendingUp, Star, HelpCircle } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { SAMPLE_ANALYTICS } from "@/lib/demoData";

export default function AnalyticsPage() {
  const stats = [
    {
      label: "Weekly Conversations",
      value: SAMPLE_ANALYTICS.weeklyConversations,
      icon: MessageCircle,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Satisfaction Score",
      value: `${SAMPLE_ANALYTICS.satisfactionScore}%`,
      icon: Star,
      color: "text-accent4",
      bg: "bg-accent4/10",
    },
    {
      label: "Total Conversations",
      value: SAMPLE_ANALYTICS.totalConversations,
      icon: TrendingUp,
      color: "text-accent2",
      bg: "bg-accent2/10",
    },
    {
      label: "FAQs Answered",
      value: SAMPLE_ANALYTICS.mostAskedQuestions.reduce((a, b) => a + b.count, 0),
      icon: HelpCircle,
      color: "text-accent3",
      bg: "bg-accent3/10",
    },
  ];

  return (
    <main className="min-h-screen bg-black flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <header className="border-b border-white/5 p-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Analytics</h1>
            <p className="text-muted text-sm mt-1">Track your chatbot performance and customer interactions.</p>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="gradient-card rounded-2xl p-5"
                >
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-muted text-sm mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="gradient-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Peak Conversation Hours</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={SAMPLE_ANALYTICS.peakHours}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="hour" stroke="#888888" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#888888" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0D0D0D",
                      border: "1px solid rgba(0,255,209,0.3)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="conversations" fill="#00FFD1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="gradient-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Most Asked Questions</h3>
              <div className="space-y-4">
                {SAMPLE_ANALYTICS.mostAskedQuestions.map((q, i) => (
                  <div key={q.question} className="flex items-center gap-4">
                    <span className="text-muted text-sm w-6 font-mono">{i + 1}.</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-white text-sm">{q.question}</span>
                        <span className="text-primary text-sm font-mono">{q.count}</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(q.count / SAMPLE_ANALYTICS.mostAskedQuestions[0].count) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          className="h-full rounded-full"
                          style={{
                            background: "linear-gradient(90deg, #00FFD1, #FF6B6B)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
