'use client';

import React, { useState } from 'react';
import { Send, Globe, Disc, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  bio: string;
  onSendMessage: (msg: { name: string; email: string; type: string; message: string }) => void;
  onToast: (msg: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  bio,
  onSendMessage,
  onToast,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      onToast('Please fill in all required fields');
      return;
    }
    onSendMessage({ name, email, type, message });
    setName('');
    setEmail('');
    setMessage('');
    onToast('Your message has been delivered to the artist!');
  };

  return (
    <section id="about" className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Story */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-8">
          <h3 className="font-display font-extrabold text-2xl text-white mb-4">
            The Story & Sound
          </h3>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8 whitespace-pre-line">
            {bio}
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
              <Sparkles className="w-5 h-5 text-[#f36c21] mx-auto mb-1.5" />
              <div className="font-display font-black text-2xl text-[#ff9f43]">100%</div>
              <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Independent</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
              <Disc className="w-5 h-5 text-[#f36c21] mx-auto mb-1.5" />
              <div className="font-display font-black text-2xl text-[#ff9f43]">4+</div>
              <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Releases</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
              <Globe className="w-5 h-5 text-[#f36c21] mx-auto mb-1.5" />
              <div className="font-display font-black text-2xl text-[#ff9f43]">Global</div>
              <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Shipping</div>
            </div>
          </div>
        </div>

        {/* Guestbook / Contact Form */}
        <div id="contact" className="lg:col-span-5 glass-panel rounded-2xl p-8">
          <h3 className="font-display font-extrabold text-2xl text-white mb-2">
            Get In Touch
          </h3>
          <p className="text-stone-400 text-xs mb-6 leading-relaxed">
            Direct channel for booking dates, beat licenses, merchandise queries, or collaborations:
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Hunter"
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-stone-600 text-sm focus:outline-none focus:border-[#f36c21] transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-stone-600 text-sm focus:outline-none focus:border-[#f36c21] transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                Inquiry Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#16120e] border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21] transition-all"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Live Booking">Live Performance / Booking</option>
                <option value="Beat License / Custom Production">Beat Licensing & Stems</option>
                <option value="Merch Order Question">Merchandise / Order Question</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Write your message here..."
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-stone-600 text-sm focus:outline-none focus:border-[#f36c21] transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#f36c21] to-[#d9531e] text-white font-bold text-sm hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(243,108,33,0.4)]"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
