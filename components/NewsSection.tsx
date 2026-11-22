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
    <section id="news" className="py-20 border-b border-white/10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight uppercase">
            News & Updates
          </h2>
          <p className="text-stone-300 text-base sm:text-lg mt-2 font-normal">
            Latest announcements, upcoming tour dates, studio stories, and project drops.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={onAddNews}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#f36c21]/20 border border-[#f36c21] text-[#ff9f43] hover:bg-[#f36c21] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Post Update</span>
          </button>
        )}
      </div>

      {/* News Cards - Sharp */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {news.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-7 relative flex flex-col transition-all hover:border-[#f36c21]/50 border border-white/10"
          >
            {/* Admin Overlay Actions */}
            {isAdmin && (
              <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
                <button
                  onClick={() => onEditNews(item)}
                  className="p-2 bg-[#f36c21] hover:bg-[#ff7b34] text-white text-xs shadow-md transition-all"
                  title="Edit Post"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteNews(item.id)}
                  className="p-2 bg-red-600 hover:bg-red-500 text-white text-xs shadow-md transition-all"
                  title="Delete Post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-4 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
              <span className="flex items-center gap-1.5 text-[#ff9f43] bg-[#f36c21]/15 px-3 py-1 border border-[#f36c21]/30">
                <Tag className="w-3.5 h-3.5" />
                <span>{item.tag || 'News'}</span>
              </span>
              <span className="flex items-center gap-1.5 text-stone-400 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.date}</span>
              </span>
            </div>

            <h3 className="font-display font-black text-2xl text-white mb-3 tracking-tight">
              {item.title}
            </h3>

            <p className="text-base text-stone-300 leading-relaxed whitespace-pre-line font-normal">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
