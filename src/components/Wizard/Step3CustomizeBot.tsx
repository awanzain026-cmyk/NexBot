"use client";

import { motion } from "framer-motion";
import { BotCustomization } from "@/lib/types";

interface Props {
  data: BotCustomization;
  onChange: (data: BotCustomization) => void;
}

const COLORS = [
  { name: "Cyan", value: "#00FFD1" },
  { name: "Coral", value: "#FF6B6B" },
  { name: "Teal", value: "#659287" },
  { name: "Green", value: "#88BDA4" },
  { name: "Sage", value: "#B1D3B9" },
  { name: "Mint", value: "#E6F2DD" },
];

const BOT_NAMES = ["Aria", "Max", "Zara", "Nova", "Leo", "Ella", "Kai", "Mila"];

export default function Step3CustomizeBot({ data, onChange }: Props) {
  const update = (key: keyof BotCustomization, value: string) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Customize Your Bot</h2>
        <p className="text-muted text-sm">Give your chatbot a personality that matches your brand.</p>
      </div>

      <div>
        <label className="block text-sm text-muted mb-1.5">Bot Name *</label>
        <div className="flex gap-2 flex-wrap mb-2">
          {BOT_NAMES.map((name) => (
            <button
              key={name}
              onClick={() => update("botName", name)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                data.botName === name
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-white/10 text-muted hover:border-white/20"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <input
          value={data.botName}
          onChange={(e) => update("botName", e.target.value)}
          placeholder="Or type a custom name"
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm text-muted mb-1.5">Bot Personality *</label>
        <div className="grid grid-cols-2 gap-3">
          {["Friendly", "Professional", "Casual", "Formal"].map((p) => (
            <button
              key={p}
              onClick={() => update("personality", p)}
              className={`px-4 py-3 rounded-xl text-sm border transition-all ${
                data.personality === p
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-white/10 text-muted hover:border-white/20 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-muted mb-1.5">Primary Color</label>
        <div className="flex gap-3">
          {COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => update("primaryColor", c.value)}
              className={`w-10 h-10 rounded-xl border-2 transition-all ${
                data.primaryColor === c.value ? "border-white scale-110" : "border-transparent"
              }`}
              style={{ backgroundColor: c.value }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-muted mb-1.5">Welcome Message *</label>
        <textarea
          value={data.welcomeMessage}
          onChange={(e) => update("welcomeMessage", e.target.value)}
          rows={3}
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-sm text-muted mb-1.5">Fallback Message</label>
        <textarea
          value={data.fallbackMessage}
          onChange={(e) => update("fallbackMessage", e.target.value)}
          rows={2}
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-sm text-muted mb-1.5">Language</label>
        <div className="flex gap-3">
          {["English", "Urdu", "Both"].map((l) => (
            <button
              key={l}
              onClick={() => update("language", l)}
              className={`px-4 py-2 rounded-xl text-sm border transition-all ${
                data.language === l
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-white/10 text-muted hover:border-white/20"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
