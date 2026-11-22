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
    <section className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-white/10">
      {/* Left Column */}
      <div className="lg:col-span-7 flex flex-col items-start">
        {/* Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#f36c21]/15 border border-[#f36c21]/40 text-[#ff9f43] text-xs sm:text-sm font-bold uppercase tracking-widest mb-6">
          <span className="w-2 h-2 bg-[#f36c21] animate-pulse" />
          <span>Official Music & Creative Hub</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight mb-6">
          THE SOUNDS OF <br />
          <span className="font-brand bg-gradient-to-r from-white via-[#ff9f43] to-[#f36c21] bg-clip-text text-transparent">
            {artistName}
          </span>
        </h1>

        {/* Bio */}
        <p className="text-stone-300 text-base sm:text-xl max-w-2xl leading-relaxed mb-9 font-normal">
          {bio}
        </p>

        {/* Call to Actions - Sharp buttons, clear typography */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <a
            href="#music"
            className="flex items-center gap-2.5 px-8 py-4 bg-[#f36c21] hover:bg-[#ff7b34] text-white font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all shadow-[0_4px_25px_rgba(243,108,33,0.45)] hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Stream Releases</span>
          </a>
          <a
            href="#store"
            className="flex items-center gap-2.5 px-7 py-4 bg-white/5 border border-white/15 text-white font-bold text-sm sm:text-base uppercase tracking-wider hover:bg-white/10 hover:border-[#f36c21] transition-all hover:-translate-y-0.5"
          >
            <ShoppingBag className="w-4 h-4 text-[#ff9f43]" />
            <span>Browse Merch</span>
          </a>
        </div>

        {/* Socials / External links */}
        <div className="flex items-center gap-5 text-sm font-bold text-stone-400 uppercase tracking-widest">
          <span className="text-stone-500">Listen On:</span>
          <a href="#" className="hover:text-[#f36c21] transition-colors">Spotify</a>
          <span>•</span>
          <a href="#" className="hover:text-[#f36c21] transition-colors">Apple Music</a>
          <span>•</span>
          <a href="#" className="hover:text-[#f36c21] transition-colors">SoundCloud</a>
          <span>•</span>
          <a href="#" className="hover:text-[#f36c21] transition-colors">YouTube</a>
        </div>
      </div>

      {/* Right Column: Sharp Vinyl Showcase Card */}
      <div className="lg:col-span-5 flex justify-center">
        <div className="w-full max-w-md p-7 glass-panel relative overflow-hidden group shadow-2xl border border-white/10">
          {/* Vinyl Container */}
          <div className="relative h-64 sm:h-72 flex items-center justify-center mb-6">
            {/* Spinning Vinyl Disc */}
            <div
              className={`absolute right-3 w-48 sm:w-56 h-48 sm:h-56 rounded-full bg-gradient-to-br from-stone-900 via-stone-950 to-black border-4 border-stone-800 shadow-2xl flex items-center justify-center transition-transform ${
                isPlaying ? 'animate-spin-vinyl' : 'group-hover:translate-x-4'
              }`}
            >
              <div className="w-40 sm:w-48 h-40 sm:h-48 rounded-full border border-stone-700/30 flex items-center justify-center">
                <div className="w-32 sm:w-40 h-32 sm:h-40 rounded-full border border-stone-700/20 flex items-center justify-center">
                  <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-gradient-to-tr from-[#f36c21] via-[#ff4500] to-[#ff9f43] flex items-center justify-center shadow-[0_0_20px_rgba(243,108,33,0.5)]">
                    <div className="w-6 h-6 rounded-full bg-[#0c0a09] border border-stone-600 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Album Cover - Sharp Corners */}
            <img
              src={featuredTrack.art || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600'}
              alt={featuredTrack.title}
              className="absolute left-3 w-48 sm:w-56 h-48 sm:h-56 object-cover shadow-[0_15px_35px_rgba(0,0,0,0.85)] border border-white/15 z-10"
            />
          </div>

          {/* Meta - Sharp typography */}
          <div className="relative z-10 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#f36c21] uppercase tracking-wider">
                FEATURED / {featuredTrack.genre}
              </span>
              <button
                onClick={onPlayFeatured}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#ff9f43] hover:text-white transition-colors uppercase tracking-wider"
              >
                <Disc3 className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
                <span>{isPlaying ? 'Now Playing' : 'Preview Track'}</span>
              </button>
            </div>
            <h3 className="font-display font-black text-2xl text-white mt-2 tracking-tight">
              {featuredTrack.title}
            </h3>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-stone-400 mt-2 font-medium">
              <span className="flex items-center gap-1.5">
                <Headphones className="w-4 h-4 text-stone-400" /> {featuredTrack.plays} Streams
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
