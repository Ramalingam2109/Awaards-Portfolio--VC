import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const statementText = "I engineer modern web applications and scalable software systems with an emphasis on clean architecture, performance, and intuitive user experiences.";

export const Statement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"]
  });

  const words = statementText.split(" ");

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col justify-center items-center bg-[#0e0e0e] text-[#f0f0f0] px-6 sm:px-12 lg:px-20 py-32 sm:py-48 transition-colors duration-700"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col justify-between">
        
        {/* Scroll-driven Word-by-Word Reveal Animation */}
        <p className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.2] flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-2 sm:gap-y-3">
          {words.map((word, index) => {
            const start = index / words.length;
            const end = start + (1 / words.length);
            // Opacity transforms smoothly based on scroll position
            return (
              <Word key={index} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>

        {/* Status Indicator & Alignment Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 sm:mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#8a8a7c]"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[#e0e0e0] font-medium">Software Development & Web Engineering</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Chennai, India (IST)</span>
            <span className="opacity-30">•</span>
            <span>Available for Opportunities</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block transition-colors duration-200"
    >
      {children}
    </motion.span>
  );
};
