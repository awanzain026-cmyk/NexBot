"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bot, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-white">
              Nex<span className="text-primary">Bot</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-muted hover:text-white transition-colors text-sm">Home</Link>
            <Link href="/dashboard" className="text-muted hover:text-white transition-colors text-sm">Dashboard</Link>
            <Link href="/builder" className="text-muted hover:text-white transition-colors text-sm">Builder</Link>
            <Link href="/analytics" className="text-muted hover:text-white transition-colors text-sm">Analytics</Link>
            <Link href="/builder">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-black px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,255,209,0.3)] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Start Building
              </motion.button>
            </Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-black/95"
          >
            <div className="px-4 py-4 space-y-3">
              <Link href="/" className="block text-muted hover:text-white py-2" onClick={() => setOpen(false)}>Home</Link>
              <Link href="/dashboard" className="block text-muted hover:text-white py-2" onClick={() => setOpen(false)}>Dashboard</Link>
              <Link href="/builder" className="block text-muted hover:text-white py-2" onClick={() => setOpen(false)}>Builder</Link>
              <Link href="/analytics" className="block text-muted hover:text-white py-2" onClick={() => setOpen(false)}>Analytics</Link>
              <Link href="/builder" onClick={() => setOpen(false)}>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-black px-5 py-3 rounded-xl text-sm font-semibold"
                >
                  Start Building Free
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
