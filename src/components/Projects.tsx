import React, { useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight, LayoutGrid, List } from 'lucide-react';
import { Project } from '../types';
import { soundFX } from '../utils/audio';

interface Props {
  projects: Project[];
  onSelectProject: (p: Project) => void;
}

export const Projects: React.FC<Props> = ({ projects, onSelectProject }) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeFilter, setActiveFilter] = useState<string>('All');
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

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section
      id="works"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-24 sm:py-32 px-4 sm:px-6 relative border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-lime-400" />
              <span className="text-xs font-mono font-semibold tracking-widest text-lime-400 uppercase">
                02 / Selected Works
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white">
              Curated Projects & Architecture
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-xl">
              <button
                onClick={() => {
                  soundFX.playClick();
                  setViewMode('list');
                }}
                className={'p-2 rounded-lg transition-colors ' + (
                  viewMode === 'list' ? 'bg-white/20 text-lime-400' : 'text-white/40 hover:text-white'
                )}
                title="List View (Awwwards Hover Preview)"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  soundFX.playClick();
                  setViewMode('grid');
                }}
                className={'p-2 rounded-lg transition-colors ' + (
                  viewMode === 'grid' ? 'bg-white/20 text-lime-400' : 'text-white/40 hover:text-white'
                )}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFX.playHover();
                setActiveFilter(cat);
              }}
              className={'px-4 py-2 rounded-full text-xs font-medium transition-all ' + (
                activeFilter === cat
                  ? 'bg-lime-400 text-black font-bold shadow-md shadow-lime-400/20'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {viewMode === 'list' && (
          <div className="divide-y divide-white/10 border-y border-white/10">
            {filteredProjects.map((project, idx) => (
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
                className="group relative py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-colors hover:bg-white/[0.02] px-3 sm:px-6 rounded-2xl"
              >
                <div className="flex items-start sm:items-center gap-4 sm:gap-8">
                  <span className="text-xs font-mono text-white/30 font-bold group-hover:text-lime-400 transition-colors pt-1 sm:pt-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-lime-400/80 mb-1 block">
                      {project.category} • {project.year}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white group-hover:text-lime-300 group-hover:translate-x-2 transition-all duration-300">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 ml-8 md:ml-0">
                  <div className="hidden lg:flex items-center gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[11px] font-mono text-white/40">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:border-lime-400 group-hover:bg-lime-400 group-hover:text-black group-hover:rotate-45 transition-all duration-300 shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                onClick={() => {
                  soundFX.playClick();
                  onSelectProject(project);
                }}
                onMouseEnter={() => soundFX.playHover()}
                className="group relative rounded-3xl bg-[#121216] border border-white/10 overflow-hidden cursor-pointer hover:border-lime-400/40 transition-all duration-300 flex flex-col shadow-xl"
              >
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-white/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/90">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-white/40 font-mono mb-2">
                      <span>{project.year}</span>
                      {project.featured && <span className="text-lime-400">★ Featured</span>}
                    </div>
                    <h3 className="text-xl font-bold font-display text-white group-hover:text-lime-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2 mt-2">
                      {project.tagline || project.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-5 mt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-lime-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Details →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {viewMode === 'list' && hoveredProject && (
        <motion.div
          className="fixed pointer-events-none z-[100] hidden md:block overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-black"
          style={{
            x: smoothX,
            y: smoothY,
            width: 320,
            height: 200,
            translateX: 24,
            translateY: -100,
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
            <div>
              <p className="text-xs font-bold text-white font-display truncate">{hoveredProject.title}</p>
              <p className="text-[10px] text-lime-400 font-mono">Click to inspect</p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};
