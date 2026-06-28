"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  index: number;
}

export default function PricingCard({ name, price, description, features, highlighted, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="relative"
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black px-6 py-1 rounded-full text-sm font-semibold z-10">
          Most Popular
        </div>
      )}
      <div className={`gradient-card rounded-2xl p-8 h-full ${highlighted ? 'border-primary/50 shadow-[0_0_40px_rgba(0,255,209,0.15)]' : ''} 
        transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(0,255,209,0.1)]`}>
        <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
        <p className="text-muted text-sm mb-4">{description}</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-muted ml-1">/mo</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 mb-8
            ${highlighted
              ? 'bg-primary text-black hover:shadow-[0_0_30px_rgba(0,255,209,0.4)]'
              : 'border border-primary/30 text-primary hover:bg-primary/10'
            }`}
        >
          Get Started
        </motion.button>
        <ul className="space-y-3">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${highlighted ? 'text-primary' : 'text-accent1'}`} />
              <span className="text-muted">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
