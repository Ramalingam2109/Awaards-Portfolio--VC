import React, { useState, useEffect } from 'react';
import { Project, portfolioData } from './data/portfolioData';
import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Skills } from './components/Skills';
import { ExperienceSection } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');

  // Dynamic Scroll Theme Switcher
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Check positions of sections
      const aboutEl = document.getElementById('about');
      const experienceEl = document.getElementById('experience');

      if (aboutEl && experienceEl) {
        const aboutTop = aboutEl.offsetTop - windowHeight * 0.35;
        const expTop = experienceEl.offsetTop - windowHeight * 0.35;

        if (scrollY >= aboutTop && scrollY < expTop) {
          if (currentTheme !== 'light') {
            setCurrentTheme('light');
            document.documentElement.setAttribute('data-theme', 'light');
          }
        } else {
          if (currentTheme !== 'dark') {
            setCurrentTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentTheme]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen selection:bg-[#c8e972] selection:text-black font-sans antialiased overflow-x-hidden">
        {/* Subtle Noise Texture Overlay */}
        <div className="noise-overlay" />

        {/* Physics-based Cursor Follower */}
        <CustomCursor />

        {/* Floating Dynamic Navbar */}
        <Navbar currentTheme={currentTheme} />

        <main>
          {/* Hero: Dark Onyx Theme */}
          <Hero />

          {/* Kinetic Marquee Ribbon */}
          <Marquee />

          {/* About / Philosophy: Warm Paper Light Theme */}
          <About />

          {/* Selected Works: Warm Paper Light Theme */}
          <Projects onSelectProject={(p) => setSelectedProject(p)} />

          {/* Technical Stack: Warm Paper Light Theme */}
          <Skills />

          {/* Experience Timeline: Deep Obsidian Dark Theme */}
          <ExperienceSection />

          {/* Contact Suite: Deep Obsidian Dark Theme */}
          <Contact />
        </main>

        {/* Footer with Live Chennai IST Clock */}
        <Footer />

        {/* Project Inspection Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </SmoothScroll>
  );
};
export default App;
