import React, { useState, useEffect } from 'react';
import { PortfolioData, Project } from './types';
import { defaultPortfolioData } from './data/defaultData';
import { ExcelService } from './services/excelService';
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
import { ExcelManagerModal } from './components/ExcelManagerModal';

const STORAGE_KEY = 'ramalingam_portfolio_data_v1';

export const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCustomData, setIsCustomData] = useState(false);

  useEffect(() => {
    const initData = async () => {
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          setData(parsed);
          setIsCustomData(true);
          return;
        }

        const excelData = await ExcelService.loadDefaultExcelFile();
        if (excelData) {
          setData(excelData);
        }
      } catch (err) {
        console.warn('Error loading initial excel data:', err);
      }
    };

    initData();
  }, []);

  const handleUpdateData = (newData: PortfolioData) => {
    setData(newData);
    setIsCustomData(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  };

  const handleResetData = () => {
    setData(defaultPortfolioData);
    setIsCustomData(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#08080a] text-[#f4f4f7] selection:bg-lime-300 selection:text-black font-sans antialiased overflow-x-hidden">
        <div className="noise-overlay" />
        <CustomCursor />
        <Navbar
          onOpenExcelManager={() => setIsExcelModalOpen(true)}
          isCustomData={isCustomData}
        />

        <main>
          <Hero
            profile={data.profile}
            onOpenExcelManager={() => setIsExcelModalOpen(true)}
          />

          <Marquee />

          <About
            profile={data.profile}
            stats={data.stats}
          />

          <Projects
            projects={data.projects}
            onSelectProject={(p) => setSelectedProject(p)}
          />

          <Skills
            skills={data.skills}
            onOpenExcelManager={() => setIsExcelModalOpen(true)}
          />

          <ExperienceSection
            experiences={data.experiences}
          />

          <Contact
            profile={data.profile}
          />
        </main>

        <Footer
          onOpenExcelManager={() => setIsExcelModalOpen(true)}
        />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <ExcelManagerModal
          isOpen={isExcelModalOpen}
          onClose={() => setIsExcelModalOpen(false)}
          data={data}
          onUpdateData={handleUpdateData}
          onResetData={handleResetData}
          isCustomData={isCustomData}
        />

      </div>
    </SmoothScroll>
  );
};
export default App;
