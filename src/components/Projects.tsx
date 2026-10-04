import React, { useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight, LayoutGrid, List } from 'lucide-react';
import { portfolioData, Project } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

interface Props {
  onSelectProject: (p: Project) => void;
}

export const Projects: React.FC<Props> = ({ onSelectProject }) => {
  const { projects } = portfolioData;
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 220, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 220, damping: 20 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      id="works"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-28 sm:py-36 px-4 sm:px-8 relative bg-[#f3efe6] text-[#121215] border-t border-black/10 transition-colors duration-700"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#121215]" />
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#121215]/60 uppercase">
                02 / Selected Works
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-[#121215]">
              Curated <span className="font-editorial italic font-normal text-4xl sm:text-5xl md:text-6xl">Production</span> Systems
            </h2>
          </div>

          <div className="flex items-center p-1 bg-black/5 border border-black/10 rounded-xl">
            <button
              onClick={() => {
                soundFX.playClick();
                setViewMode('list');
              }}
              className={'p-2 rounded-lg transition-colors ' + (
                viewMode === 'list' ? 'bg-[#121215] text-[#f3efe6]' : 'text-[#121215]/50 hover:text-[#121215]'
              )}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                soundFX.playClick();
                setViewMode('grid');
              }}
              className={'p-2 rounded-lg transition-colors ' + (
                viewMode === 'grid' ? 'bg-[#121215] text-[#f3efe6]' : 'text-[#121215]/50 hover:text-[#121215]'
              )}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* LIST VIEW (Awwwards Style Hover Follower) */}
        {viewMode === 'list' && (
          <div className="divide-y divide-black/10 border-y border-black/10">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                onMouseEnter={() => {
                  soundFX.playHover();
                  setHoveredProject(project);
                }}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => {
                  soundFX.playClick();
                  onSelectProject(project);
                }}
                className="group relative py-8 sm:py-12 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-all hover:bg-black/[0.03] px-4 sm:px-6 rounded-2xl"
              >
                <div className="flex items-start sm:items-center gap-4 sm:gap-8">
                  <span className="text-xs font-mono text-black/30 font-bold group-hover:text-black transition-colors pt-1 sm:pt-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#121215]/60 mb-1 block font-semibold">
                      {project.category} • {project.year}
                    </span>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-display text-[#121215] group-hover:translate-x-2 transition-transform duration-300">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-6 ml-8 md:ml-0">
                  <div className="hidden lg:flex items-center gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/5 border border-black/5 text-[#121215]/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="w-11 h-11 rounded-full border border-black/20 flex items-center justify-center text-[#121215] group-hover:bg-[#121215] group-hover:text-[#f3efe6] group-hover:rotate-45 transition-all duration-300 shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                onClick={() => {
                  soundFX.playClick();
                  onSelectProject(project);
                }}
                onMouseEnter={() => soundFX.playHover()}
                className="group relative rounded-3xl bg-[#e8e2d8] border border-black/10 overflow-hidden cursor-pointer hover:border-black/30 transition-all duration-300 flex flex-col shadow-lg"
              >
                <div className="relative h-64 w-full overflow-hidden bg-black/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-mono">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-black/50 font-mono mb-2">
                      {project.year} • {project.role}
                    </div>
                    <h3 className="text-2xl font-bold font-display text-[#121215]">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#121215]/70 line-clamp-2 mt-2 font-normal">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-black/10">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 text-[#121215]/70">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#121215] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Inspect →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Floating Hover Thumbnail Preview */}
      {viewMode === 'list' && hoveredProject && (
        <motion.div
          className="fixed pointer-events-none z-[100] hidden md:block overflow-hidden rounded-2xl border border-black/20 shadow-2xl bg-black"
          style={{
            x: smoothX,
            y: smoothY,
            width: 340,
            height: 220,
            translateX: 24,
            translateY: -110,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
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
              <p className="text-[10px] text-[#c8e972] font-mono">Click to view project</p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};
