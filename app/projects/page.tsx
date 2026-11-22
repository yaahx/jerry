'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Track } from '@/lib/types';
import { initialTracks } from '@/lib/storage';

const projectImages = [
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
  'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80',
  'https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=800&q=80',
];

export default function ProjectsPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    setTracks(initialTracks);
  }, []);

  const togglePlay = (id: string) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-40 w-full bg-[#0c0a09]/95 backdrop-blur-md border-b border-white/10 px-6 sm:px-10 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-stone-400 hover:text-[#f36c21] transition-colors text-sm font-bold uppercase tracking-wider group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Link>
        <span
          className="font-brand font-black uppercase tracking-wider bg-gradient-to-r from-white via-stone-100 to-[#f36c21] bg-clip-text text-transparent"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.75rem)' }}
        >
          uglydogsarecute
        </span>
        <div className="w-16" /> {/* spacer */}
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-20">
        {/* Page header */}
        <div className="mb-16">
          <p className="text-[#f36c21] text-xs font-bold uppercase tracking-[0.3em] mb-3">All Work</p>
          <h1 className="font-display font-black text-6xl sm:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-none">
            Projects
          </h1>
          <p className="text-stone-500 text-sm uppercase tracking-widest mt-4">
            {tracks.length} {tracks.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {/* Grid — alternating editorial rows */}
        <div className="space-y-6">
          {tracks.map((track, i) => {
            const isEven = i % 2 === 0;
            const imgSrc = track.art || projectImages[i % projectImages.length];
            const isActive = playingId === track.id;

            return (
              <div
                key={track.id}
                className={`group grid gap-0 border border-white/8 hover:border-[#f36c21]/40 transition-all duration-500 overflow-hidden ${
                  isEven
                    ? 'grid-cols-1 md:grid-cols-[3fr_2fr]'
                    : 'grid-cols-1 md:grid-cols-[2fr_3fr] md:[direction:rtl]'
                }`}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/9] md:aspect-auto md:min-h-[300px]">
                  <img
                    src={imgSrc}
                    alt={track.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

                  {/* Play btn */}
                  <button
                    onClick={() => togglePlay(track.id)}
                    className="absolute bottom-5 left-5 w-12 h-12 flex items-center justify-center bg-[#f36c21] text-white shadow-lg transition-all duration-300 opacity-80 hover:opacity-100"
                  >
                    {isActive
                      ? <Pause className="w-5 h-5 fill-white" />
                      : <Play className="w-5 h-5 fill-white ml-0.5" />}
                  </button>

                  {/* Index */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-mono text-stone-300 tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between p-8 bg-[#0f0d0b] md:[direction:ltr]">
                  <div>
                    <span className="text-[#f36c21] text-xs font-bold uppercase tracking-[0.25em] mb-5 block">
                      {track.genre}
                    </span>
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight leading-tight mb-4">
                      {track.title}
                    </h2>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/8 flex items-center justify-between">
                    <span className="text-stone-500 text-xs font-mono uppercase tracking-wider">
                      {track.duration}
                    </span>
                    <button
                      onClick={() => togglePlay(track.id)}
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-[#f36c21] transition-colors group/btn"
                    >
                      {isActive ? 'Now Playing' : 'Listen'}
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {tracks.length === 0 && (
            <div className="flex items-center justify-center py-40 border border-dashed border-white/10">
              <p className="text-stone-500 text-sm uppercase tracking-widest">No projects yet</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
