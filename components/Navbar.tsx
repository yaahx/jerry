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
    <header className="sticky top-0 z-40 w-full bg-[#0c0a09]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4">
      <div className="w-full flex items-center justify-between relative">
        {/* Left: Navigation Links (No large left margins, ample breathing room) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-base font-semibold tracking-wider uppercase text-stone-300">
          <a href="#music" className="hover:text-[#f36c21] transition-colors whitespace-nowrap">
            Projects
          </a>
          <a href="#store" className="hover:text-[#f36c21] transition-colors whitespace-nowrap">
            Store
          </a>
          <a href="#news" className="hover:text-[#f36c21] transition-colors whitespace-nowrap">
            Updates
          </a>
          <a href="#about" className="hover:text-[#f36c21] transition-colors whitespace-nowrap">
            About
          </a>
          <a href="#contact" className="hover:text-[#f36c21] transition-colors whitespace-nowrap">
            Contact
          </a>
        </nav>

        {/* Center: Brand Name (Centered in the viewport, will not collide with left or right items) */}
        <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
          <a href="#" className="group inline-block text-center">
            <span
              className="font-brand font-black tracking-wider uppercase bg-gradient-to-r from-white via-stone-100 to-[#f36c21] bg-clip-text text-transparent group-hover:to-[#ff9f43] transition-all whitespace-nowrap"
              style={{ fontSize: "clamp(0.9rem, 2vw, 1.75rem)" }}
            >
              {artistName}
            </span>
          </a>
        </div>

        {/* Right: Cart Button (No large right margins) */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Mobile links */}
          <div className="md:hidden flex items-center gap-3 text-xs uppercase font-bold text-stone-400">
            <a href="#music" className="hover:text-[#f36c21]">Projects</a>
            <a href="#store" className="hover:text-[#f36c21]">Store</a>
          </div>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2 bg-transparent border border-white/20 hover:border-[#f36c21] text-white hover:text-[#f36c21] transition-all text-sm font-bold tracking-wider uppercase shadow-sm"
            title="Open Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#ff9f43]" />
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
