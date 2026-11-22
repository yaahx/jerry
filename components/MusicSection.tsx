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
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
  'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80',
  'https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=800&q=80',
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
    <section id="music" className="py-24 border-b border-white/10">

      {/* Header */}
      <div className="flex items-end justify-between mb-14 gap-4">
        <div>
          <p className="text-[#f36c21] text-xs font-bold uppercase tracking-[0.3em] mb-3">Latest Work</p>
          <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-none">
            New<br />Projects
          </h2>
        </div>

        <div className="flex flex-col items-end gap-4">
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
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-[#f36c21] transition-colors group"
          >
            Show All
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Carousel */}
      {total === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 text-center">
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
        <div className="relative">
          {/* Card */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] border border-white/8 overflow-hidden">

            {/* Image panel */}
            <div className="relative overflow-hidden aspect-[16/10] md:aspect-auto md:min-h-[420px]">
              <img
                key={track.id}
                src={imgSrc}
                alt={track.title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

              {/* Play btn */}
              <button
                onClick={() => onPlayTrack(track)}
                className={`absolute bottom-6 left-6 w-14 h-14 flex items-center justify-center bg-[#f36c21] text-white shadow-lg transition-all duration-300 ${
                  isThisPlaying ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {isThisPlaying
                  ? <Pause className="w-6 h-6 fill-white" />
                  : <Play className="w-6 h-6 fill-white ml-0.5" />}
              </button>

              {/* Admin btns */}
              {isAdmin && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => onEditTrack(track)} className="p-2 bg-[#f36c21] text-white">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onDeleteTrack(track.id)} className="p-2 bg-red-600 text-white">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Counter badge */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-mono text-stone-300 uppercase tracking-widest">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </div>
            </div>

            {/* Info panel */}
            <div className="flex flex-col justify-between p-8 md:p-10 bg-[#0f0d0b]">
              <div>
                <span className="text-[#f36c21] text-xs font-bold uppercase tracking-[0.25em] mb-6 block">
                  {track.genre}
                </span>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight leading-tight mb-5">
                  {track.title}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {track.description}
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-white/8 flex items-center justify-between">
                <span className="text-stone-500 text-xs font-mono uppercase tracking-wider">
                  {track.duration}
                </span>
                <button
                  onClick={() => onPlayTrack(track)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-[#f36c21] transition-colors group/btn"
                >
                  {isThisPlaying ? 'Now Playing' : 'Listen'}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-3 mt-6 justify-end">
            <button
              onClick={prev}
              className="w-11 h-11 border border-white/15 text-stone-400 hover:border-[#f36c21] hover:text-[#f36c21] transition-all flex items-center justify-center"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {/* Dot indicators */}
            <div className="flex items-center gap-2 px-2">
              {tracks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`transition-all duration-300 ${
                    i === index
                      ? 'w-6 h-1.5 bg-[#f36c21]'
                      : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-11 h-11 border border-white/15 text-stone-400 hover:border-[#f36c21] hover:text-[#f36c21] transition-all flex items-center justify-center"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
