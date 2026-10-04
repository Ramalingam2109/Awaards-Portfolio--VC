import React from 'react';
import { motion } from 'framer-motion';

export const Statement: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-[75vh] flex items-center justify-center bg-[#0e0e0e] text-[#f0f0f0] px-6 sm:px-12 lg:px-20 py-24 sm:py-36 transition-colors duration-700"
    >
      <div className="w-full max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#f0f0f0] leading-[1.18]"
        >
          I engineer modern web applications and scalable software systems with an emphasis on clean architecture, performance, and intuitive user experiences.
        </motion.p>

        {/* Status indicator row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 sm:mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#8a8a7c]"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Software Development & Web Engineering</span>
          </div>
          <span>Based in Chennai, India</span>
        </motion.div>
      </div>
    </section>
  );
};
