'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, KeyRound } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (pin: string) => boolean;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(pin)) {
      setPin('');
      setError(false);
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Sharp Dialog */}
      <div className="relative w-full max-w-sm glass-panel p-7 bg-[#16120e] shadow-2xl border border-white/10 z-10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#f36c21]" />
            <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
              Admin Access
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6 font-normal">
          Enter master PIN to manage music tracks, shop items, updates, and view visitor analytics:
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
              Passcode PIN
            </label>
            <div className="relative">
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="Default: 1234"
                autoFocus
                required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 text-white placeholder-stone-600 text-sm focus:outline-none focus:border-[#f36c21] transition-all font-mono tracking-widest"
              />
              <KeyRound className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
            </div>
            {error && (
              <span className="text-xs text-red-400 font-bold mt-1.5 block">
                Incorrect PIN. Default is 1234.
              </span>
            )}
            <span className="text-xs text-stone-500 mt-2 block font-medium">
              Default passcode is <code className="text-[#ff9f43]">1234</code>.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#f36c21] hover:bg-[#ff7b34] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
