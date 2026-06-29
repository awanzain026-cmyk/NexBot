"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Palette, Code, BarChart3, Globe, Shield, Star, ChevronRight,
  ArrowRight, Sparkles, MessageCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import Hero3D from "@/components/Hero3D";
import FeatureCard from "@/components/FeatureCard";
import PricingCard from "@/components/PricingCard";
import ChatbotWidget from "@/components/ChatbotWidget";
import { DEMO_CHATBOT } from "@/lib/demoData";
import { getChatbotResponse } from "@/lib/gemini";
import { ChatMessage } from "@/lib/types";

const features = [
  { icon: Brain, title: "AI-Powered Responses", description: "Natural language understanding that answers customer questions accurately using your business data." },
  { icon: Palette, title: "Custom Personality & Tone", description: "Choose from Friendly, Professional, Casual or Formal — match your brand voice perfectly." },
  { icon: Code, title: "Website Embed Code", description: "One line of JavaScript. Paste it anywhere — Shopify, WordPress, Wix, or custom sites." },
  { icon: BarChart3, title: "Analytics Dashboard", description: "Track conversations, popular questions, satisfaction scores, and peak hours." },
  { icon: Globe, title: "Multi-Language Support", description: "English, Urdu, or both. Your chatbot speaks your customers' language." },
  { icon: Shield, title: "Security Guardrails", description: "Built-in content filtering. Your bot only answers business-related questions safely." },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for small businesses getting started with AI.",
    features: [
      "1 chatbot",
      "Up to 500 conversations/mo",
      "Basic knowledge base",
      "Website embed",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "$79",
    description: "For growing businesses that need advanced features.",
    features: [
      "3 chatbots",
      "Up to 5,000 conversations/mo",
      "Full knowledge base",
      "Custom personality",
      "Analytics dashboard",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    description: "For large businesses with high-volume needs.",
    features: [
      "Unlimited chatbots",
      "Unlimited conversations",
      "Advanced knowledge base",
      "Multi-language support",
      "Custom integrations",
      "Dedicated account manager",
      "99.9% uptime SLA",
    ],
  },
];

const testimonials = [
  {
    name: "Ahmad Raza",
    business: "Ahmad's Restaurant, Karachi",
    text: "NexBot cut our WhatsApp queries by 80%. Customers now get menu prices, hours, and reservation info instantly. Best $150 we ever spent.",
    rating: 5,
  },
  {
    name: "Dr. Fatima Khan",
    business: "City Clinic, Lahore",
    text: "Patients book appointments automatically through our website now. The bot handles 50+ questions daily without any human intervention.",
    rating: 5,
  },
  {
    name: "Usman Malik",
    business: "Metro Electronics, Islamabad",
    text: "We were skeptical about AI, but NexBot proved us wrong. Product inquiries, stock checks, store hours — it handles everything. Best investment this year.",
    rating: 5,
  },
];

const fakeCompanies = ["TechVista", "GreenLeaf", "UrbanBite", "CloudNine", "SilverLining", "BrightPath"];

export default function LandingPage() {
  const [showDemo, setShowDemo] = useState(false);

  const handleDemoSend = async (message: string, history: ChatMessage[]) => {
    return getChatbotResponse(
      message,
      DEMO_CHATBOT.businessInfo,
      DEMO_CHATBOT.knowledgeBase,
      DEMO_CHATBOT.customization,
      history
    );
  };

  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />

      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-primary text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                AI Chatbot Builder for Businesses
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.9] tracking-tight mb-6">
                Build Your<br />
                AI Chatbot<br />
                in{" "}
                <span className="text-gradient">60 Seconds</span>
              </h1>
              <p className="text-lg text-muted max-w-xl leading-relaxed mb-8">
                Give your business a 24/7 AI assistant that knows everything about you — without writing a single line of code.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/builder">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group bg-primary text-black px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 hover:shadow-[0_0_40px_rgba(0,255,209,0.4)] transition-all"
                  >
                    Start Building Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </a>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowDemo(true)}
                  className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 hover:bg-white/5 transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-primary" />
                  See Live Demo
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <Hero3D />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-white font-semibold text-lg">Trusted by 500+ businesses</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {fakeCompanies.map((name) => (
              <motion.div
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-muted font-semibold text-lg tracking-wider"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 gradient-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="section-number">HOW</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white -mt-8 relative z-10">
              How It Works
            </h2>
            <p className="text-muted mt-4 max-w-xl mx-auto">
              Get your AI chatbot live in 3 simple steps. No technical skills required.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                num: "01",
                title: "Enter Your Business Info",
                desc: "Tell your bot your business name, hours, location, and FAQ. Import your menu or services list.",
                img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
              },
              {
                num: "02",
                title: "Customize Personality",
                desc: "Name your bot, choose its personality, pick colors, and set the welcome message.",
                img: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?w=600&q=80",
              },
              {
                num: "03",
                title: "Copy & Paste to Go Live",
                desc: "Get your embed code, paste it on your website, and your AI assistant is live 24/7.",
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="gradient-card rounded-2xl overflow-hidden">
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src={step.img}
                      alt={step.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-5xl font-bold text-primary/20 mb-2">{step.num}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="section-number">FEAT</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white -mt-8 relative z-10">
              Powerful Features
            </h2>
            <p className="text-muted mt-4 max-w-xl mx-auto">
              Everything you need to provide instant customer support with AI.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 gradient-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="section-number">PRICE</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white -mt-8 relative z-10">
              Simple Pricing
            </h2>
            <p className="text-muted mt-4 max-w-xl mx-auto">
              Start free. Upgrade as you grow. No hidden fees.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <PricingCard key={plan.name} {...plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="section-number">LOVE</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white -mt-8 relative z-10">
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="gradient-card rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.business}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 gradient-mesh">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Your AI Chatbot?
            </h2>
            <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
              Join 500+ businesses that never miss a customer question. Start free, no credit card required.
            </p>
            <a href="/builder">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-primary text-black px-10 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-2 hover:shadow-[0_0_40px_rgba(0,255,209,0.4)] transition-all"
              >
                Build Your Chatbot Now
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {showDemo && (
          <ChatbotWidget
            business={DEMO_CHATBOT.businessInfo}
            bot={DEMO_CHATBOT.customization}
            onSendMessage={handleDemoSend}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
