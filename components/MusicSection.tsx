'use client';

import React, { useState } from 'react';
import { Play, Pause, Plus, Edit2, Trash2, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Track } from '@/lib/types';

interface MusicSectionProps {
  tracks: Track[];
  currentTrackId: string | null;
  isPlaying: boolean;
  isAdmin: boolean;
  onPlayTrack: (track: Track) => void;
  onAddTrack: () => void;
  onEditTrack: (track: Track) => void;
  onDeleteTrack: (trackId: string) => void;
  onToast: (msg: string) => void;
}

const projectImages = [
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80',
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80',
  'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=1200&q=80',
  'https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=1200&q=80',
];

export const MusicSection: React.FC<MusicSectionProps> = ({
  tracks,
  currentTrackId,
  isPlaying,
  isAdmin,
  onPlayTrack,
  onAddTrack,
  onEditTrack,
  onDeleteTrack,
}) => {
  const [index, setIndex] = useState(0);

  const total = tracks.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  const track = tracks[index];
  const imgSrc = track?.art || projectImages[index % projectImages.length];
  const isThisPlaying = track && currentTrackId === track.id && isPlaying;

  return (
    <section id="music" className="w-full flex flex-col justify-center py-6 sm:py-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 sm:mb-10 gap-4">
        <div>
          {/* "Latest Work" — white */}
          <p className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-2 sm:mb-3">
            Latest Work
          </p>
          {/* "New Projects" — burnt orange */}
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight uppercase leading-none text-[#f36c21]">
            New<br />Projects
          </h2>
        </div>

        <div className="flex flex-col items-end gap-3 sm:gap-4">
          {isAdmin && (
            <button
              onClick={onAddTrack}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#f36c21]/20 border border-[#f36c21] text-[#ff9f43] hover:bg-[#f36c21] hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          )}
          <Link
            href="/projects"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-[#f36c21] transition-colors group"
          >
            Show All
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Carousel Container */}
      {total === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-white/10 text-center">
          <p className="text-stone-500 text-sm uppercase tracking-widest mb-2">No projects yet</p>
          {isAdmin && (
            <button
              onClick={onAddTrack}
              className="mt-4 px-6 py-3 border border-[#f36c21] text-[#f36c21] text-xs font-bold uppercase tracking-wider hover:bg-[#f36c21] hover:text-white transition-all"
            >
              Add First Project
            </button>
          )}
        </div>
      ) : (
        <div className="relative flex items-center justify-center gap-3 sm:gap-6 w-full max-w-6xl mx-auto">
          {/* LEFT arrow */}
          <button
            onClick={prev}
            className="flex-shrink-0 w-11 sm:w-14 h-11 sm:h-14 border border-white/15 bg-black/40 text-stone-400 hover:border-[#f36c21] hover:text-[#f36c21] transition-all flex items-center justify-center self-center"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Card + dots wrapper */}
          <div className="flex-1 flex flex-col min-w-0 max-w-5xl">
            {/* Consistent fixed large dimension card across all slides */}
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] border border-white/10 overflow-hidden h-[420px] sm:h-[480px] lg:h-[500px] w-full bg-[#0d0b09] shadow-2xl">
              {/* Image panel */}
              <div className="relative overflow-hidden h-full w-full">
                <img
                  key={track.id}
                  src={imgSrc}
                  alt={track.title}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

                {/* Play button */}
                <button
                  onClick={() => onPlayTrack(track)}
                  className={`absolute bottom-6 left-6 w-14 sm:w-16 h-14 sm:h-16 flex items-center justify-center bg-[#f36c21] text-white shadow-[0_4px_25px_rgba(243,108,33,0.55)] transition-all duration-300 hover:scale-105 ${
                    isThisPlaying ? 'opacity-100' : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  {isThisPlaying ? (
                    <Pause className="w-6 sm:w-7 h-6 sm:h-7 fill-white" />
                  ) : (
                    <Play className="w-6 sm:w-7 h-6 sm:h-7 fill-white ml-0.5" />
                  )}
                </button>

                {/* Admin btns */}
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <button onClick={() => onEditTrack(track)} className="p-2 bg-[#f36c21] text-white">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => onDeleteTrack(track.id)} className="p-2 bg-red-600 text-white">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Counter badge */}
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono text-stone-200 uppercase tracking-widest border border-white/10">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </div>
              </div>

              {/* Info panel */}
              <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-[#0e0c0a] h-full overflow-hidden border-t md:border-t-0 md:border-l border-white/10">
                <div className="min-w-0">
                  <span className="text-[#f36c21] text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-3 sm:mb-4 block">
                    {track.genre}
                  </span>
                  <h3
                    className="font-display font-black text-white uppercase tracking-tight leading-tight mb-3 sm:mb-4 break-words"
                    style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)' }}
                  >
                    {track.title}
                  </h3>
                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-4 font-normal">
                    {track.description}
                  </p>
                </div>

                <div className="pt-4 sm:pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-stone-400 text-xs sm:text-sm font-mono uppercase tracking-wider">
                    {track.duration}
                  </span>
                  <button
                    onClick={() => onPlayTrack(track)}
                    className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-300 hover:text-[#f36c21] transition-colors group/btn"
                  >
                    {isThisPlaying ? 'Now Playing' : 'Listen Now'}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT arrow */}
          <button
            onClick={next}
            className="flex-shrink-0 w-11 sm:w-14 h-11 sm:h-14 border border-white/15 bg-black/40 text-stone-400 hover:border-[#f36c21] hover:text-[#f36c21] transition-all flex items-center justify-center self-center"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
