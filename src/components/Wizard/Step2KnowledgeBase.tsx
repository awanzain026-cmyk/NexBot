"use client";

import { motion } from "framer-motion";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { KnowledgeBase } from "@/lib/types";
import { SAMPLE_FAQS, SAMPLE_SERVICES } from "@/lib/demoData";

interface Props {
  data: KnowledgeBase;
  onChange: (data: KnowledgeBase) => void;
}

export default function Step2KnowledgeBase({ data, onChange }: Props) {
  const addFaq = () => {
    onChange({ ...data, faqs: [...data.faqs, { question: "", answer: "" }] });
  };

  const updateFaq = (index: number, key: "question" | "answer", value: string) => {
    const faqs = [...data.faqs];
    faqs[index] = { ...faqs[index], [key]: value };
    onChange({ ...data, faqs });
  };

  const removeFaq = (index: number) => {
    onChange({ ...data, faqs: data.faqs.filter((_, i) => i !== index) });
  };

  const addService = () => {
    onChange({ ...data, services: [...data.services, { name: "", description: "", price: "" }] });
  };

  const updateService = (index: number, key: "name" | "description" | "price", value: string) => {
    const services = [...data.services];
    services[index] = { ...services[index], [key]: value };
    onChange({ ...data, services });
  };

  const removeService = (index: number) => {
    onChange({ ...data, services: data.services.filter((_, i) => i !== index) });
  };

  const autoFill = () => {
    onChange({
      faqs: SAMPLE_FAQS,
      services: SAMPLE_SERVICES,
      extraInfo: "We also cater for events and parties. Our banquet hall can accommodate up to 100 guests.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Knowledge Base</h2>
          <p className="text-muted text-sm">Teach your chatbot everything it needs to know about your business.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={autoFill}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/30 text-primary text-sm hover:bg-primary/10 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Auto-fill Sample
        </motion.button>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Frequently Asked Questions</h3>
          <button onClick={addFaq} className="flex items-center gap-1 text-primary text-sm hover:underline">
            <Plus className="w-4 h-4" /> Add FAQ
          </button>
        </div>
        <div className="space-y-3">
          {data.faqs.map((faq, i) => (
            <div key={i} className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">FAQ #{i + 1}</span>
                <button onClick={() => removeFaq(i)} className="text-secondary/60 hover:text-secondary transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <input
                value={faq.question}
                onChange={(e) => updateFaq(i, "question", e.target.value)}
                placeholder="Question"
                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-muted focus:outline-none focus:border-primary/50"
              />
              <textarea
                value={faq.answer}
                onChange={(e) => updateFaq(i, "answer", e.target.value)}
                placeholder="Answer"
                rows={2}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-muted focus:outline-none focus:border-primary/50 resize-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Services / Products</h3>
          <button onClick={addService} className="flex items-center gap-1 text-primary text-sm hover:underline">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
        <div className="space-y-3">
          {data.services.map((svc, i) => (
            <div key={i} className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Item #{i + 1}</span>
                <button onClick={() => removeService(i)} className="text-secondary/60 hover:text-secondary transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={svc.name}
                  onChange={(e) => updateService(i, "name", e.target.value)}
                  placeholder="Item name"
                  className="col-span-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-muted focus:outline-none focus:border-primary/50"
                />
                <input
                  value={svc.price}
                  onChange={(e) => updateService(i, "price", e.target.value)}
                  placeholder="Price"
                  className="col-span-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-muted focus:outline-none focus:border-primary/50"
                />
              </div>
              <textarea
                value={svc.description}
                onChange={(e) => updateService(i, "description", e.target.value)}
                placeholder="Description"
                rows={2}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-muted focus:outline-none focus:border-primary/50 resize-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-muted mb-1.5">Anything else your bot should know?</label>
        <textarea
          value={data.extraInfo}
          onChange={(e) => onChange({ ...data, extraInfo: e.target.value })}
          placeholder="Add any additional information, policies, or special instructions..."
          rows={4}
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors resize-none"
        />
      </div>
    </motion.div>
  );
}
