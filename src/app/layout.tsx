import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexBot - AI Chatbot Builder for Your Business",
  description: "Build a custom AI chatbot for your business in minutes. No coding required. Give your customers 24/7 support.",
  keywords: "AI chatbot, chatbot builder, customer support, AI assistant, business chatbot",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
