import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { portfolioData, PeriodicSkill } from '../data/portfolioData';

export const PeriodicSkills: React.FC = () => {
  const { periodicSkills } = portfolioData;
  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  
  // Default active skill (React)
  const [activeSkill, setActiveSkill] = useState<PeriodicSkill>(
    periodicSkills.find((s) => s.symbol === 'Re') || periodicSkills[0]
  );

  const families = [
    'All',
    'Languages',
    'Frameworks',
    'Databases',
    'DevOps & Cloud',
    'Core Skills',
    'Tools & IDEs'
  ];

  // Primary first row: highly important core skills
  const primarySkills = periodicSkills.filter((s) => s.featured);

  // If expanded, allow filtering across all skills; otherwise show primary first row
  const visibleSkills = showAll
    ? (selectedFamily === 'All'
        ? periodicSkills
        : periodicSkills.filter((s) => s.family === selectedFamily))
    : primarySkills;

  // Family color accents
  const getFamilyColor = (family: PeriodicSkill['family'], isSelected: boolean) => {
    switch (family) {
      case 'Languages':
        return isSelected
          ? 'bg-[#18181b] text-white border-black'
          : 'bg-[#27272a] text-white border-transparent hover:bg-[#18181b]';
      case 'Frameworks':
        return isSelected
          ? 'bg-[#212126] text-white border-black'
          : 'bg-[#323238] text-white border-transparent hover:bg-[#212126]';
      case 'Databases':
        return isSelected
          ? 'bg-[#6b695c] text-white border-[#38372e]'
          : 'bg-[#7c7a6c] text-white border-transparent hover:bg-[#6b695c]';
      case 'DevOps & Cloud':
        return isSelected
          ? 'bg-[#8c8a7b] text-white border-[#5c5a4d]'
          : 'bg-[#9c9a8b] text-white border-transparent hover:bg-[#8c8a7b]';
      case 'Core Skills':
        return isSelected
          ? 'bg-[#b8b6a8] text-[#1c1c1a] border-[#8c8a7b]'
          : 'bg-[#c8c6b8] text-[#1c1c1a] border-transparent hover:bg-[#b8b6a8]';
      case 'Tools & IDEs':
        return isSelected
          ? 'bg-[#d8d6c8] text-[#1c1c1a] border-[#a8a698]'
          : 'bg-[#e5e3d7] text-[#1c1c1a] border-transparent hover:bg-[#d8d6c8]';
      default:
        return 'bg-[#27272a] text-white';
    }
  };

  return (
    <section id="skills" className="relative py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-[#fafafa] text-[#111111] border-t border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#8a8a7c] uppercase">
              Technical Stack
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-[#111111] mt-2 mb-3">
              technical skills.
            </h2>
            <p className="text-sm sm:text-base text-[#666660] max-w-2xl leading-relaxed">
              Core technologies, frameworks, and engineering tools I work with. Hover any tile to inspect details.
            </p>
          </div>
        </div>

        {/* Filter Pills (Visible when expanded) */}
        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {families.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFamily(f)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 border ${
                  selectedFamily === f
                    ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                    : 'bg-white text-[#666660] border-[#e0e0dc] hover:border-[#111111] hover:text-[#111111]'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        )}

        {/* Main Layout: Tiles Grid + Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Tiles Grid */}
          <div className="lg:col-span-8">
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-3"
            >
              {visibleSkills.map((skill) => {
                const isActive = activeSkill?.id === skill.id;
                const tileClass = getFamilyColor(skill.family, isActive);

                return (
                  <motion.div
                    key={skill.id}
                    layout
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => setActiveSkill(skill)}
                    onClick={() => setActiveSkill(skill)}
                    className={`relative p-3.5 sm:p-4 aspect-square rounded-2xl cursor-pointer flex flex-col justify-between transition-all duration-200 shadow-sm border ${tileClass} ${
                      isActive ? 'ring-2 ring-[#111111] ring-offset-2' : ''
                    }`}
                  >
                    {/* Minimal Top Indicator */}
                    <div className="flex items-center justify-between">
                      <span className="w-1.5 h-1.5 rounded-full opacity-60 bg-current"></span>
                      <span className="text-[9px] font-mono opacity-60 uppercase tracking-wider">
                        {skill.family.split(' ')[0]}
                      </span>
                    </div>

                    {/* Bold 2-Letter Symbol */}
                    <div className="text-2xl sm:text-3xl font-black font-display tracking-tight text-center my-auto leading-none">
                      {skill.symbol}
                    </div>

                    {/* Skill Name */}
                    <div className="text-[11px] sm:text-xs font-semibold tracking-tight text-center truncate leading-tight">
                      {skill.name}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Compact Button DIRECTLY ABOVE Side Bar + Detail Card */}
          <div className="lg:col-span-4 sticky top-28 flex flex-col gap-3">
            
            {/* Compact Sized View all / View less button */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowAll(!showAll);
                  if (showAll) setSelectedFamily('All');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white hover:bg-[#111111] text-[#333333] hover:text-white border border-[#d8d8d4] hover:border-[#111111] text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm group"
              >
                <span>{showAll ? 'View less' : `View all skills (${periodicSkills.length})`}</span>
                {showAll ? (
                  <ChevronUp className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </div>

            {/* Clean Detail Card */}
            <AnimatePresence mode="wait">
              {activeSkill && (
                <motion.div
                  key={activeSkill.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-7 sm:p-8 rounded-3xl bg-white border border-[#e5e5e5] shadow-lg flex flex-col justify-between space-y-6"
                >
                  <div>
                    {/* Top Row: Category Tag */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-[#f4f4f1] text-[#666660] border border-[#e0e0dc]">
                        {activeSkill.family}
                      </span>
                    </div>

                    {/* Big Symbol */}
                    <div className="w-14 h-14 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-display font-black text-2xl mb-4 shadow-md">
                      {activeSkill.symbol}
                    </div>

                    {/* Skill Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#111111]">
                      {activeSkill.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#555555] leading-relaxed mt-4 pt-4 border-t border-[#f0f0ed]">
                      {activeSkill.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#f0f0ed] flex items-center justify-between text-xs font-mono text-[#8a8a7c]">
                    <span>Category</span>
                    <span className="text-[#111111] font-semibold">{activeSkill.family}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
