import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

export const Skills: React.FC = () => {
  const { skills } = portfolioData;

  const categories = ['Frontend', 'Backend', 'Database & Cloud', 'Tools & Architecture'] as const;

  return (
    <section id="skills" className="py-28 sm:py-36 px-4 sm:px-8 relative bg-[#f3efe6] text-[#121215] border-t border-black/10 transition-colors duration-700">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#121215]" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#121215]/60 uppercase">
              03 / Technical Stack
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-[#121215]">
            Engineering Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, cIdx) => {
            const catSkills = skills.filter((s) => s.category === cat);
            return (
              <div
                key={cat}
                className="p-7 rounded-3xl bg-[#e8e2d8] border border-black/10 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#121215]/50 font-bold mb-4">
                    0{cIdx + 1} / {cat}
                  </div>

                  <div className="space-y-4">
                    {catSkills.map((skill) => (
                      <div
                        key={skill.id}
                        onMouseEnter={() => soundFX.playHover()}
                        className="p-3.5 rounded-2xl bg-black/[0.04] border border-black/5 hover:border-black/20 transition-all"
                      >
                        <div className="text-sm font-bold font-display text-[#121215]">
                          {skill.name}
                        </div>
                        <div className="text-[10px] font-mono text-[#121215]/60 mt-0.5">
                          {skill.level}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
