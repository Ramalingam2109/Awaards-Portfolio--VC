import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Github, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

export const Hero: React.FC = () => {
  const { profile } = portfolioData;

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 pt-32 pb-12 overflow-hidden bg-[#0c0c0e] text-[#f3efe6]">
      {/* Background radial gradient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#c8e972]/10 via-[#c8e972]/[0.02] to-transparent rounded-full blur-[140px] pointer-events-none" />
      
      {/* Sub-grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md relative z-10"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-mono tracking-wider opacity-85">
          {profile.status}
        </span>
        <span className="opacity-30 text-xs">/</span>
        <span className="text-xs font-mono opacity-70 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#c8e972]" />
          {profile.location}
        </span>
      </motion.div>

      {/* Main Kinetic Headline */}
      <div className="w-full max-w-6xl mx-auto my-auto text-center relative z-10 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase opacity-50 mb-2">
            Independent Portfolio
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold font-display tracking-tighter uppercase leading-[0.95]">
            <span>RAM</span>
            <br />
            <span className="font-editorial italic font-normal lowercase tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f3efe6] via-[#c8e972] to-[#f3efe6]">
              creative developer
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl opacity-65 font-normal leading-relaxed pt-4">
            {profile.headline}
          </p>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <a
            href="#works"
            onMouseEnter={() => soundFX.playHover()}
            onClick={() => soundFX.playClick()}
            className="px-8 py-4 rounded-full bg-[#f3efe6] text-[#0c0c0e] font-bold text-xs uppercase tracking-widest hover:bg-[#c8e972] transition-all flex items-center gap-2 shadow-2xl hover:scale-105 group"
          >
            <span>Explore Works</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundFX.playHover()}
            onClick={() => soundFX.playClick()}
            className="px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
          </a>
        </motion.div>
      </div>

      {/* Bottom Ticker Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full max-w-6xl flex items-center justify-between text-xs font-mono opacity-40 border-t border-white/10 pt-6 relative z-10"
      >
        <span>SCROLL TO EXPLORE</span>
        <span>CHENNAI, INDIA (IST)</span>
      </motion.div>
    </section>
  );
};
