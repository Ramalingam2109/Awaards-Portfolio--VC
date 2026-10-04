import React from 'react';

export const Marquee: React.FC = () => {
  const items = [
    'CREATIVE DEVELOPMENT',
    'FULL-STACK ARCHITECTURE',
    'REACT & TYPESCRIPT',
    'AWWWARDS INSPIRATION',
    'MOTION & GSAP',
    'EXCEL DATA SYNCHRONIZATION',
    'TAILWIND CSS',
    'HIGH PERFORMANCE 60FPS',
    'UI/UX ENGINEERING'
  ];

  return (
    <div className="relative w-full py-6 border-y border-white/5 bg-white/[0.01] overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-4 text-xs font-mono font-bold tracking-widest text-white/30 uppercase hover:text-lime-300 transition-colors">
            <span>{text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400/60" />
          </div>
        ))}
      </div>
    </div>
  );
};
