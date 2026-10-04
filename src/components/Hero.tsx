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
      className="relative h-screen min-h-[600px] max-h-[960px] w-full flex flex-col justify-center items-center bg-[#f8f7f4] overflow-hidden select-none px-4 pt-16 pb-8"
    >
      {/* 1. Interactive 3D Wave Perspective Grid Canvas */}
      <HeroCanvas />

      {/* 2. Ambient Vignette Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(248,247,244,0.6)_100%)] pointer-events-none" />

      {/* Centered Composition fitting viewport layout */}
      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center my-auto z-10">
        
        {/* Background High-End 3D Visual Art Card */}
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
          className="relative w-[300px] sm:w-[420px] md:w-[480px] h-[340px] sm:h-[440px] md:h-[500px] max-h-[58vh] rounded-3xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] bg-[#111111] border border-black/10 group"
        >
          {/* Cinematic Liquid Chrome / 3D Abstract Sculpture */}
          <img
            src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80"
            alt="3D Liquid Metallic Sculpture"
            className="w-full h-full object-cover grayscale contrast-125 brightness-90 opacity-80 transition-transform duration-1000 group-hover:scale-110"
          />

          {/* Deep Glass Reflections & Lighting Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
          
          {/* Sleek Corner Architectural Framing Marks */}
          <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-white/40" />
          <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-white/40" />
          <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-white/40" />
          <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-white/40" />
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
