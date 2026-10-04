import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export const Services: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const expertises = [
    { title: 'Web Development', desc: 'Full-stack web applications built with modern frameworks, clean architecture, and responsive precision.' },
    { title: 'Web Design', desc: 'Aesthetic, user-centered digital interfaces with intentional pacing and thoughtful typography.' },
    { title: 'Wireframing', desc: 'Information architecture and interactive low/high-fidelity prototypes for rapid validation.' },
    { title: 'UI/UX Design', desc: 'Design systems, accessibility-first component libraries, and intuitive user journeys.' },
    { title: 'Branding', desc: 'Visual identity, design direction, and cohesive design systems for digital products.' },
  ];

  const tools = [
    { name: 'React', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Next.js', category: 'Full-Stack' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Framer Motion', category: 'Animation' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Python', category: 'Language' },
    { name: 'FastAPI', category: 'Backend' },
    { name: 'Git & GitHub', category: 'DevOps' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Figma', category: 'Design' },
  ];

  return (
    <section
      id="services"
      className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-20 bg-[#fafafa] text-[#111111] border-t border-[#e5e5e5]"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Section 1: my expertises. exactly like Screenshot 3 */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-[#111111] mb-4"
          >
            my expertises.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl"
          >
            I focus on all things design and web related. With each of my services, my goal is to deliver an impactful and elevating digital experience for everyone.
          </motion.p>

          {/* Thin divider line from Screenshot 3 */}
          <div className="w-full border-t border-[#d8d8d8] my-8" />

          {/* Stacked list of expertises in muted olive-gray text from Screenshot 3 */}
          <div className="space-y-1 sm:space-y-2">
            {expertises.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group cursor-pointer py-1.5 flex flex-col transition-all"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight transition-colors duration-300 ${
                      hoveredIndex === idx ? 'text-[#111111] translate-x-2' : 'text-[#8a8a7c]'
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`text-xs font-mono uppercase tracking-widest transition-opacity duration-300 ${
                      hoveredIndex === idx ? 'opacity-100 text-[#111111]' : 'opacity-0'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>
                {hoveredIndex === idx && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs sm:text-sm text-[#666660] mt-2 max-w-lg leading-relaxed"
                  >
                    {item.desc}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: my digital tool box. exactly like Screenshot 3 */}
        <div className="mt-24 sm:mt-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-[#111111] mb-4"
          >
            my digital tool box.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl mb-8"
          >
            These are my go to tech stack to make any projects happen. I am always eager of learning more about my current stack, and new technologies that could expand my horizons.
          </motion.p>

          {/* Interactive grid of digital tools */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {tools.map((tool, idx) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#e5e5e5] hover:border-[#111111] transition-all duration-300 hover:shadow-sm group"
              >
                <div className="text-sm font-bold text-[#111111] group-hover:text-black">
                  {tool.name}
                </div>
                <div className="text-[10px] text-[#8a8a7c] font-mono mt-0.5">
                  {tool.category}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
