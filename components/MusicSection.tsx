'use client';

import React from 'react';
import { Play, Pause, Plus, Edit2, Trash2, ArrowUpRight } from 'lucide-react';
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

// Curated project images with varied aspect feels
const projectImages = [
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80', // studio tape reels
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80', // moody music setup
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80', // concert crowd
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', // dj mixing
  'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80', // neon city night
  'https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=800&q=80', // vinyl record
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
  return (
    <section id="music" className="py-24 border-b border-white/10">

      {/* Header row */}
      <div className="flex items-end justify-between mb-16 gap-4">
        <div>
          <p className="text-[#f36c21] text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Latest Work
          </p>
          <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-none">
            New<br />Projects
          </h2>
        </div>

        <div className="flex flex-col items-end gap-3">
          {isAdmin && (
            <button
              onClick={onAddTrack}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#f36c21]/20 border border-[#f36c21] text-[#ff9f43] hover:bg-[#f36c21] hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          )}
          <p className="text-stone-500 text-xs uppercase tracking-widest hidden md:block">
            Scroll to explore
          </p>
        </div>
      </div>

      {/* Projects — editorial asymmetric grid */}
      <div className="space-y-6">
        {tracks.map((track, i) => {
          const isThisPlaying = currentTrackId === track.id && isPlaying;
          const imgSrc = track.art || projectImages[i % projectImages.length];

          // Alternate wide-left / wide-right layout every row
          const isEven = i % 2 === 0;

          return (
            <div
              key={track.id}
              className={`group grid gap-0 border border-white/8 hover:border-[#f36c21]/40 transition-all duration-500 overflow-hidden ${
                isEven
                  ? 'grid-cols-1 md:grid-cols-[3fr_2fr]'
                  : 'grid-cols-1 md:grid-cols-[2fr_3fr] md:[direction:rtl]'
              }`}
            >
              {/* Image panel */}
              <div className="relative overflow-hidden aspect-[16/9] md:aspect-auto md:min-h-[280px]">
                <img
                  src={imgSrc}
                  alt={track.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay tint */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

                {/* Play button */}
                <button
                  onClick={() => onPlayTrack(track)}
                  className={`absolute bottom-4 left-4 w-12 h-12 flex items-center justify-center bg-[#f36c21] text-white shadow-lg transition-all duration-300 ${
                    isThisPlaying
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100'
                  }`}
                  title={isThisPlaying ? 'Pause' : 'Play'}
                >
                  {isThisPlaying ? (
                    <Pause className="w-5 h-5 fill-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  )}
                </button>

                {/* Admin actions on image */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => onEditTrack(track)}
                      className="p-2 bg-[#f36c21] text-white text-xs"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteTrack(track.id)}
                      className="p-2 bg-red-600 text-white text-xs"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Info panel */}
              <div
                className={`flex flex-col justify-between p-8 bg-[#0f0d0b] md:[direction:ltr]`}
              >
                {/* Top */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[#f36c21] text-xs font-bold uppercase tracking-[0.25em]">
                      {track.genre}
                    </span>
                    <span className="text-stone-600 text-xs font-mono">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight leading-tight mb-4">
                    {track.title}
                  </h3>

                  <p className="text-stone-400 text-sm leading-relaxed line-clamp-3">
                    {track.description}
                  </p>
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
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
          );
        })}
      </div>

      {/* Empty state */}
      {tracks.length === 0 && (
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
      )}
    </section>
  );
};
