'use client';

import React, { useState, useEffect } from 'react';
import { X, Bell } from 'lucide-react';
import { NewsPost } from '@/lib/types';

interface NewsModalProps {
  isOpen: boolean;
  newsToEdit: NewsPost | null;
  onClose: () => void;
  onSave: (post: Partial<NewsPost>) => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({
  isOpen,
  newsToEdit,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('Announcement');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (newsToEdit) {
      setTitle(newsToEdit.title || '');
      setTag(newsToEdit.tag || 'Announcement');
      setContent(newsToEdit.content || '');
    } else {
      setTitle('');
      setTag('Announcement');
      setContent('');
    }
  }, [newsToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    onSave({
      id: newsToEdit ? newsToEdit.id : undefined,
      title,
      tag,
      date: newsToEdit
        ? newsToEdit.date
        : new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
      content,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-md bg-[#16120e] border border-white/10 rounded-2xl p-6 shadow-2xl z-10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#f36c21]" />
            <h3 className="font-display font-bold text-lg text-white">
              {newsToEdit ? 'Edit Update / Post' : 'Post New Update'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. European Tour Dates Announced"
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
              Category Tag
            </label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Announcement, Tour, Drop"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">
              Content / Story
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              placeholder="Write update details here..."
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#f36c21] resize-none leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#f36c21] hover:bg-[#ff7b34] text-white text-xs font-bold shadow-md"
            >
              Publish Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
