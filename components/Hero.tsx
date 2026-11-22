'use client';

import React from 'react';
import { Play, ShoppingBag, Headphones, Disc3 } from 'lucide-react';
import { Track } from '@/lib/types';

interface HeroProps {
  artistName: string;
  tagline: string;
  bio: string;
  featuredTrack: Track;
  isPlaying: boolean;
  onPlayFeatured: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  artistName,
  tagline,
  bio,
  featuredTrack,
  isPlaying,
  onPlayFeatured,
}) => {
  return (
    <section className="py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-white/10">
      {/* Left Column */}
      <div className="lg:col-span-7 flex flex-col items-start">
        {/* Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f36c21]/10 border border-[#f36c21]/30 text-[#ff9f43] text-xs font-semibold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-[#f36c21] animate-pulse" />
          <span>Official Music & Creative Hub</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-5">
          THE SOUNDS OF <br />
          <span className="bg-gradient-to-r from-white via-[#ff9f43] to-[#f36c21] bg-clip-text text-transparent">
            {artistName}
          </span>
        </h1>

        {/* Bio */}
        <p className="text-stone-400 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
          {bio}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <a
            href="#music"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#f36c21] to-[#d9531e] text-white font-bold text-sm hover:brightness-110 transition-all shadow-[0_4px_25px_rgba(243,108,33,0.45)] hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Stream Releases</span>
          </a>
          <a
            href="#store"
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 border border-white/10 text-stone-200 font-semibold text-sm hover:bg-white/10 hover:border-[#f36c21]/40 transition-all hover:-translate-y-0.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse Merch</span>
          </a>
        </div>

        {/* Socials / External links */}
        <div className="flex items-center gap-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
          <span>Explore:</span>
          <a href="#" className="hover:text-[#f36c21] transition-colors">Spotify</a>
          <span>•</span>
          <a href="#" className="hover:text-[#f36c21] transition-colors">Apple Music</a>
          <span>•</span>
          <a href="#" className="hover:text-[#f36c21] transition-colors">SoundCloud</a>
          <span>•</span>
          <a href="#" className="hover:text-[#f36c21] transition-colors">YouTube</a>
        </div>
      </div>

      {/* Right Column: Interactive Vinyl Showcase */}
      <div className="lg:col-span-5 flex justify-center">
        <div className="w-full max-w-md p-6 rounded-2xl glass-panel relative overflow-hidden group shadow-[0_0_30px_rgba(243,108,33,0.18)]">
          {/* Vinyl Container */}
          <div className="relative h-64 flex items-center justify-center mb-4">
            {/* Vinyl Disc */}
            <div
              className={`absolute right-4 w-48 h-48 rounded-full bg-gradient-to-br from-stone-900 via-stone-950 to-black border-4 border-stone-800 shadow-2xl flex items-center justify-center transition-transform ${
                isPlaying ? 'animate-spin-vinyl' : 'group-hover:translate-x-3'
              }`}
            >
              {/* Outer grooves */}
              <div className="w-40 h-40 rounded-full border border-stone-700/30 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border border-stone-700/20 flex items-center justify-center">
                  {/* Center Label */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#f36c21] via-[#ff4500] to-[#ff9f43] flex items-center justify-center shadow-[0_0_15px_rgba(243,108,33,0.5)]">
                    <div className="w-6 h-6 rounded-full bg-[#0c0a09] border border-stone-600 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Album Cover */}
            <img
              src={featuredTrack.art || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600'}
              alt={featuredTrack.title}
              className="absolute left-4 w-48 h-48 rounded-xl object-cover shadow-[0_15px_35px_rgba(0,0,0,0.8)] border border-white/10 z-10"
            />
          </div>

          {/* Meta */}
          <div className="relative z-10 pt-2 border-t border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#f36c21] uppercase tracking-wider">
                FEATURED / {featuredTrack.genre}
              </span>
              <button
                onClick={onPlayFeatured}
                className="flex items-center gap-1.5 text-xs font-bold text-[#ff9f43] hover:text-white transition-colors"
              >
                <Disc3 className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
                <span>{isPlaying ? 'Now Playing' : 'Preview Track'}</span>
              </button>
            </div>
            <h3 className="font-display font-bold text-xl text-white mt-1">
              {featuredTrack.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-stone-400 mt-2">
              <span className="flex items-center gap-1">
                <Headphones className="w-3.5 h-3.5" /> {featuredTrack.plays} Streams
              </span>
              <span>•</span>
              <span>Master Quality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
