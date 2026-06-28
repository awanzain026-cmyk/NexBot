"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Download } from "lucide-react";
import { BusinessInfo, KnowledgeBase, BotCustomization, ChatMessage } from "@/lib/types";
import { getGeminiResponse } from "@/lib/gemini";
import { generateEmbedCode } from "@/lib/gemini";
import ChatbotWidget from "@/components/ChatbotWidget";

interface Props {
  business: BusinessInfo;
  knowledge: KnowledgeBase;
  bot: BotCustomization;
}

export default function Step4PreviewDeploy({ business, knowledge, bot }: Props) {
  const [copied, setCopied] = useState(false);

  const embedCode = generateEmbedCode({
    id: "preview",
    businessInfo: business,
    knowledgeBase: knowledge,
    customization: bot,
  });

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = async (message: string, history: ChatMessage[]): Promise<string> => {
    return getGeminiResponse(message, business, knowledge, bot, history);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Preview & Deploy</h2>
        <p className="text-muted text-sm">Test your chatbot and get the embed code for your website.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="gradient-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Chatbot Preview</h3>
            <p className="text-muted text-sm mb-4">Test your chatbot by clicking the chat bubble in the bottom-right corner of the preview area below.</p>
            <div className="bg-black/50 rounded-xl h-[400px] relative overflow-hidden border border-white/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted text-sm mb-2">👇 Click the chat bubble below</p>
                  <p className="text-muted text-xs">to test your bot</p>
                </div>
              </div>
              <ChatbotWidget
                business={business}
                bot={bot}
                onSendMessage={handleSend}
              />
            </div>
          </div>

          <div className="gradient-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Bot Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted">Bot Name:</span><span className="text-white">{bot.botName}</span></div>
              <div className="flex justify-between"><span className="text-muted">Personality:</span><span className="text-white">{bot.personality}</span></div>
              <div className="flex justify-between"><span className="text-muted">Language:</span><span className="text-white">{bot.language}</span></div>
              <div className="flex justify-between"><span className="text-muted">FAQs:</span><span className="text-white">{knowledge.faqs.length}</span></div>
              <div className="flex justify-between"><span className="text-muted">Services:</span><span className="text-white">{knowledge.services.length}</span></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="gradient-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Embed Code</h3>
            <p className="text-muted text-sm mb-4">Copy this code and paste it right before the closing &lt;/body&gt; tag on your website.</p>
            <div className="bg-black rounded-xl p-4 overflow-x-auto">
              <pre className="text-xs text-muted whitespace-pre-wrap break-all">{embedCode}</pre>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={copyCode}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-black px-6 py-3 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,255,209,0.3)] transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Embed Code
                </>
              )}
            </motion.button>
          </div>

          <div className="gradient-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent4/20 flex items-center justify-center">
                <Download className="w-5 h-5 text-accent4" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Ready to Go Live</h3>
                <p className="text-muted text-xs">Your chatbot is configured and ready to deploy.</p>
              </div>
            </div>
            <div className="bg-black/50 rounded-xl p-4 space-y-2 text-sm">
              <p className="text-accent2">✓ Business info configured</p>
              <p className="text-accent2">✓ {knowledge.faqs.length} FAQs added</p>
              <p className="text-accent2">✓ {knowledge.services.length} services added</p>
              <p className="text-accent2">✓ Bot personality set to {bot.personality}</p>
              <p className="text-accent2">✓ Embed code ready</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
