import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

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
  const imgTranslateX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const imgTranslateY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

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
      className="relative min-h-screen w-full flex items-center justify-center bg-[#fafafa] overflow-hidden select-none px-4"
    >
      {/* Centered Composition matching Huy Ng screenshot */}
      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center py-20">
        
        {/* Background Geometric / Origami 3D Art Card */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            x: imgTranslateX,
            y: imgTranslateY,
            transformPerspective: 1000,
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[300px] sm:w-[420px] md:w-[500px] h-[340px] sm:h-[460px] md:h-[540px] rounded-2xl overflow-hidden shadow-sm bg-[#e8e6df]"
        >
          {/* Origami polygonal architectural background image */}
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
            alt="Abstract geometric artwork"
            className="w-full h-full object-cover grayscale brightness-95 contrast-95 opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#e8e6df]/50 via-transparent to-[#fafafa]/20" />
        </motion.div>

        {/* 3 Overlapping Lines of Massive Bold Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-center leading-[0.88]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* Line 1: Solid Black */}
            <h1 className="text-[clamp(2.8rem,9vw,8.5rem)] font-extrabold font-display tracking-tight text-[#111111] uppercase">
              HEY, I'M RAM
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full my-[-0.05em]"
          >
            {/* Line 2: Outlined / Hollow Text */}
            <h2 className="text-[clamp(2.8rem,9vw,8.5rem)] font-extrabold font-display tracking-tight text-stroke uppercase">
              HEY, I'M RAM
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* Line 3: Solid Black */}
            <h3 className="text-[clamp(2.8rem,9vw,8.5rem)] font-extrabold font-display tracking-tight text-[#111111] uppercase">
              HEY, I'M RAM
            </h3>
          </motion.div>
        </div>

      </div>

      {/* Right side vertical 'scroll -' indicator exactly like screenshot 1 */}
      <div className="absolute right-6 sm:right-10 bottom-12 flex items-center gap-2 rotate-90 origin-right pointer-events-none text-xs tracking-widest text-[#8a8a7c] uppercase font-medium">
        <span>scroll</span>
        <span className="w-4 h-[1px] bg-[#8a8a7c]"></span>
      </div>

    </section>
  );
};
