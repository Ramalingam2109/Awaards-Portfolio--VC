import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HeroCanvas } from './HeroCanvas';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 160 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const floatX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const floatY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);
  const antiX = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const antiY = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
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
      className="relative h-screen min-h-[600px] max-h-[960px] w-full flex flex-col justify-center items-center overflow-hidden select-none px-4 pt-16 pb-8"
    >
      {/* Animated Ambient Mesh Gradient Background */}
      <HeroCanvas />

      {/* Decorative Floating Rings — top-right, parallax */}
      <motion.div
        style={{ x: floatX, y: floatY }}
        className="absolute top-[10%] right-[7%] w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] rounded-full border border-[#ccc8c0]/60 pointer-events-none z-0"
      />
      <motion.div
        style={{ x: floatX, y: floatY }}
        className="absolute top-[15%] right-[10%] w-[170px] h-[170px] sm:w-[240px] sm:h-[240px] rounded-full border border-[#ccc8c0]/35 pointer-events-none z-0"
      />

      {/* Decorative Rotated Square — bottom-left, counter parallax */}
      <motion.div
        style={{ x: antiX, y: antiY }}
        className="absolute bottom-[12%] left-[5%] w-[110px] h-[110px] sm:w-[155px] sm:h-[155px] border border-[#bbb6ad]/40 rotate-[15deg] pointer-events-none z-0"
      />
      <motion.div
        style={{ x: antiX, y: antiY }}
        className="absolute bottom-[15%] left-[7%] w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] border border-[#bbb6ad]/20 rotate-[15deg] pointer-events-none z-0"
      />

      {/* Floating accent dots */}
      <motion.div style={{ x: floatX, y: floatY }} className="absolute top-[36%] left-[4%] w-2 h-2 rounded-full bg-[#aaa49c]/45 pointer-events-none z-0" />
      <motion.div style={{ x: antiX, y: antiY }} className="absolute bottom-[36%] right-[5%] w-1.5 h-1.5 rounded-full bg-[#aaa49c]/40 pointer-events-none z-0" />

      {/* Left edge vertical label */}
      <div className="absolute left-5 sm:left-10 top-1/2 -translate-y-1/2 pointer-events-none z-10 hidden sm:flex flex-col items-center gap-3">
        <span className="text-[10px] font-mono tracking-[0.22em] text-[#9a9588] uppercase [writing-mode:vertical-rl] rotate-180">
          Software Engineer
        </span>
        <span className="w-px h-12 bg-[#c4bfb6]" />
      </div>

      {/* Right edge label */}
      <div className="absolute right-5 sm:right-10 top-1/2 -translate-y-1/2 pointer-events-none z-10 hidden sm:flex flex-col items-center gap-3">
        <span className="w-px h-12 bg-[#c4bfb6]" />
        <span className="text-[10px] font-mono tracking-[0.22em] text-[#9a9588] uppercase [writing-mode:vertical-rl]">
          Chennai · India
        </span>
      </div>

      {/* Bottom-left: open to work */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="absolute bottom-7 left-6 sm:left-12 pointer-events-none z-10 flex items-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#8a8a7c] uppercase">
          Open to Opportunities
        </span>
      </motion.div>

      {/* Bottom-right: year */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="absolute bottom-7 right-6 sm:right-12 pointer-events-none z-10"
      >
        <span className="text-[10px] font-mono tracking-widest text-[#a8a49e]">© 2026</span>
      </motion.div>

      {/* -- HERO TYPOGRAPHY — clean on ambient background -- */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full text-center leading-[0.88] pointer-events-none">

        {/* Pre-heading pill label */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05 }}
          className="mb-6"
        >
          <span className="inline-block text-[11px] sm:text-[12px] font-mono tracking-[0.26em] text-[#8a8880] uppercase border border-[#cdc9c1] rounded-full px-5 py-1.5 bg-white/50 backdrop-blur-sm">
            Full-Stack Software Engineer
          </span>
        </motion.div>

        {/* Line 1: Solid */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.82, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.4rem,7vw,6.4rem)] font-black font-display tracking-tight text-[#111111] uppercase whitespace-nowrap"
        >
          HEY, I'M RAM
        </motion.h1>

        {/* Line 2: Outlined */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.82, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.4rem,7vw,6.4rem)] font-black font-display tracking-tight text-stroke uppercase whitespace-nowrap my-[-0.035em]"
        >
          HEY, I'M RAM
        </motion.h2>

        {/* Line 3: Solid */}
        <motion.h3
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.82, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.4rem,7vw,6.4rem)] font-black font-display tracking-tight text-[#111111] uppercase whitespace-nowrap"
        >
          HEY, I'M RAM
        </motion.h3>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.50 }}
          className="mt-7 text-[13px] sm:text-[14px] font-mono tracking-wide text-[#797770] max-w-[280px] sm:max-w-sm leading-relaxed"
        >
          Building clean, scalable web systems from Chennai, India.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-9 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-[#b5b0a8]" />
          <span className="text-[11px] font-mono tracking-[0.22em] text-[#9a9588] uppercase">Scroll to explore</span>
          <span className="w-8 h-px bg-[#b5b0a8]" />
        </motion.div>
      </div>

    </section>
  );
};
