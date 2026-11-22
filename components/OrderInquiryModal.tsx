'use client';

import React, { useState } from 'react';
import { X, CheckCircle, PackageCheck } from 'lucide-react';
import { CartItem } from '@/lib/types';

interface OrderInquiryModalProps {
  isOpen: boolean;
  cart: CartItem[];
  currency: string;
  onClose: () => void;
  onSubmitOrder: (order: { name: string; email: string; address: string; summary: string }) => void;
}

export const OrderInquiryModal: React.FC<OrderInquiryModalProps> = ({
  isOpen,
  cart,
  currency,
  onClose,
  onSubmitOrder,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  let summary = 'Order Breakdown:\n';
  cart.forEach((item) => {
    summary += `• ${item.title} (x${item.qty}) - ${currency}${(item.price * item.qty).toFixed(2)}\n`;
  });
  summary += `Total: ${currency}${total.toFixed(2)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) return;
    onSubmitOrder({ name, email, address, summary });
    setName('');
    setEmail('');
    setAddress('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-md bg-[#16120e] border border-white/10 rounded-2xl p-6 shadow-2xl z-10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-[#f36c21]" />
            <h3 className="font-display font-bold text-lg text-white">Complete Order Inquiry</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-400 leading-relaxed mb-5">
          Submit your order inquiry directly to the artist. You will receive an invoice and payment instructions (PayPal, Card, or Transfer) via email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
              Your Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jordan Miller"
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
              Shipping City & Country
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. London, United Kingdom"
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
              Cart Summary
            </label>
            <textarea
              value={summary}
              readOnly
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/5 text-stone-400 text-xs font-mono resize-none focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#f36c21] hover:bg-[#ff7b34] text-white text-xs font-bold shadow-md"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Send Order Inquiry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
