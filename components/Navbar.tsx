'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  artistName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  artistName,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0c0a09]/95 backdrop-blur-md border-b border-white/10 px-6 sm:px-10 py-5">
      <div className="max-w-7xl mx-auto grid grid-cols-12 items-center">
        {/* Left: Navigation Links */}
        <nav className="col-span-4 hidden md:flex items-center gap-7 text-sm lg:text-base font-semibold tracking-wider uppercase text-stone-300">
          <a href="#music" className="hover:text-[#f36c21] transition-colors">
            Music
          </a>
          <a href="#store" className="hover:text-[#f36c21] transition-colors">
            Store
          </a>
          <a href="#news" className="hover:text-[#f36c21] transition-colors">
            Updates
          </a>
          <a href="#about" className="hover:text-[#f36c21] transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-[#f36c21] transition-colors">
            Contact
          </a>
        </nav>

        {/* Center: Brand Name (No logo beside it, centered, stylish font) */}
        <div className="col-span-8 md:col-span-4 flex items-center md:justify-center">
          <a href="#" className="group inline-block text-center">
            <span className="font-brand font-black text-xl sm:text-2xl lg:text-3xl tracking-wider uppercase bg-gradient-to-r from-white via-stone-100 to-[#f36c21] bg-clip-text text-transparent group-hover:to-[#ff9f43] transition-all">
              {artistName}
            </span>
          </a>
        </div>

        {/* Right: Cart Button (No admin portal) */}
        <div className="col-span-4 flex items-center justify-end gap-5">
          {/* Mobile links toggle indicator or link */}
          <div className="md:hidden flex items-center gap-3 text-xs uppercase font-bold text-stone-400">
            <a href="#music" className="hover:text-[#f36c21]">Music</a>
            <a href="#store" className="hover:text-[#f36c21]">Store</a>
          </div>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-[#f36c21] border border-white/10 hover:border-[#f36c21] text-white transition-all text-sm font-bold tracking-wider uppercase shadow-sm"
            title="Open Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#ff9f43] group-hover:text-white" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-[#f36c21] text-white text-xs font-black px-2 py-0.5 border border-[#0c0a09]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
