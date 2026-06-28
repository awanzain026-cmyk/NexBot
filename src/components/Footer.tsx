"use client";

import { Bot } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-white">
                Nex<span className="text-primary">Bot</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              AI chatbot builder for businesses. Give your customers 24/7 support without writing code.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted hover:text-primary text-sm transition-colors">Home</Link></li>
              <li><Link href="/builder" className="text-muted hover:text-primary text-sm transition-colors">Builder</Link></li>
              <li><Link href="/dashboard" className="text-muted hover:text-primary text-sm transition-colors">Dashboard</Link></li>
              <li><Link href="/analytics" className="text-muted hover:text-primary text-sm transition-colors">Analytics</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2">
              <li><span className="text-muted text-sm">About</span></li>
              <li><span className="text-muted text-sm">Blog</span></li>
              <li><span className="text-muted text-sm">Careers</span></li>
              <li><span className="text-muted text-sm">Contact</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              <li><span className="text-muted text-sm">Privacy Policy</span></li>
              <li><span className="text-muted text-sm">Terms of Service</span></li>
              <li><span className="text-muted text-sm">Cookie Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-muted text-sm">&copy; {new Date().getFullYear()} NexBot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
