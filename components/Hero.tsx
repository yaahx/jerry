'use client';

import React from 'react';

interface HeroProps {
  artistName: string;
}

const socials = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L2.25 2.25h6.063l4.254 5.622 5.677-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'SoundCloud',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M1.175 12.225c-.015.109-.025.21-.025.325 0 .114.01.216.025.325l.325.025c.108-.015.21-.025.325-.025v-.65c-.115 0-.217-.01-.325-.025l-.325.025Zm2.6-1.3c-.433 0-.82.165-1.117.433A1.73 1.73 0 0 0 2.1 12.55c0 .958.717 1.734 1.675 1.734.957 0 1.733-.776 1.733-1.734S4.73 10.925 3.775 10.925Zm4.333-3.9c-1.3 0-2.383.9-2.633 2.117a3.33 3.33 0 0 0-.7-.075c-1.858 0-3.375 1.517-3.375 3.375S2.917 15.817 4.775 15.817H8.1a3.9 3.9 0 0 0 3.9-3.9 3.9 3.9 0 0 0-3.892-3.892Zm7.642-.65c-.216 0-.425.025-.625.067A5.2 5.2 0 0 0 10.1 9.65v.325h.65V9.65a4.55 4.55 0 0 1 5.0-4.517 4.55 4.55 0 0 1 4.55 4.55v.325h.65V9.65a5.2 5.2 0 0 0-5.2-5.275Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Spotify',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
];

export const Hero: React.FC<HeroProps> = ({ artistName }) => {
  return (
    <section className="relative w-full h-[100svh] min-h-[100svh] pt-20 flex items-center justify-center overflow-hidden border-b border-white/10 select-none">
      {/* Background Burnt Orange Atmospheric Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[350px] sm:h-[450px] bg-gradient-to-r from-[#d9531e]/25 via-[#f36c21]/35 to-[#ff9f43]/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Left vertical social bar */}
      <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-6 z-10">
        {/* Top line */}
        <div className="w-px h-12 bg-white/20" />
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            className="text-stone-500 hover:text-[#f36c21] transition-colors duration-200"
          >
            {s.icon}
          </a>
        ))}
        {/* Bottom line */}
        <div className="w-px h-12 bg-white/20" />
      </div>

      {/* Edge-to-Edge Vector Scaled GTA Typography */}
      <div className="w-full h-full flex items-center justify-center">
        <svg
          viewBox="0 0 1400 230"
          className="w-full h-full overflow-visible select-none"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gtaOrangeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#ffb570" />
              <stop offset="60%" stopColor="#f36c21" />
              <stop offset="100%" stopColor="#d9531e" />
            </linearGradient>
          </defs>

          {/* GTA San Andreas styled sharp graffiti text */}
          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            className="font-black uppercase"
            style={{
              fontFamily: "'Pirata One', 'UnifrakturMaguntia', cursive, sans-serif",
              fontSize: "148px",
              letterSpacing: "0.03em",
              stroke: "#000000",
              strokeWidth: "12px",
              paintOrder: "stroke fill",
              fill: "url(#gtaOrangeGrad)",
            }}
          >
            {artistName}
          </text>
        </svg>
      </div>
    </section>
  );
};
