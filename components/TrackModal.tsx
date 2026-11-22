'use client';

import React, { useState, useEffect } from 'react';
import { X, Music } from 'lucide-react';
import { Track } from '@/lib/types';

interface TrackModalProps {
  isOpen: boolean;
  trackToEdit: Track | null;
  onClose: () => void;
  onSave: (track: Partial<Track>) => void;
}

export const TrackModal: React.FC<TrackModalProps> = ({
  isOpen,
  trackToEdit,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('Burnt Beats');
  const [duration, setDuration] = useState('3:30');
  const [art, setArt] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (trackToEdit) {
      setTitle(trackToEdit.title || '');
      setGenre(trackToEdit.genre || 'Burnt Beats');
      setDuration(trackToEdit.duration || '3:30');
      setArt(trackToEdit.art || '');
      setAudioUrl(trackToEdit.audioUrl || '');
      setDescription(trackToEdit.description || '');
    } else {
      setTitle('');
      setGenre('Burnt Beats');
      setDuration('3:30');
      setArt('');
      setAudioUrl('');
      setDescription('');
    }
  }, [trackToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onSave({
      id: trackToEdit ? trackToEdit.id : undefined,
      title,
      genre,
      duration,
      art: art || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
      audioUrl,
      description,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg bg-[#16120e] border border-white/10 p-7 shadow-2xl z-10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <Music className="w-5 h-5 text-[#f36c21]" />
            <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
              {trackToEdit ? 'Edit Music Track' : 'Add New Music Track'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
              Track Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Midnight Echoes"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#f36c21]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                Genre
              </label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Burnt Beats, Lo-Fi"
                className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#f36c21]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="3:30"
                className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#f36c21]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
              Cover Artwork URL
            </label>
            <input
              type="url"
              value={art}
              onChange={(e) => setArt(e.target.value)}
              placeholder="https://example.com/art.jpg"
              className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#f36c21]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
              Audio URL (MP3/WAV) or leave empty for synth generator
            </label>
            <input
              type="text"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              placeholder="https://example.com/audio.mp3"
              className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#f36c21]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
              Description / Notes
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="BPM, vibes, instrumentation..."
              className="w-full px-4 py-3 bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#f36c21] resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#f36c21] hover:bg-[#ff7b34] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md"
            >
              Save Track
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
