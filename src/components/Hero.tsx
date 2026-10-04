import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Github, Sparkles, MapPin, FileSpreadsheet } from 'lucide-react';
import { ProfileData } from '../types';
import { soundFX } from '../utils/audio';

interface Props {
  profile: ProfileData;
  onOpenExcelManager: () => void;
}

export const Hero: React.FC<Props> = ({ profile, onOpenExcelManager }) => {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 pt-28 pb-16 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-lime-400/[0.07] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-400/[0.07] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-white/80 font-medium tracking-wide">
            {profile.status || 'Open to Work — Remote / Freelance'}
          </span>
          <span className="text-white/30 text-xs">|</span>
          <span className="text-xs font-mono text-white/60 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-lime-400" />
            {profile.location || 'Chennai, India'}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 sm:space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white uppercase leading-[1.05]">
            <span>Engineering</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-300 to-cyan-300">
              Creative
            </span>
            <br />
            <span>Digital Systems</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/65 font-normal leading-relaxed pt-3">
            {profile.headline || 'Crafting digital experiences with precision, aesthetic engineering, and high-performance code.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-10"
        >
          <a
            href="#works"
            onMouseEnter={() => soundFX.playHover()}
            onClick={() => soundFX.playClick()}
            className="px-7 py-3.5 rounded-full bg-white text-black font-bold text-sm tracking-tight hover:bg-lime-400 transition-all flex items-center gap-2 shadow-xl hover:shadow-lime-400/20 group"
          >
            <span>Explore Works</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundFX.playHover()}
            onClick={() => soundFX.playClick()}
            className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all flex items-center gap-2"
          >
            <Github className="w-4 h-4 text-white" />
            <span>GitHub Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/50" />
          </a>

          <button
            onClick={() => {
              soundFX.playClick();
              onOpenExcelManager();
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="px-5 py-3.5 rounded-full bg-lime-400/10 hover:bg-lime-400/20 border border-lime-400/20 text-lime-300 font-semibold text-sm transition-all flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-lime-400" />
            <span>Edit via Excel</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center gap-6 mt-14 text-xs font-mono text-white/40"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            Awwwards Inspired
          </span>
          <span>•</span>
          <span>Lenis Smooth Scroll</span>
          <span>•</span>
          <span>Excel Sync Active</span>
        </motion.div>
      </div>
    </section>
  );
};
