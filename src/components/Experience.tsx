import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const { experiences } = portfolioData;

  return (
    <section id="experience" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#0B0B0A] text-[#e8e8df] rounded-t-3xl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-full md:col-span-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#8C8C73] font-medium">
              Experience
            </span>
          </div>
          <div className="col-span-full md:col-span-8">
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold font-display uppercase leading-[0.95] tracking-tight text-[#e8e8df]">
              Professional{' '}
              <span className="font-editorial italic font-normal lowercase">Journey</span>
            </h2>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative ml-3 sm:ml-6 border-l border-white/10 space-y-10">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 sm:pl-12 group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-2 w-[18px] h-[18px] rounded-full bg-[#0B0B0A] border-2 border-[#38392e] group-hover:border-[#8C8C73] transition-colors" />

              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold font-display text-[#e8e8df] uppercase tracking-tight group-hover:text-[#b6b79f] transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#8C8C73] font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#62644c] mb-4 font-mono">
                  <span className="text-[#b6b79f]">{exp.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </span>
                </div>

                <p className="text-[#9b9c7f] text-sm leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/5">
                  {exp.stack.map((s, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-[#8C8C73]"
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
