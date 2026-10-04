import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const About: React.FC = () => {
  const { profile, stats } = portfolioData;

  return (
    <section
      id="about"
      className="relative z-10 overflow-hidden rounded-b-3xl bg-[#0B0B0A] text-[#e8e8df] shadow-2xl"
    >
      <div className="px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
        {/* Top Grid: Arrow + Heading */}
        <div className="grid grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-4 overflow-hidden">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ArrowDownRight className="w-16 h-16 text-[#8C8C73]" strokeWidth={1} />
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="col-span-full md:col-span-8 text-[clamp(2rem,5vw,4.5rem)] font-extrabold font-display uppercase leading-[1.05] tracking-tight"
          >
            Engineering digital experiences where{' '}
            <span className="font-editorial italic font-normal lowercase">beauty</span>{' '}
            meets rigorous software architecture.
          </motion.h2>
        </div>

        {/* Bio + Profile Card */}
        <div className="grid grid-cols-12 gap-6 mt-16">
          {/* Profile image placeholder */}
          <div className="col-span-full md:col-span-4 flex items-end">
            <div className="w-full aspect-[1/1.3] rounded-2xl bg-gradient-to-br from-[#1c1d16] to-[#2a2b22] flex items-center justify-center overflow-hidden">
              <div className="text-[6rem] font-extrabold font-display text-[#38392e] select-none">
                R
              </div>
            </div>
          </div>

          <div className="col-span-full md:col-span-8 md:col-start-5 flex flex-col justify-between">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[clamp(1.1rem,2.5vw,1.5rem)] leading-relaxed text-[#b6b79f] max-w-2xl"
            >
              {profile.bio}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm text-[#62644c] mt-6 max-w-lg leading-relaxed"
            >
              I believe great software should not only execute with flawless speed but evoke emotion through subtle typography, intentional pacing, and natural micro-interactions.
            </motion.p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                >
                  <div className="text-3xl font-extrabold font-display text-[#e8e8df] tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-xs font-medium text-[#b6b79f] mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-[#62644c] mt-0.5">
                    {stat.note}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
