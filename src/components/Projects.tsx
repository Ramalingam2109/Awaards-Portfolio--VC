import React, { useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData, Project } from '../data/portfolioData';

interface Props {
  onSelectProject: (p: Project) => void;
}

export const Projects: React.FC<Props> = ({ onSelectProject }) => {
  const { projects } = portfolioData;
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 220, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 220, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      id="works"
      onMouseMove={handleMouseMove}
      className="relative py-28 sm:py-36 px-6 sm:px-12 lg:px-20 bg-[#fafafa] text-[#111111] border-t border-[#e5e5e5]"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-[#111111]">
              selected works.
            </h2>
            <p className="text-base text-[#555555] mt-2 max-w-md">
              A curated selection of software systems and creative digital products engineered for production.
            </p>
          </div>
          <span className="text-xs font-mono text-[#8a8a7c] tracking-widest uppercase">
            ({projects.length.toString().padStart(2, '0')}) Works
          </span>
        </div>

        {/* Project List with Huy Ng Awwwards Hover Preview */}
        <div className="divide-y divide-[#e5e5e5] border-y border-[#e5e5e5]">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => onSelectProject(project)}
              className="group relative py-8 sm:py-12 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-black/[0.02] px-2 sm:px-6 transition-all duration-300"
            >
              <div className="flex items-start sm:items-center gap-6 sm:gap-10">
                <span className="text-xs font-mono text-[#8a8a7c] min-w-[2rem] pt-1 sm:pt-0">
                  0{idx + 1}
                </span>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#8a8a7c] block mb-1">
                    {project.category} • {project.year}
                  </span>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-display text-[#111111] group-hover:translate-x-2 transition-transform duration-300 tracking-tight">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-6 ml-12 md:ml-0">
                <div className="hidden lg:flex items-center gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-black/5 text-[#555555]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="w-10 h-10 rounded-full border border-[#d8d8d8] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white group-hover:rotate-45 transition-all duration-300 shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Floating Hover Thumbnail Preview */}
      {hoveredProject && (
        <motion.div
          className="fixed pointer-events-none z-[100] hidden md:block overflow-hidden rounded-xl shadow-2xl bg-black"
          style={{
            x: smoothX,
            y: smoothY,
            width: 340,
            height: 220,
            translateX: 24,
            translateY: -110,
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={hoveredProject.image}
            alt={hoveredProject.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <div>
              <p className="text-xs font-bold text-white font-display">{hoveredProject.title}</p>
              <p className="text-[10px] text-[#e0e0e0] font-mono">Click to inspect</p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};
