import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Services: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Pure Web Development and Software Development focus
  const expertises = [
    {
      title: 'Full-Stack Web Development',
      desc: 'Building responsive, end-to-end web applications using React, Next.js, Node.js, and modern architectural standards.'
    },
    {
      title: 'Frontend Engineering',
      desc: 'Developing fast, accessible, and responsive user interfaces with TypeScript, modern CSS, and component state management.'
    },
    {
      title: 'Backend & REST APIs',
      desc: 'Designing structured RESTful API endpoints, server middleware, request validation, and database integrations with Node.js and Express.'
    },
    {
      title: 'Database Management',
      desc: 'Writing structured queries, modeling relational schemas in PostgreSQL and MySQL, and managing document stores in MongoDB.'
    },
    {
      title: 'Data Structures & Algorithms',
      desc: 'Solving algorithmic problems, optimizing time and space complexity, and applying object-oriented software engineering principles.'
    },
  ];

  return (
    <section
      id="services"
      className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-20 bg-[#fafafa] text-[#111111] border-t border-[#e5e5e5]"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Section 1: my expertises. */}
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
            I focus on software engineering and full-stack web development. I love building responsive web apps, creating clean REST APIs, and learning modern technologies.
          </motion.p>

          {/* Thin divider line from Screenshot 3 */}
          <div className="w-full border-t border-[#d8d8d8] my-8" />

          {/* Stacked list of core developer expertises */}
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
                    className={`text-2xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight transition-colors duration-300 ${
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

      </div>
    </section>
  );
};
