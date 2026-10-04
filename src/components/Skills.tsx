import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const { skills } = portfolioData;

  const categories = ['Frontend', 'Backend', 'Database & Cloud', 'Tools & Architecture'] as const;

  return (
    <section id="skills" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#f4f4f1] text-[#1c1d16] border-t border-[#d2d3c3]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-full md:col-span-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#8C8C73] font-medium">
              Technical Stack
            </span>
          </div>
          <div className="col-span-full md:col-span-8">
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold font-display uppercase leading-[0.95] tracking-tight text-[#1c1d16]">
              Engineering{' '}
              <span className="font-editorial italic font-normal lowercase">Capabilities</span>
            </h2>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, cIdx) => {
            const catSkills = skills.filter((s) => s.category === cat);
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: cIdx * 0.1 }}
                className="p-6 rounded-2xl bg-[#eaeae4] border border-[#d2d3c3]"
              >
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#8C8C73] font-medium mb-5">
                  0{cIdx + 1} / {cat}
                </div>

                <div className="space-y-3">
                  {catSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3 rounded-xl bg-[#f4f4f1] border border-[#d2d3c3]/50 hover:border-[#8C8C73] transition-colors duration-200"
                    >
                      <div className="text-sm font-semibold text-[#1c1d16]">
                        {skill.name}
                      </div>
                      <div className="text-[10px] text-[#8C8C73] mt-0.5 font-mono">
                        {skill.level}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
