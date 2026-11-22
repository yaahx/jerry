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
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Dialog */}
      <div className="relative w-full max-w-sm glass-panel rounded-2xl p-6 bg-[#16120e] shadow-2xl border border-white/10 z-10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#f36c21]" />
            <h3 className="font-display font-bold text-lg text-white">Admin Authentication</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-400 leading-relaxed mb-5">
          Enter your master PIN to access the artist control center, track visitor activity, and edit content.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
              Master Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="Default PIN: 1234"
                autoFocus
                required
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-stone-600 text-sm focus:outline-none focus:border-[#f36c21] transition-all font-mono tracking-widest"
              />
              <KeyRound className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
            </div>
            {error && (
              <span className="text-xs text-red-400 mt-1 block">
                Incorrect PIN. Default is 1234.
              </span>
            )}
            <span className="text-[11px] text-stone-500 mt-1.5 block">
              Default passcode is <code className="text-[#ff9f43]">1234</code>.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#f36c21] hover:bg-[#ff7b34] text-white text-xs font-bold transition-all shadow-[0_2px_15px_rgba(243,108,33,0.4)]"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
