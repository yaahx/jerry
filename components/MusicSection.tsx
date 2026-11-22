'use client';

import React, { useState } from 'react';
import { Play, Pause, Plus, Edit2, Trash2, Share2, Headphones } from 'lucide-react';
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

export const MusicSection: React.FC<MusicSectionProps> = ({
  tracks,
  currentTrackId,
  isPlaying,
  isAdmin,
  onPlayTrack,
  onAddTrack,
  onEditTrack,
  onDeleteTrack,
  onToast,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const genres = ['all', 'Burnt Beats', 'Lo-Fi', 'Trap', 'Ambient', 'Experimental'];

  const filteredTracks =
    selectedGenre === 'all'
      ? tracks
      : tracks.filter((t) => t.genre.toLowerCase().includes(selectedGenre.toLowerCase()));

  const handleShare = (track: Track) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}#music`;
      navigator.clipboard.writeText(url).then(() => {
        onToast(`Link to "${track.title}" copied!`);
      }).catch(() => {
        onToast('Link ready to share!');
      });
    }
  };

  return (
    <section id="music" className="py-20 border-b border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight uppercase">
            Music & Releases
          </h2>
          <p className="text-stone-300 text-base sm:text-lg mt-2 font-normal">
            Stream singles, beat packs, and experimental soundscapes directly in your browser.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Genre Filters - Sharp Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                  selectedGenre === g
                    ? 'bg-[#f36c21] text-white shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {g === 'all' ? 'All' : g}
              </button>
            ))}
          </div>

          {/* Admin Add Track */}
          {isAdmin && (
            <button
              onClick={onAddTrack}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#f36c21]/20 border border-[#f36c21] text-[#ff9f43] hover:bg-[#f36c21] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Track</span>
            </button>
          )}
        </div>
      </div>

      {/* Tracks Grid - Sharp Corners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {filteredTracks.map((track) => {
          const isThisPlaying = currentTrackId === track.id && isPlaying;
          return (
            <div
              key={track.id}
              className="group glass-panel p-5 flex flex-col relative transition-all duration-300 hover:-translate-y-1 hover:border-[#f36c21]/50 hover:shadow-2xl hover:shadow-black/70"
            >
              {/* Admin Overlay Actions */}
              {isAdmin && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                  <button
                    onClick={() => onEditTrack(track)}
                    className="p-2 bg-[#f36c21] hover:bg-[#ff7b34] text-white text-xs shadow-md transition-all"
                    title="Edit Track"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteTrack(track.id)}
                    className="p-2 bg-red-600 hover:bg-red-500 text-white text-xs shadow-md transition-all"
                    title="Delete Track"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Artwork Container - Sharp */}
              <div className="relative aspect-square w-full overflow-hidden mb-5 bg-stone-900 border border-white/5">
                <img
                  src={track.art || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600'}
                  alt={track.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Play Button Overlay - Sharp Box */}
                <div
                  className={`absolute inset-0 bg-black/55 flex items-center justify-center transition-opacity ${
                    isThisPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <button
                    onClick={() => onPlayTrack(track)}
                    className="w-16 h-16 bg-[#f36c21] hover:bg-[#ff7b34] text-white shadow-[0_4px_25px_rgba(243,108,33,0.55)] transition-transform hover:scale-110 flex items-center justify-center"
                    title={isThisPlaying ? 'Pause' : 'Play'}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-7 h-7 fill-white" />
                    ) : (
                      <Play className="w-7 h-7 fill-white ml-0.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Meta */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="text-[#ff9f43]">{track.genre}</span>
                  <span className="text-stone-400 font-mono">{track.duration}</span>
                </div>

                <h4 className="font-display font-black text-xl text-white truncate mb-2">
                  {track.title}
                </h4>

                <p className="text-sm text-stone-300 line-clamp-2 leading-relaxed mb-5 font-normal">
                  {track.description}
                </p>

                {/* Footer stats */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm text-stone-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Headphones className="w-4 h-4 text-stone-400" />
                    <span>{track.plays} plays</span>
                  </span>
                  <button
                    onClick={() => handleShare(track)}
                    className="p-1.5 hover:text-[#f36c21] transition-colors"
                    title="Share Track"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
