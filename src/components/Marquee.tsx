import React from 'react';
import { motion } from 'framer-motion';

export const Marquee: React.FC = () => {
  const items = [
    'CREATIVE DEVELOPMENT',
    'UI ENGINEERING',
    'FULL-STACK',
    'MOTION DESIGN',
    'REACT & TYPESCRIPT',
    'PERFORMANCE',
    'DESIGN SYSTEMS',
    'WEB ANIMATION'
  ];

  return (
    <div className="relative w-full py-5 border-y border-[#d2d3c3] bg-[#f4f4f1] text-[#1c1d16] overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-8 mx-8 text-[11px] tracking-[0.3em] uppercase font-medium text-[#8C8C73] hover:text-[#1c1d16] transition-colors duration-300">
            <span>{text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C8C73]" />
          </div>
        ))}
      </div>
    </div>
  );
};
