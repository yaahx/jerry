'use client';

import React from 'react';

interface HeroProps {
  artistName: string;
}

export const Hero: React.FC<HeroProps> = ({ artistName }) => {
  return (
    <section className="relative w-full min-h-[60vh] lg:min-h-[75vh] flex items-center justify-center py-20 lg:py-28 overflow-hidden border-b border-white/10 select-none">
      {/* San Andreas Golden Hour / Burnt Orange Atmospheric Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[350px] sm:h-[450px] bg-gradient-to-r from-[#d9531e]/25 via-[#f36c21]/35 to-[#ff9f43]/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Massive GTA San Andreas Styled "uglydogsarecute" */}
      <div className="w-full flex flex-col items-center justify-center px-2 text-center">
        <h1 className="gta-title text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] 2xl:text-[15rem] font-black uppercase tracking-[0.03em] leading-[0.88] cursor-default">
          {artistName}
        </h1>
      </div>
    </section>
  );
};
