import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Project, portfolioData } from './data/portfolioData';
import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Statement } from './components/Statement';
import { Services } from './components/Services';
import { PeriodicSkills } from './components/PeriodicSkills';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('light');
  const themeRef = useRef<'dark' | 'light'>('light');

  // Smooth Whole-Page Scroll-Driven Theme Switcher:
  // 1. Hero (#hero)                     -> Light (#fafafa)
  // 2. Statement (#about)               -> Dark  (#0e0e0e)
  // 3. Services & Stack (#services)     -> Light (#fafafa)
  // 4. Works (#works)                   -> Light (#fafafa)
  // 5. Contact (#contact)               -> Dark  (#0e0e0e)
  const updateTheme = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const aboutEl = document.getElementById('about');
    const servicesEl = document.getElementById('services');
    const contactEl = document.getElementById('contact');

    if (!aboutEl || !servicesEl || !contactEl) return;

    const aboutTop = aboutEl.offsetTop - windowHeight * 0.35;
    const servicesTop = servicesEl.offsetTop - windowHeight * 0.35;
    const contactTop = contactEl.offsetTop - windowHeight * 0.35;

    let newTheme: 'dark' | 'light' = 'light';

    if (scrollY >= contactTop) {
      newTheme = 'dark';
    } else if (scrollY >= servicesTop) {
      newTheme = 'light';
    } else if (scrollY >= aboutTop) {
      newTheme = 'dark';
    } else {
      newTheme = 'light';
    }

    if (newTheme !== themeRef.current) {
      themeRef.current = newTheme;
      setCurrentTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateTheme();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateTheme();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateTheme]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen font-sans antialiased overflow-x-hidden transition-colors duration-700 bg-[var(--theme-bg)] text-[var(--theme-text)]">
        {/* Subtle Film Grain Noise */}
        <div className="noise-overlay" />

        {/* Custom Physics Cursor */}
        <CustomCursor />

        {/* Minimal Pinned Navbar matching Huy Ng */}
        <Navbar currentTheme={currentTheme} />

        <main>
          {/* 1. Hero: Screenshot 1 (Light - HEY, I'M RAM, fits in single viewport layout) */}
          <Hero />

          {/* 2. Statement: Screenshot 2 (Dark - I build modern web applications...) */}
          <Statement />

          {/* 3. Services: Screenshot 3 (Light - my expertises. focused on Web & Software Dev) */}
          <Services />

          {/* 4. Periodic Table of Tech Elements (Screenshot 1: interactive matrix in 6 families) */}
          <PeriodicSkills />

          {/* 5. Selected Works (Light - Interactive Awwwards list with hover preview) */}
          <Projects onSelectProject={(p) => setSelectedProject(p)} />

          {/* 6. Contact (Dark - let's talk. & email link with mailto) */}
          <Contact />
        </main>

        {/* 7. Footer (Dark - ram", Chennai time, Back to top) */}
        <Footer />

        {/* Project Inspection Drawer Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </SmoothScroll>
  );
};
export default App;
