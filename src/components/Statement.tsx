import React from 'react';
import { motion } from 'framer-motion';

export const Statement: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-[85vh] flex items-center justify-center bg-[#0e0e0e] text-[#f0f0f0] px-6 sm:px-12 lg:px-20 py-28 sm:py-40 transition-colors duration-700"
    >
      <div className="w-full max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[#f0f0f0] leading-[1.12]"
        >
          I create elevating digital experiences that inspire and connect with people through development and design.
        </motion.p>

        {/* Small subtle metadata row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 sm:mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#8a8a7c]"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Based in Chennai, India — Available Worldwide</span>
          </div>
          <span>Engineering + Interactive Web</span>
        </motion.div>
      </div>
    </section>
  );
};
