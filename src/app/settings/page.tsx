"use client";

import { User, Bell, Shield } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-black flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <header className="border-b border-white/5 p-6">
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-muted text-sm mt-1">Manage your account and preferences.</p>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl space-y-6">
            <div className="gradient-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-white">Profile</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-muted mb-1">Full Name</label>
                  <input className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1">Email</label>
                  <input className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="your@email.com" />
                </div>
              </div>
            </div>

            <div className="gradient-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
              </div>
              <div className="space-y-3">
                {["Email notifications", "Weekly analytics report", "New feature updates"].map((n) => (
                  <label key={n} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-primary" defaultChecked />
                    <span className="text-white text-sm">{n}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="gradient-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-white">API Key</h3>
              </div>
              <p className="text-muted text-sm mb-4">Your Gemini API key for chatbot responses.</p>
              <input
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors font-mono text-sm"
                placeholder="NEXT_PUBLIC_GEMINI_API_KEY"
                defaultValue={process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
