"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export default function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group perspective-1000"
    >
      <div className="tilt-card gradient-card rounded-2xl p-8 h-full cursor-default
        transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_60px_rgba(0,255,209,0.15)]">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6
          group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-muted leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
