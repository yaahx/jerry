'use client';

import React, { useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Track } from '@/lib/types';

interface AudioPlayerBarProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  currentTime: number;
  duration: number;
  onSeek: (pos: number) => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  audioRef,
  currentTime,
  duration,
  onSeek,
  volume,
  onVolumeChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated spectrum visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 14;
      const barWidth = canvas.width / bars - 2;

      for (let i = 0; i < bars; i++) {
        let barHeight = 4;
        if (isPlaying) {
          barHeight = Math.max(
            4,
            Math.sin(Date.now() / 150 + i * 0.7) * 12 + Math.random() * 8 + 6
          );
        }
        const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
        grad.addColorStop(0, '#f36c21');
        grad.addColorStop(1, '#ff9f43');
        ctx.fillStyle = grad;
        ctx.fillRect(i * (barWidth + 2), canvas.height - barHeight, barWidth, barHeight);
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  if (!currentTrack) return null;

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPos = (e.clientX - rect.left) / rect.width;
    onSeek(clickPos);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-24 bg-[#0e0b09]/98 backdrop-blur-2xl border-t border-white/10 px-6 sm:px-10 flex items-center justify-between gap-6">
      {/* Left: Track Info */}
      <div className="flex items-center gap-4 min-w-0 max-w-[320px]">
        <img
          src={currentTrack.art || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600'}
          alt={currentTrack.title}
          className="w-14 h-14 object-cover border border-white/15 shrink-0"
        />
        <div className="min-w-0">
          <div className="font-display font-extrabold text-base sm:text-lg text-white truncate tracking-tight">
            {currentTrack.title}
          </div>
          <div className="text-xs sm:text-sm text-stone-400 truncate font-semibold uppercase tracking-wider">
            {currentTrack.artist}
          </div>
        </div>
      </div>

      {/* Center: Controls & Scrubbing */}
      <div className="flex-1 max-w-xl flex flex-col items-center">
        {/* Buttons */}
        <div className="flex items-center gap-6 mb-2">
          <button
            onClick={onPrev}
            className="text-stone-400 hover:text-white transition-colors"
            title="Previous Track"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            onClick={onTogglePlay}
            className="w-11 h-11 bg-[#f36c21] hover:bg-[#ff7b34] text-white flex items-center justify-center transition-transform hover:scale-105 shadow-[0_0_20px_rgba(243,108,33,0.5)]"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-white" />
            ) : (
              <Play className="w-5 h-5 fill-white ml-0.5" />
            )}
          </button>
          <button
            onClick={onNext}
            className="text-stone-400 hover:text-white transition-colors"
            title="Next Track"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar - Sharp */}
        <div className="w-full flex items-center gap-3">
          <span className="text-xs text-stone-400 w-10 text-right font-mono font-medium">
            {formatTime(currentTime)}
          </span>
          <div
            onClick={handleProgressBarClick}
            className="flex-1 h-2 bg-white/10 cursor-pointer relative overflow-hidden group"
          >
            <div
              className="h-full bg-gradient-to-r from-[#d9531e] to-[#f36c21] relative"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-xs text-stone-400 w-10 font-mono font-medium">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Right: Visualizer & Volume */}
      <div className="hidden sm:flex items-center gap-6 justify-end min-w-[220px]">
        {/* Canvas Visualizer */}
        <canvas
          ref={canvasRef}
          width={100}
          height={28}
        />

        {/* Volume Slider */}
        <div className="flex items-center gap-2.5">
          <Volume2 className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-20 accent-[#f36c21] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
