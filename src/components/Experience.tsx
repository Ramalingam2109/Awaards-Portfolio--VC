import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, GitPullRequest, Calendar, MapPin } from 'lucide-react';
import { Experience } from '../types';
import { soundFX } from '../utils/audio';

interface Props {
  experiences: Experience[];
}

export const ExperienceSection: React.FC<Props> = ({ experiences }) => {
  const getIcon = (type: Experience['type']) => {
    switch (type) {
      case 'Education':
        return <GraduationCap className="w-4 h-4 text-cyan-400" />;
      case 'Open Source':
        return <GitPullRequest className="w-4 h-4 text-purple-400" />;
      default:
        return <Briefcase className="w-4 h-4 text-lime-400" />;
    }
  };

  return (
    <section id="experience" className="py-24 sm:py-32 px-4 sm:px-6 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-lime-400" />
          <span className="text-xs font-mono font-semibold tracking-widest text-lime-400 uppercase">
            04 / Experience & Milestones
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-16">
          Professional Journey
        </h2>

        <div className="relative border-l border-white/10 ml-3 sm:ml-6 space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id || idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => soundFX.playHover()}
              className="relative pl-8 sm:pl-12 group"
            >
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#121216] border border-white/20 flex items-center justify-center group-hover:border-lime-400 group-hover:bg-lime-400/10 transition-colors shadow-lg">
                {getIcon(exp.type)}
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-lime-400/30 transition-all shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold font-display text-white group-hover:text-lime-300 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 text-[11px] font-mono">
                      {exp.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-lime-400 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-white/50 mb-4 font-mono">
                  <span className="text-white/90 font-medium">{exp.company}</span>
                  {exp.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-white/40" />
                        {exp.location}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  {exp.description}
                </p>

                {exp.skillsUsed && exp.skillsUsed.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/5">
                    {exp.skillsUsed.map((s, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
