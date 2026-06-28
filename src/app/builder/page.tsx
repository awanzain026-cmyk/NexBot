"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowLeft, ArrowRight, Sparkles, Bot } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Step1BusinessInfo from "@/components/Wizard/Step1BusinessInfo";
import Step2KnowledgeBase from "@/components/Wizard/Step2KnowledgeBase";
import Step3CustomizeBot from "@/components/Wizard/Step3CustomizeBot";
import Step4PreviewDeploy from "@/components/Wizard/Step4PreviewDeploy";
import { BusinessInfo, KnowledgeBase, BotCustomization } from "@/lib/types";
import { createChatbot, saveChatbot } from "@/lib/store";

const STEPS = ["Business Info", "Knowledge Base", "Customize", "Preview & Deploy"];

const defaultBusiness: BusinessInfo = {
  name: "",
  type: "",
  description: "",
  openingHours: "",
  address: "",
  phone: "",
  website: "",
};

const defaultKnowledge: KnowledgeBase = {
  faqs: [],
  services: [],
  extraInfo: "",
};

const defaultBot: BotCustomization = {
  botName: "Aria",
  personality: "Friendly",
  primaryColor: "#00FFD1",
  welcomeMessage: "Hello! 👋 I'm your virtual assistant. How can I help you today?",
  fallbackMessage: "Great question! For more details, please contact us directly.",
  language: "English",
};

export default function BuilderPage() {
  const [step, setStep] = useState(0);
  const [business, setBusiness] = useState<BusinessInfo>(defaultBusiness);
  const [knowledge, setKnowledge] = useState<KnowledgeBase>(defaultKnowledge);
  const [bot, setBot] = useState<BotCustomization>(defaultBot);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const canProceed = () => {
    if (step === 0) return business.name && business.type && business.phone && business.description && business.openingHours;
    if (step === 1) return true;
    if (step === 2) return bot.botName && bot.welcomeMessage;
    return true;
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSave = () => {
    const chatbot = createChatbot(business, knowledge, bot);
    saveChatbot(chatbot);
    setSaved(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Bot className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-white">Build Your Chatbot</h1>
            <p className="text-muted text-sm">Follow the steps below to create your custom AI chatbot.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
                  i === step
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : i < step
                    ? "bg-accent2/10 text-accent2"
                    : "text-muted border border-white/5"
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-xs">{i + 1}</span>}
                {s}
              </div>
              {i < 3 && <div className="w-8 h-px bg-white/10" />}
            </div>
          ))}
        </div>

        <div className="gradient-card rounded-2xl p-6 md:p-8 mb-6 min-h-[500px]">
          <AnimatePresence mode="wait">
            {step === 0 && <Step1BusinessInfo key="s1" data={business} onChange={setBusiness} />}
            {step === 1 && <Step2KnowledgeBase key="s2" data={knowledge} onChange={setKnowledge} />}
            {step === 2 && <Step3CustomizeBot key="s3" data={bot} onChange={setBot} />}
            {step === 3 && <Step4PreviewDeploy key="s4" business={business} knowledge={knowledge} bot={bot} />}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={prevStep}
            disabled={step === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-muted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </motion.button>

          {step < 3 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_30px_rgba(0,255,209,0.3)]"
            >
              {step === 2 ? "Preview" : "Next Step"}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              disabled={saved}
              className="flex items-center gap-2 bg-primary text-black px-8 py-3 rounded-xl font-semibold hover:shadow-[0_0_40px_rgba(0,255,209,0.4)] transition-all disabled:opacity-70"
            >
              {saved ? (
                <>
                  <Check className="w-5 h-5" /> Saved! Redirecting...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Save & Go Live
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </main>
  );
}
