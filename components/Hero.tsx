'use client';

import React from 'react';

interface HeroProps {
  artistName: string;
}

export const Hero: React.FC<HeroProps> = ({ artistName }) => {
  return (
    <section className="relative w-full min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center py-12 sm:py-16 lg:py-24 overflow-hidden border-b border-white/10 select-none px-2 sm:px-4">
      {/* Background Burnt Orange Atmospheric Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[350px] sm:h-[450px] bg-gradient-to-r from-[#d9531e]/25 via-[#f36c21]/35 to-[#ff9f43]/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Edge-to-Edge Vector Scaled GTA Typography: Fills screen, zero cut-off words */}
      <div className="w-full flex items-center justify-center">
        <svg
          viewBox="0 0 1400 230"
          className="w-full h-auto max-h-[65vh] overflow-visible select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gtaOrangeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#ffb570" />
              <stop offset="60%" stopColor="#f36c21" />
              <stop offset="100%" stopColor="#993300" />
            </linearGradient>

            <filter id="gta3DShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="3" dy="3" stdDeviation="0" floodColor="#000000" />
              <feDropShadow dx="-2" dy="-2" stdDeviation="0" floodColor="#000000" />
              <feDropShadow dx="7" dy="10" stdDeviation="2" floodColor="#1a0a03" />
              <feDropShadow dx="0" dy="0" stdDeviation="18" floodColor="rgba(243, 108, 33, 0.5)" />
            </filter>
          </defs>

          {/* GTA San Andreas styled text */}
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
              strokeWidth: "14px",
              paintOrder: "stroke fill",
              fill: "url(#gtaOrangeGrad)",
              filter: "url(#gta3DShadow)",
            }}
          >
            {artistName}
          </text>
        </svg>
      </div>
    </section>
  );
};
