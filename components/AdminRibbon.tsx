'use client';

import React from 'react';
import { ShieldCheck, BarChart2, LogOut } from 'lucide-react';

interface AdminRibbonProps {
  onOpenDashboard: () => void;
  onLogout: () => void;
}

export const AdminRibbon: React.FC<AdminRibbonProps> = ({
  onOpenDashboard,
  onLogout,
}) => {
  return (
    <div className="sticky top-[69px] z-30 flex items-center justify-between px-6 py-2.5 bg-gradient-to-r from-[#3d1b09] via-[#4d1f08] to-[#261005] border-b border-[#f36c21]/40 text-xs text-white">
      <div className="flex items-center gap-2.5">
        <span className="flex items-center gap-1.5 bg-[#f36c21] font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded text-white shadow-sm">
          <ShieldCheck className="w-3 h-3" /> Master Admin Mode
        </span>
        <span className="hidden sm:inline text-stone-300">
          You have full editing permissions on tracks, merch items, updates & visitor tracking.
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenDashboard}
          className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 rounded font-semibold transition-colors"
        >
          <BarChart2 className="w-3.5 h-3.5 text-[#ff9f43]" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-red-500/30 hover:text-red-300 rounded font-semibold transition-colors"
          title="Exit Admin Mode"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Exit</span>
        </button>
      </div>
    </div>
  );
};
