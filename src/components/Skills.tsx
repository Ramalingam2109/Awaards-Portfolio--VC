import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileSpreadsheet, Plus } from 'lucide-react';
import { Skill } from '../types';
import { soundFX } from '../utils/audio';

interface Props {
  skills: Skill[];
  onOpenExcelManager: () => void;
}

export const Skills: React.FC<Props> = ({ skills, onOpenExcelManager }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database & Cloud', 'Tools & DevOps', 'Core CS'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-lime-400" />
              <span className="text-xs font-mono font-semibold tracking-widest text-lime-400 uppercase">
                03 / Technical Matrix
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white">
              Skills, Tools & Architecture
            </h2>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              onOpenExcelManager();
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400/10 hover:bg-lime-400/20 border border-lime-400/30 text-lime-300 text-xs font-semibold transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Skills via Excel</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFX.playHover();
                setSelectedCategory(cat);
              }}
              className={'px-4 py-2 rounded-full text-xs font-medium transition-all ' + (
                selectedCategory === cat
                  ? 'bg-lime-400 text-black font-bold shadow-md shadow-lime-400/20'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.id || idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              onMouseEnter={() => soundFX.playHover()}
              className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-lime-400/30 transition-all group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-lime-400/80 bg-lime-400/10 px-2.5 py-0.5 rounded-md border border-lime-400/20">
                    {skill.category}
                  </span>
                  <span className="text-xs font-mono text-white/40 font-bold">
                    {skill.level}%
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-white group-hover:text-lime-300 transition-colors flex items-center justify-between">
                  <span>{skill.name}</span>
                  {skill.featured && <Sparkles className="w-3.5 h-3.5 text-lime-400" />}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5">
                <div className="flex items-center justify-between text-[11px] text-white/40 mb-1.5 font-mono">
                  <span>Proficiency</span>
                  <span className="text-white/70 font-semibold">{skill.levelLabel || 'Advanced'}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level + '%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-lime-400/10 via-emerald-400/5 to-transparent border border-lime-400/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-lime-400 text-black font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Continuously Learning & Expanding Stack</h4>
              <p className="text-xs text-white/60">
                Add newly acquired technologies anytime by updating the Excel Skills sheet.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenExcelManager();
            }}
            className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs hover:bg-lime-400 transition-colors shrink-0 shadow-md"
          >
            Open Excel Sync
          </button>
        </div>

      </div>
    </section>
  );
};
