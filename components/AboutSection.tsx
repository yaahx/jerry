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
    <section id="about" className="py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Story */}
        <div className="lg:col-span-7 glass-panel p-8 sm:p-10 border border-white/10">
          <h3 className="font-display font-black text-3xl sm:text-4xl text-white mb-6 uppercase tracking-tight">
            The Story & Sound
          </h3>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed mb-10 whitespace-pre-line font-normal">
            {bio}
          </p>

          <div className="grid grid-cols-3 gap-5">
            <div className="p-5 bg-white/5 border border-white/10 text-center">
              <Sparkles className="w-6 h-6 text-[#f36c21] mx-auto mb-2" />
              <div className="font-display font-black text-3xl text-[#ff9f43]">100%</div>
              <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">Independent</div>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 text-center">
              <Disc className="w-6 h-6 text-[#f36c21] mx-auto mb-2" />
              <div className="font-display font-black text-3xl text-[#ff9f43]">4+</div>
              <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">Releases</div>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 text-center">
              <Globe className="w-6 h-6 text-[#f36c21] mx-auto mb-2" />
              <div className="font-display font-black text-3xl text-[#ff9f43]">Global</div>
              <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">Shipping</div>
            </div>
          </div>
        </div>

        {/* Guestbook / Contact Form - Sharp */}
        <div id="contact" className="lg:col-span-5 glass-panel p-8 sm:p-10 border border-white/10">
          <h3 className="font-display font-black text-3xl sm:text-4xl text-white mb-3 uppercase tracking-tight">
            Get In Touch
          </h3>
          <p className="text-stone-300 text-sm sm:text-base mb-8 leading-relaxed font-normal">
            Direct channel for booking dates, beat licenses, merchandise queries, or collaborations:
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Hunter"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-stone-600 text-sm sm:text-base focus:outline-none focus:border-[#f36c21] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-stone-600 text-sm sm:text-base focus:outline-none focus:border-[#f36c21] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                Inquiry Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 bg-[#16120e] border border-white/15 text-white text-sm sm:text-base focus:outline-none focus:border-[#f36c21] transition-all"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Live Booking">Live Performance / Booking</option>
                <option value="Beat License / Custom Production">Beat Licensing & Stems</option>
                <option value="Merch Order Question">Merchandise / Order Question</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Write your message here..."
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white placeholder-stone-600 text-sm sm:text-base focus:outline-none focus:border-[#f36c21] transition-all resize-none font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#f36c21] hover:bg-[#ff7b34] text-white font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all shadow-[0_4px_25px_rgba(243,108,33,0.45)] hover:-translate-y-0.5"
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
