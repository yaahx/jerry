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
    <section id="music" className="py-16 border-b border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Music & Releases
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Stream singles, beat packs, and experimental soundscapes directly in your browser.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Genre Filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
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
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f36c21]/20 border border-[#f36c21] text-[#ff9f43] hover:bg-[#f36c21] hover:text-white text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Track</span>
            </button>
          )}
        </div>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTracks.map((track) => {
          const isThisPlaying = currentTrackId === track.id && isPlaying;
          return (
            <div
              key={track.id}
              className="group glass-panel rounded-xl p-4 flex flex-col relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60"
            >
              {/* Admin Overlay Actions */}
              {isAdmin && (
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                  <button
                    onClick={() => onEditTrack(track)}
                    className="p-1.5 rounded-md bg-[#f36c21] hover:bg-[#ff7b34] text-white text-xs shadow-md transition-all"
                    title="Edit Track"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteTrack(track.id)}
                    className="p-1.5 rounded-md bg-red-600 hover:bg-red-500 text-white text-xs shadow-md transition-all"
                    title="Delete Track"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Artwork Container */}
              <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-4 bg-stone-900">
                <img
                  src={track.art || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600'}
                  alt={track.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Play Button Overlay */}
                <div
                  className={`absolute inset-0 bg-black/45 flex items-center justify-center transition-opacity ${
                    isThisPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <button
                    onClick={() => onPlayTrack(track)}
                    className="w-13 h-13 p-3.5 rounded-full bg-[#f36c21] hover:bg-[#ff7b34] text-white shadow-[0_4px_20px_rgba(243,108,33,0.5)] transition-transform hover:scale-110 flex items-center justify-center"
                    title={isThisPlaying ? 'Pause' : 'Play'}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-6 h-6 fill-white" />
                    ) : (
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Meta */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold uppercase tracking-wider text-[#ff9f43]">
                    {track.genre}
                  </span>
                  <span className="text-stone-500">{track.duration}</span>
                </div>

                <h4 className="font-display font-bold text-base text-white truncate mb-1">
                  {track.title}
                </h4>

                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-4">
                  {track.description}
                </p>

                {/* Footer stats */}
                <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1.5">
                    <Headphones className="w-3.5 h-3.5 text-stone-500" />
                    <span>{track.plays} plays</span>
                  </span>
                  <button
                    onClick={() => handleShare(track)}
                    className="p-1.5 hover:text-[#f36c21] transition-colors"
                    title="Share Track"
                  >
                    <Share2 className="w-3.5 h-3.5" />
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
