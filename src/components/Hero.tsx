import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HeroCanvas } from './HeroCanvas';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle interactive 3D tilt on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const imgTranslateX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const imgTranslateY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen min-h-[600px] max-h-[960px] w-full flex flex-col justify-center items-center bg-[#fafafa] overflow-hidden select-none px-4 pt-16 pb-8"
    >
      {/* 1. Subtle Architectural Dot Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#d5d1c8_1px,transparent_1px)] [background-size:28px_28px] opacity-60 pointer-events-none" />

      {/* 2. Interactive Kinetic Wave & Constellation Canvas */}
      <HeroCanvas />

      {/* 3. Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(250,250,250,0.8)_100%)] pointer-events-none" />

      {/* Editorial Micro-Details (Top Left & Bottom Left) */}
      <div className="absolute top-24 left-6 sm:left-12 pointer-events-none z-10 flex flex-col gap-1">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#8a8a7c] uppercase">
          RAM // PORTFOLIO
        </span>
        <span className="text-[10px] font-mono tracking-wider text-[#a3a396]">
          FULL-STACK SOFTWARE ENGINEER
        </span>
      </div>

      <div className="absolute bottom-10 left-6 sm:left-12 pointer-events-none z-10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#8a8a7c] uppercase">
          CHENNAI, IN // 2026
        </span>
      </div>

      {/* Centered Composition fitting viewport layout */}
      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center my-auto z-10">
        
        {/* Background Geometric / 3D Art Card */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            x: imgTranslateX,
            y: imgTranslateY,
            transformPerspective: 1000,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[280px] sm:w-[380px] md:w-[440px] h-[320px] sm:h-[420px] md:h-[480px] max-h-[55vh] rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] bg-[#e8e6df] border border-black/10 group"
        >
          {/* Dynamic 3D Geometric Architectural Artwork */}
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
            alt="Abstract architectural sculpture"
            className="w-full h-full object-cover grayscale contrast-105 brightness-95 opacity-90 transition-transform duration-700 group-hover:scale-105"
          />

          {/* Glass Sheen & Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#e8e6df]/60 via-transparent to-[#fafafa]/20" />
          
          {/* Corner Framing Marks */}
          <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-black/30" />
          <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-black/30" />
          <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-black/30" />
          <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-black/30" />
        </motion.div>

        {/* 3 Overlapping Lines: strictly ONE line each (whitespace-nowrap) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-center leading-[0.85]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            {/* Line 1: Solid Black */}
            <h1 className="text-[clamp(2.2rem,6.5vw,5.8rem)] font-black font-display tracking-tight text-[#111111] uppercase whitespace-nowrap drop-shadow-sm">
              HEY, I'M RAM
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center my-[-0.04em]"
          >
            {/* Line 2: Outlined / Hollow Text */}
            <h2 className="text-[clamp(2.2rem,6.5vw,5.8rem)] font-black font-display tracking-tight text-stroke uppercase whitespace-nowrap">
              HEY, I'M RAM
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            {/* Line 3: Solid Black */}
            <h3 className="text-[clamp(2.2rem,6.5vw,5.8rem)] font-black font-display tracking-tight text-[#111111] uppercase whitespace-nowrap drop-shadow-sm">
              HEY, I'M RAM
            </h3>
          </motion.div>
        </div>

      </div>

      {/* Right side vertical 'scroll -' indicator */}
      <div className="absolute right-4 sm:right-8 bottom-10 flex items-center gap-2 rotate-90 origin-right pointer-events-none text-[11px] tracking-widest text-[#8a8a7c] uppercase font-medium z-10">
        <span>scroll</span>
        <span className="w-4 h-[1px] bg-[#8a8a7c]"></span>
      </div>

    </section>
  );
};
