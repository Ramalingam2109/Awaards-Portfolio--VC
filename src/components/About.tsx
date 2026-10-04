import React from 'react';
import { MapPin, Github, ArrowUpRight } from 'lucide-react';
import { ProfileData, Stat } from '../types';
import { soundFX } from '../utils/audio';

interface Props {
  profile: ProfileData;
  stats: Stat[];
}

export const About: React.FC<Props> = ({ profile, stats }) => {
  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-lime-400" />
          <span className="text-xs font-mono font-semibold tracking-widest text-lime-400 uppercase">
            01 / Identity & Philosophy
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Building at the intersection of{' '}
              <span className="text-lime-300">aesthetic motion</span>, robust systems, and scalable code.
            </h2>

            <div className="text-white/70 text-base sm:text-lg leading-relaxed space-y-4 font-normal">
              <p>
                {profile.bio || 'I am a passionate software developer and engineer from Chennai, India, dedicated to transforming creative concepts into scalable, award-grade digital products.'}
              </p>
              <p className="text-white/50 text-sm sm:text-base">
                My design and engineering philosophy revolves around obsessive attention to detail, micro-animations that feel organic, and maintainable full-stack software architecture.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-lime-400/30 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-lime-400 mt-1 truncate">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-white/40 mt-0.5">
                    {stat.subtext}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#15151c] to-[#0e0e12] border border-white/10 relative overflow-hidden shadow-2xl group">
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-lime-400/20 rounded-full blur-2xl group-hover:bg-lime-400/30 transition-all" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center font-display font-black text-2xl text-lime-400">
                    R
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#121216]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-white">{profile.name}</h3>
                  <p className="text-xs text-lime-400 font-mono">{profile.title}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-white/70 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Base Location</span>
                  <span className="font-medium text-white flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-lime-400" />
                    {profile.location}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Experience</span>
                  <span className="font-medium text-white">{profile.yearsOfExperience} Industry & Projects</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">GitHub Profile</span>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-lime-400 hover:underline flex items-center gap-1"
                  >
                    Ramalingam2109
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Availability</span>
                  <span className="font-medium text-emerald-400">Open for Remote / Hybrid</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex gap-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundFX.playHover()}
                  onClick={() => soundFX.playClick()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={'mailto:' + profile.email}
                  onMouseEnter={() => soundFX.playHover()}
                  onClick={() => soundFX.playClick()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold transition-all shadow-md"
                >
                  <span>Email Me</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
