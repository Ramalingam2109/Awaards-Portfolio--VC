import React from 'react';

export const Marquee: React.FC = () => {
  const items = [
    'CREATIVE ENGINEERING',
    'MOTION DESIGN',
    'FULL-STACK SYSTEMS',
    'REACT & TYPESCRIPT',
    'MINIMALIST LUXURY',
    'AWWWARDS INSPIRATION',
    'LENIS SMOOTH SCROLL',
    'HIGH PERFORMANCE 60FPS'
  ];

  return (
    <div className="relative w-full py-6 border-y border-white/10 bg-[#0c0c0e] text-[#f3efe6] overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-8 mx-6 text-xs font-mono font-bold tracking-[0.25em] opacity-40 uppercase hover:opacity-100 hover:text-[#c8e972] transition-all">
            <span>{text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8e972]" />
          </div>
        ))}
      </div>
    </div>
  );
};
