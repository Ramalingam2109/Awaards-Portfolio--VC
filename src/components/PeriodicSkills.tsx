import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData, PeriodicSkill } from '../data/portfolioData';

export const PeriodicSkills: React.FC = () => {
  const { periodicSkills } = portfolioData;
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<PeriodicSkill>(
    periodicSkills.find((s) => s.symbol === 'Re') || periodicSkills[0]
  );

  const families = ['All', 'Languages', 'Frontend', 'Backend', 'Databases', 'Tools', 'Core'];

  const filteredSkills = selectedFamily === 'All'
    ? periodicSkills
    : periodicSkills.filter((s) => s.family === selectedFamily);

  // Styling based on family
  const getFamilyColor = (family: PeriodicSkill['family'], isSelected: boolean) => {
    switch (family) {
      case 'Languages':
        return isSelected
          ? 'bg-[#18181b] text-white border-black'
          : 'bg-[#27272a] text-white border-transparent hover:bg-[#18181b]';
      case 'Frontend':
        return isSelected
          ? 'bg-[#2a2a30] text-white border-black'
          : 'bg-[#3f3f46] text-white border-transparent hover:bg-[#27272a]';
      case 'Backend':
        return isSelected
          ? 'bg-[#6b695c] text-white border-[#38372e]'
          : 'bg-[#7c7a6c] text-white border-transparent hover:bg-[#6b695c]';
      case 'Databases':
        return isSelected
          ? 'bg-[#8c8a7b] text-white border-[#5c5a4d]'
          : 'bg-[#9c9a8b] text-white border-transparent hover:bg-[#8c8a7b]';
      case 'Tools':
        return isSelected
          ? 'bg-[#b8b6a8] text-[#1c1c1a] border-[#8c8a7b]'
          : 'bg-[#c8c6b8] text-[#1c1c1a] border-transparent hover:bg-[#b8b6a8]';
      case 'Core':
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
        <div className="mb-12">
          <span className="text-xs font-mono tracking-widest text-[#8a8a7c] uppercase">
            Interactive Stack
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-[#111111] mt-2 mb-3">
            technical elements.
          </h2>
          <p className="text-sm sm:text-base text-[#666660] max-w-2xl leading-relaxed">
            Technologies in six families. Hover a tile to inspect details and fundamentals, or pick a family to filter the matrix.
          </p>
        </div>

        {/* Family Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {families.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFamily(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 border ${
                selectedFamily === f
                  ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                  : 'bg-white text-[#666660] border-[#e0e0dc] hover:border-[#111111] hover:text-[#111111]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Main Grid: Periodic Table Tiles (Left) + Detail Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tiles Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3">
              {filteredSkills.map((skill) => {
                const isActive = activeSkill?.id === skill.id;
                const tileClass = getFamilyColor(skill.family, isActive);

                return (
                  <motion.div
                    key={skill.id}
                    layout
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onMouseEnter={() => setActiveSkill(skill)}
                    onClick={() => setActiveSkill(skill)}
                    className={`relative p-2.5 sm:p-3 aspect-square rounded-2xl cursor-pointer flex flex-col justify-between transition-all duration-200 shadow-sm border ${tileClass} ${
                      isActive ? 'ring-2 ring-[#111111] ring-offset-2' : ''
                    }`}
                  >
                    {/* Element Number */}
                    <div className="text-[10px] font-mono opacity-60 leading-none">
                      {skill.number}
                    </div>

                    {/* Element Symbol */}
                    <div className="text-xl sm:text-2xl font-black font-display tracking-tight text-center my-auto leading-none">
                      {skill.symbol}
                    </div>

                    {/* Element Name */}
                    <div className="text-[10px] font-medium tracking-tight text-center truncate opacity-85 leading-tight">
                      {skill.name}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Detail Inspector Card */}
          <div className="lg:col-span-4 sticky top-28">
            <AnimatePresence mode="wait">
              {activeSkill && (
                <motion.div
                  key={activeSkill.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-8 rounded-3xl bg-white border border-[#e5e5e5] shadow-lg flex flex-col justify-between space-y-6"
                >
                  <div>
                    {/* Top Row: Symbol + Number */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#fafafa] border border-[#e0e0dc] text-[#666660]">
                        Element #{activeSkill.number}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#8a8a7c]">
                        {activeSkill.family}
                      </span>
                    </div>

                    {/* Large Stylized Symbol */}
                    <div className="w-16 h-16 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-display font-black text-2xl mb-4 shadow-md">
                      {activeSkill.symbol}
                    </div>

                    <h3 className="text-2xl font-bold font-display text-[#111111]">
                      {activeSkill.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#8a8a7c] uppercase tracking-wider mt-1">
                      {activeSkill.level}
                    </div>

                    <p className="text-sm text-[#555555] leading-relaxed mt-4 pt-4 border-t border-[#f0f0ed]">
                      {activeSkill.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#f0f0ed] flex items-center justify-between text-[11px] font-mono text-[#8a8a7c]">
                    <span>Category: {activeSkill.family}</span>
                    <span className="text-emerald-600 font-semibold">Active Practice</span>
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
