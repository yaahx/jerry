'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause, ArrowLeft, Disc, Layers, Music } from 'lucide-react';
import { Track } from '@/lib/types';
import { storage, initialTracks } from '@/lib/storage';

const projectImages = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
  'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80',
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
];

interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const categories: CategoryItem[] = [
  { id: 'albums', name: 'Albums', icon: <Disc className="w-4 h-4" /> },
  { id: 'tracks', name: 'Tracks', icon: <Layers className="w-4 h-4" /> },
  { id: 'singles', name: 'Singles', icon: <Music className="w-4 h-4" /> },
];

export default function ProjectsPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('albums');
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    setTracks(storage.getTracks() || initialTracks);
  }, []);

  const togglePlay = (id: string) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  const filteredTracks = tracks.filter((t) => {
    const genre = (t.genre || '').toLowerCase();
    const term = selectedCategory.toLowerCase();
    if (term === 'albums') return genre.includes('album');
    if (term === 'tracks') return genre.includes('track');
    if (term === 'singles') return genre.includes('single');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0c0a09] text-white">
      {/* Top sticky bar */}
      <header className="sticky top-0 z-40 w-full bg-[#0c0a09]/95 backdrop-blur-md border-b border-white/10 px-6 sm:px-10 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-stone-400 hover:text-[#f36c21] transition-colors text-sm font-bold uppercase tracking-wider group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          BACK
        </Link>
        <span
          className="font-brand font-black uppercase tracking-wider bg-gradient-to-r from-white via-stone-100 to-[#f36c21] bg-clip-text text-transparent"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.75rem)' }}
        >
          uglydogsarecute
        </span>
        <div className="w-16" /> {/* spacer */}
      </header>

      {/* Main Container - Left-aligned layout */}
      <main className="w-full px-6 sm:px-10 lg:px-16 py-16">
        {/* Page Header: "All Work" in white, "Projects" in orange */}
        <div className="mb-14">
          <p className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-3">
            All Work
          </p>
          <h1 className="font-display font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight uppercase leading-none text-[#f36c21]">
            Projects
          </h1>
          <p className="text-stone-400 text-sm uppercase tracking-widest mt-4">
            Archive of soundscapes, collaborations, discography & unreleased tapes
          </p>
        </div>

        {/* Content Layout: Mini Sidebar on the Left, 3-Column Grid on the Right */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Mini Sidebar on the Left (Card removed, clean editorial treatment) */}
          <aside className="w-full lg:w-64 shrink-0">
            {/* Category Header */}
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#f36c21] mb-3">
              Categories
            </div>

            {/* Subtle horizontal separator line between categories header and navigation */}
            <div className="h-px w-full bg-white/10 mb-4" />

            {/* Editorial Category Navigation */}
            <nav className="flex flex-row lg:flex-col gap-2 flex-wrap">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = tracks.filter((t) =>
                  (t.genre || '').toLowerCase().includes(cat.id.replace(/s$/, ''))
                ).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`group flex items-center justify-between px-3.5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all text-left w-full border-l-2 ${
                      isActive
                        ? 'border-[#f36c21] bg-[#f36c21]/10 text-white'
                        : 'border-transparent text-stone-400 hover:text-white hover:border-white/30 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-[#f36c21]' : 'text-stone-500 group-hover:text-stone-300'}>
                        {cat.icon}
                      </span>
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-stone-500">
                      0{count}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Subtle horizontal separator line below category navigation */}
            <div className="h-px w-full bg-white/10 mt-5 mb-5" />

            {/* Clean Sidebar Personality Meta (No "SHARP CORNERS ONLY") */}
            <div className="hidden lg:block text-xs text-stone-500 leading-relaxed font-mono">
              CURATED ARCHIVE
              <br />
              <span className="text-stone-400">uglydogsarecute</span>
            </div>
          </aside>

          {/* 3-Column Horizontal Grid on the Right */}
          <section className="flex-1 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTracks.map((track, i) => {
                const imgSrc = track.art || projectImages[i % projectImages.length];
                const isActive = playingId === track.id;

                return (
                  <div
                    key={track.id}
                    className="group bg-[#0e0c0a] border border-white/10 hover:border-[#f36c21]/50 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80 overflow-hidden"
                  >
                    {/* Media Image Thumbnail */}
                    <div className="relative aspect-square w-full overflow-hidden bg-black/60">
                      <img
                        src={imgSrc}
                        alt={track.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Play Button Overlay */}
                      <button
                        onClick={() => togglePlay(track.id)}
                        className={`absolute bottom-4 left-4 w-12 h-12 flex items-center justify-center bg-[#f36c21] text-white shadow-lg transition-all duration-300 ${
                          isActive ? 'opacity-100 scale-100' : 'opacity-80 group-hover:opacity-100 hover:scale-105'
                        }`}
                        title={isActive ? 'Pause' : 'Play'}
                      >
                        {isActive ? (
                          <Pause className="w-5 h-5 fill-white" />
                        ) : (
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        )}
                      </button>

                      {/* Number Badge */}
                      <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 text-xs font-mono text-stone-300 border border-white/10">
                        {String(i + 1).padStart(2, '0')}
                      </div>

                      {/* Category Tag */}
                      <div className="absolute top-3 right-3 bg-[#f36c21]/20 border border-[#f36c21]/50 text-[#ff9f43] px-2.5 py-1 text-xs font-bold uppercase tracking-wider">
                        {track.genre}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight leading-snug mb-3 break-words">
                          {track.title}
                        </h3>
                        <p className="text-stone-400 text-sm leading-relaxed line-clamp-3 font-normal mb-6">
                          {track.description}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-stone-400">
                        <span>{track.duration}</span>
                        <button
                          onClick={() => togglePlay(track.id)}
                          className="font-sans font-bold uppercase tracking-wider text-stone-300 hover:text-[#f36c21] transition-colors"
                        >
                          {isActive ? 'Playing' : 'Listen'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredTracks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 text-center w-full">
                <p className="text-stone-400 text-sm uppercase tracking-widest mb-3">
                  No projects found in {selectedCategory}
                </p>
                <button
                  onClick={() => setSelectedCategory('albums')}
                  className="px-6 py-2.5 bg-[#f36c21] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#ff7b34] transition-all"
                >
                  View Albums
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
