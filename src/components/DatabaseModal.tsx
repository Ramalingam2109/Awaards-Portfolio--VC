import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Database, Save, RotateCcw } from 'lucide-react';
import { PeriodicSkill, Project } from '../data/portfolioData';
import {
  getStoredSkills,
  saveStoredSkills,
  getStoredProjects,
  saveStoredProjects,
  resetDatabaseToDefaults
} from '../services/dataStorage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DatabaseModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'skills' | 'projects'>('skills');
  const [skillsList, setSkillsList] = useState<PeriodicSkill[]>(getStoredSkills());
  const [projectsList, setProjectsList] = useState<Project[]>(getStoredProjects());
  const [toastMessage, setToastMessage] = useState<string>('');

  // Form states for adding new skill
  const [newSkill, setNewSkill] = useState({
    symbol: '',
    name: '',
    family: 'Languages' as PeriodicSkill['family'],
    description: '',
    featured: false
  });

  // Form states for adding new project
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Web Application',
    year: new Date().getFullYear().toString(),
    role: 'Full-Stack Development',
    techStack: 'React, TypeScript, Node.js',
    githubUrl: '',
    liveUrl: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  });

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Skill Handlers
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.symbol || !newSkill.name) return;

    const skillItem: PeriodicSkill = {
      id: `sk-${Date.now()}`,
      symbol: newSkill.symbol.trim(),
      name: newSkill.name.trim(),
      family: newSkill.family,
      description: newSkill.description.trim() || `${newSkill.name} engineering & software development.`,
      featured: newSkill.featured
    };

    const updated = [...skillsList, skillItem];
    setSkillsList(updated);
    saveStoredSkills(updated);
    setNewSkill({ symbol: '', name: '', family: 'Languages', description: '', featured: false });
    showToast('New skill saved to database!');
  };

  const handleDeleteSkill = (id: string) => {
    const updated = skillsList.filter((s) => s.id !== id);
    setSkillsList(updated);
    saveStoredSkills(updated);
    showToast('Skill deleted from database.');
  };

  // Project Handlers
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;

    const projectItem: Project = {
      id: `proj-${Date.now()}`,
      title: newProject.title.trim(),
      category: newProject.category.trim(),
      year: newProject.year.trim(),
      role: newProject.role.trim(),
      techStack: newProject.techStack.split(',').map((t) => t.trim()).filter(Boolean),
      githubUrl: newProject.githubUrl.trim() || undefined,
      liveUrl: newProject.liveUrl.trim() || undefined,
      image: newProject.image.trim(),
      description: newProject.description.trim() || 'A modern software project built with clean code and tested architecture.',
      highlights: ['Responsive web architecture', 'Modern framework integration']
    };

    const updated = [projectItem, ...projectsList];
    setProjectsList(updated);
    saveStoredProjects(updated);
    setNewProject({
      title: '',
      category: 'Web Application',
      year: new Date().getFullYear().toString(),
      role: 'Full-Stack Development',
      techStack: 'React, TypeScript, Node.js',
      githubUrl: '',
      liveUrl: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
    });
    showToast('New project saved to database!');
  };

  const handleDeleteProject = (id: string) => {
    const updated = projectsList.filter((p) => p.id !== id);
    setProjectsList(updated);
    saveStoredProjects(updated);
    showToast('Project deleted from database.');
  };

  const handleReset = () => {
    if (window.confirm('Reset database to default skills and projects?')) {
      resetDatabaseToDefaults();
      setSkillsList(getStoredSkills());
      setProjectsList(getStoredProjects());
      showToast('Database reset to defaults.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative w-full max-w-4xl bg-[#141414] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col text-[#f0f0f0]"
        >
          {/* Header */}
          <div className="px-6 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-white">Database Tables</h3>
                <p className="text-xs text-[#8a8a7c] font-mono">Manage and edit your skills & projects database</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="px-6 py-2 bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-400 text-xs font-mono text-center">
              {toastMessage}
            </div>
          )}

          {/* Tabs */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-3 bg-black/40 border-b border-white/5">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('skills')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'skills'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-[#8a8a7c] hover:text-white'
                }`}
              >
                Skills Table ({skillsList.length})
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'projects'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-[#8a8a7c] hover:text-white'
                }`}
              >
                Projects Table ({projectsList.length})
              </button>
            </div>

            <button
              onClick={handleReset}
              title="Reset Database to Defaults"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#8a8a7c] hover:text-rose-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
            
            {/* 1. SKILLS DATABASE TAB */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                {/* Add Skill Form */}
                <form onSubmit={handleAddSkill} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#8a8a7c] flex items-center gap-2">
                    <Plus className="w-4 h-4 text-emerald-400" />
                    <span>Add New Skill to Database</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-mono text-[#8a8a7c] mb-1">Symbol</label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        placeholder="e.g. Ts"
                        value={newSkill.symbol}
                        onChange={(e) => setNewSkill({ ...newSkill, symbol: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-[10px] font-mono text-[#8a8a7c] mb-1">Skill Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. TypeScript"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-[10px] font-mono text-[#8a8a7c] mb-1">Family</label>
                      <select
                        value={newSkill.family}
                        onChange={(e) => setNewSkill({ ...newSkill, family: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                      >
                        <option value="Languages">Languages</option>
                        <option value="Frameworks">Frameworks</option>
                        <option value="Databases">Databases</option>
                        <option value="DevOps & Cloud">DevOps & Cloud</option>
                        <option value="Core Skills">Core Skills</option>
                        <option value="Tools & IDEs">Tools & IDEs</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3 flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer pb-2 text-xs text-[#8a8a7c]">
                        <input
                          type="checkbox"
                          checked={newSkill.featured}
                          onChange={(e) => setNewSkill({ ...newSkill, featured: e.target.checked })}
                          className="rounded border-white/20 bg-black/40 text-black focus:ring-0"
                        />
                        <span>Featured in 1st row</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#8a8a7c] mb-1">Description / Notes</label>
                    <input
                      type="text"
                      placeholder="Brief note on how you use this technology..."
                      value={newSkill.description}
                      onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-[#e0e0e0] transition-colors"
                  >
                    Add Skill
                  </button>
                </form>

                {/* Skills Table */}
                <div className="border border-white/10 rounded-2xl overflow-hidden">
                  <div className="max-h-80 overflow-y-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-black/60 sticky top-0 text-[#8a8a7c] font-mono uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-3 px-4">Symbol</th>
                          <th className="py-3 px-4">Name</th>
                          <th className="py-3 px-4">Family</th>
                          <th className="py-3 px-4">Description</th>
                          <th className="py-3 px-4 text-center">Featured</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {skillsList.map((skill) => (
                          <tr key={skill.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-2.5 px-4 font-mono font-bold text-white">{skill.symbol}</td>
                            <td className="py-2.5 px-4 text-white font-medium">{skill.name}</td>
                            <td className="py-2.5 px-4 text-[#8a8a7c]">{skill.family}</td>
                            <td className="py-2.5 px-4 text-[#8a8a7c] truncate max-w-xs">{skill.description}</td>
                            <td className="py-2.5 px-4 text-center">
                              {skill.featured ? <span className="text-emerald-400">★</span> : <span className="opacity-20">—</span>}
                            </td>
                            <td className="py-2.5 px-4 text-right">
                              <button
                                onClick={() => handleDeleteSkill(skill.id)}
                                className="p-1 rounded text-white/40 hover:text-rose-400 transition-colors"
                                title="Delete skill"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PROJECTS DATABASE TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                {/* Add Project Form */}
                <form onSubmit={handleAddProject} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#8a8a7c] flex items-center gap-2">
                    <Plus className="w-4 h-4 text-emerald-400" />
                    <span>Add New Project to Database</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-5">
                      <label className="block text-[10px] font-mono text-[#8a8a7c] mb-1">Project Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Real-Time Chat App"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-[10px] font-mono text-[#8a8a7c] mb-1">Category</label>
                      <input
                        type="text"
                        placeholder="e.g. Full-Stack Web Application"
                        value={newProject.category}
                        onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-[10px] font-mono text-[#8a8a7c] mb-1">Year</label>
                      <input
                        type="text"
                        value={newProject.year}
                        onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-6">
                      <label className="block text-[10px] font-mono text-[#8a8a7c] mb-1">Tech Stack (comma-separated)</label>
                      <input
                        type="text"
                        placeholder="React, TypeScript, Node.js, PostgreSQL"
                        value={newProject.techStack}
                        onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <label className="block text-[10px] font-mono text-[#8a8a7c] mb-1">GitHub URL</label>
                      <input
                        type="url"
                        placeholder="https://github.com/Ramalingam2109/..."
                        value={newProject.githubUrl}
                        onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#8a8a7c] mb-1">Description</label>
                    <textarea
                      rows={2}
                      placeholder="Overview of the project and key architectural features..."
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-[#e0e0e0] transition-colors"
                  >
                    Add Project
                  </button>
                </form>

                {/* Projects Table */}
                <div className="border border-white/10 rounded-2xl overflow-hidden">
                  <div className="max-h-80 overflow-y-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-black/60 sticky top-0 text-[#8a8a7c] font-mono uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-3 px-4">Title</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Year</th>
                          <th className="py-3 px-4">Tech Stack</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {projectsList.map((project) => (
                          <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-2.5 px-4 font-semibold text-white">{project.title}</td>
                            <td className="py-2.5 px-4 text-[#8a8a7c]">{project.category}</td>
                            <td className="py-2.5 px-4 text-[#8a8a7c] font-mono">{project.year}</td>
                            <td className="py-2.5 px-4 text-[#8a8a7c] truncate max-w-xs">{project.techStack.join(', ')}</td>
                            <td className="py-2.5 px-4 text-right">
                              <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="p-1 rounded text-white/40 hover:text-rose-400 transition-colors"
                                title="Delete project"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="px-6 sm:px-8 py-4 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs text-[#8a8a7c]">
            <span>Changes persist automatically to your browser database.</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white text-black font-semibold hover:bg-[#e0e0e0] transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
