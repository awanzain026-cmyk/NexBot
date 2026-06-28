"use client";

import { motion } from "framer-motion";
import { BusinessInfo } from "@/lib/types";

interface Props {
  data: BusinessInfo;
  onChange: (data: BusinessInfo) => void;
}

export default function Step1BusinessInfo({ data, onChange }: Props) {
  const update = (key: keyof BusinessInfo, value: string) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Business Information</h2>
        <p className="text-muted text-sm">Tell us about your business so your AI chatbot can represent it perfectly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm text-muted mb-1.5">Business Name *</label>
          <input
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Ahmad's Restaurant"
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1.5">Business Type *</label>
          <select
            value={data.type}
            onChange={(e) => update("type", e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
          >
            <option value="">Select type</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Clinic">Clinic</option>
            <option value="Retail Shop">Retail Shop</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Hotel">Hotel</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-muted mb-1.5">Phone Number *</label>
          <input
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+92-300-1234567"
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-muted mb-1.5">Business Description *</label>
          <textarea
            value={data.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Describe your business, what you offer, and what makes you special..."
            rows={3}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1.5">Opening Hours *</label>
          <input
            value={data.openingHours}
            onChange={(e) => update("openingHours", e.target.value)}
            placeholder="e.g. Mon-Sun: 11AM - 11PM"
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-muted mb-1.5">Website URL</label>
          <input
            value={data.website}
            onChange={(e) => update("website", e.target.value)}
            placeholder="https://yourbusiness.com"
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-muted mb-1.5">Address / Location *</label>
          <input
            value={data.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="e.g. Block 5, Clifton, Karachi"
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>
    </motion.div>
  );
}
