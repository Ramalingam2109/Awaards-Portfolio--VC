import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';
import { soundFX } from '../utils/audio';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<Props> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl bg-[#0f0f14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col"
        >
          <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-[#0f0f14]/40 to-transparent" />
            
            <button
              onClick={() => {
                soundFX.playClick();
                onClose();
              }}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-white border border-white/10 backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-lime-400 text-black text-xs font-bold font-mono uppercase tracking-wider">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-xs font-mono">
                {project.year}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
                {project.title}
              </h2>
              <p className="text-white/60 text-sm sm:text-base mt-2">
                {project.tagline}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2.5">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white/80 text-xs font-medium font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2.5">
                Overview
              </h4>
              <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">
                  Key Architectural Highlights
                </h4>
                <div className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
              {project.githubUrl && project.githubUrl !== '#' && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundFX.playHover()}
                  onClick={() => soundFX.playClick()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundFX.playHover()}
                  onClick={() => soundFX.playClick()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold transition-all shadow-lg"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
