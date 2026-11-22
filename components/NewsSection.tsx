'use client';

import React from 'react';
import { Plus, Edit2, Trash2, Calendar, Tag } from 'lucide-react';
import { NewsPost } from '@/lib/types';

interface NewsSectionProps {
  news: NewsPost[];
  isAdmin: boolean;
  onAddNews: () => void;
  onEditNews: (post: NewsPost) => void;
  onDeleteNews: (postId: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  news,
  isAdmin,
  onAddNews,
  onEditNews,
  onDeleteNews,
}) => {
  return (
    <section id="news" className="py-16 border-b border-white/10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            News & Updates
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Latest announcements, upcoming tour dates, studio stories, and project drops.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={onAddNews}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f36c21]/20 border border-[#f36c21] text-[#ff9f43] hover:bg-[#f36c21] hover:text-white text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Update</span>
          </button>
        )}
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="glass-panel rounded-xl p-6 relative flex flex-col transition-all hover:border-[#f36c21]/40"
          >
            {/* Admin Overlay Actions */}
            {isAdmin && (
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
                <button
                  onClick={() => onEditNews(item)}
                  className="p-1.5 rounded-md bg-[#f36c21] hover:bg-[#ff7b34] text-white text-xs shadow-md transition-all"
                  title="Edit Post"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteNews(item.id)}
                  className="p-1.5 rounded-md bg-red-600 hover:bg-red-500 text-white text-xs shadow-md transition-all"
                  title="Delete Post"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-4 text-xs mb-3">
              <span className="flex items-center gap-1 text-[#ff9f43] font-semibold bg-[#f36c21]/15 px-2.5 py-0.5 rounded-full border border-[#f36c21]/30">
                <Tag className="w-3 h-3" />
                <span>{item.tag || 'News'}</span>
              </span>
              <span className="flex items-center gap-1 text-stone-500">
                <Calendar className="w-3 h-3" />
                <span>{item.date}</span>
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-white mb-3">
              {item.title}
            </h3>

            <p className="text-sm text-stone-300 leading-relaxed whitespace-pre-line">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
