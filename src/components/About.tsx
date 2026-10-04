import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight, Github } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

export const About: React.FC = () => {
  const { profile, stats } = portfolioData;

  return (
    <section id="about" className="py-28 sm:py-36 px-4 sm:px-8 relative bg-[#f3efe6] text-[#121215] transition-colors duration-700">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Pill */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#121215]" />
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#121215]/60 uppercase">
            01 / Identity & Philosophy
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Main Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight leading-[1.08] text-[#121215]">
              Engineering digital experiences where <span className="font-editorial italic font-normal text-3xl sm:text-5xl md:text-6xl">beauty</span> meets rigorous software architecture.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#121215]/75 leading-relaxed font-normal">
              <p>
                {profile.bio}
              </p>
              <p className="text-[#121215]/60 text-sm sm:text-base">
                I believe great software should not only execute with flawless speed but evoke emotion through subtle typography, intentional pacing, and natural micro-interactions.
              </p>
            </div>

            {/* Stat Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-black/10">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-black/[0.03] border border-black/5 hover:border-black/20 transition-colors">
                  <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#121215] tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-xs font-bold text-[#121215]/90 mt-1 truncate">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-[#121215]/50 mt-0.5">
                    {stat.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Badge Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#e8e2d8] border border-black/10 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#121215] text-[#f3efe6] flex items-center justify-center font-display font-black text-2xl shadow-md">
                  RAM
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-[#121215]">RAM</h3>
                  <p className="text-xs text-[#121215]/60 font-mono">{profile.tagline}</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-[#121215]/80 border-t border-black/10 pt-5">
                <div className="flex items-center justify-between">
                  <span className="opacity-50">Location</span>
                  <span className="font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#121215]" />
                    {profile.location}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="opacity-50">Experience</span>
                  <span className="font-semibold">{profile.yearsExp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="opacity-50">GitHub</span>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:underline flex items-center gap-1"
                  >
                    Ramalingam2109
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="opacity-50">Status</span>
                  <span className="font-semibold text-emerald-700">Open to select work</span>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-black/10 flex gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundFX.playHover()}
                  onClick={() => soundFX.playClick()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-black/5 hover:bg-black/10 border border-black/10 text-xs font-bold transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="#contact"
                  onMouseEnter={() => soundFX.playHover()}
                  onClick={() => soundFX.playClick()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#121215] hover:bg-black text-[#f3efe6] text-xs font-bold transition-all shadow-md"
                >
                  <span>Connect</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
