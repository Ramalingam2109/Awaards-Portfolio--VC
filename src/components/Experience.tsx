import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

export const ExperienceSection: React.FC = () => {
  const { experiences } = portfolioData;

  return (
    <section id="experience" className="py-28 sm:py-36 px-4 sm:px-8 relative bg-[#0c0c0e] text-[#f3efe6] border-t border-white/10 transition-colors duration-700">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#c8e972]" />
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#c8e972] uppercase">
            04 / Experience & Milestones
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white mb-16">
          Professional <span className="font-editorial italic font-normal text-4xl sm:text-5xl md:text-6xl">Journey</span>
        </h2>

        <div className="relative border-l border-white/10 ml-3 sm:ml-6 space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => soundFX.playHover()}
              className="relative pl-8 sm:pl-12 group"
            >
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#141418] border border-white/20 flex items-center justify-center group-hover:border-[#c8e972] group-hover:bg-[#c8e972]/10 transition-colors shadow-lg">
                <Briefcase className="w-3.5 h-3.5 text-[#c8e972]" />
              </div>

              <div className="p-7 sm:p-9 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-2xl font-bold font-display text-white group-hover:text-[#c8e972] transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#c8e972]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-white/50 mb-4 font-mono">
                  <span className="text-white/90 font-medium">{exp.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-white/40" />
                    {exp.location}
                  </span>
                </div>

                <p className="text-white/70 text-sm sm:text-base leading-relaxed font-normal">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-white/5">
                  {exp.stack.map((s, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
