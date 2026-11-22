'use client';

import React from 'react';
import { ShoppingBag, Lock, Unlock } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  isAdmin: boolean;
  onOpenCart: () => void;
  onToggleAdmin: () => void;
  artistName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  isAdmin,
  onOpenCart,
  onToggleAdmin,
  artistName,
}) => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-[#0c0a09]/90 backdrop-blur-md border-b border-white/10">
      {/* Brand */}
      <a href="#" className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f36c21] via-[#ff4500] to-[#ff9f43] p-[2px] animate-spin-disc shadow-[0_0_15px_rgba(243,108,33,0.5)]">
          <div className="w-full h-full bg-[#0c0a09] rounded-full flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-[#f36c21] rounded-full" />
          </div>
        </div>
        <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-white to-[#f36c21] bg-clip-text text-transparent">
          {artistName}
        </span>
      </a>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-400">
        <a href="#music" className="hover:text-white transition-colors">Music</a>
        <a href="#store" className="hover:text-white transition-colors">Store</a>
        <a href="#news" className="hover:text-white transition-colors">Updates</a>
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-3.5">
        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="relative p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#f36c21] hover:text-[#f36c21] transition-all text-stone-300"
          title="Open Cart"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#f36c21] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full leading-none border-2 border-[#0c0a09]">
              {cartCount}
            </span>
          )}
        </button>

        {/* Admin Portal Toggle */}
        <button
          onClick={onToggleAdmin}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            isAdmin
              ? 'bg-[#f36c21]/20 border-[#f36c21] text-[#ff9f43] shadow-[0_0_15px_rgba(243,108,33,0.3)]'
              : 'bg-white/5 border-white/10 text-stone-400 hover:text-[#f36c21] hover:border-[#f36c21]'
          }`}
        >
          {isAdmin ? (
            <>
              <Unlock className="w-3.5 h-3.5 text-[#f36c21]" />
              <span>Admin Active</span>
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
