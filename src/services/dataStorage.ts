import { portfolioData, PeriodicSkill, Project } from '../data/portfolioData';

const SKILLS_STORAGE_KEY = 'ram_portfolio_skills_v1';
const PROJECTS_STORAGE_KEY = 'ram_portfolio_projects_v1';

// Seed initial data if not present
export const getStoredSkills = (): PeriodicSkill[] => {
  try {
    const raw = localStorage.getItem(SKILLS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error reading skills from storage', e);
  }
  return portfolioData.periodicSkills;
};

export const saveStoredSkills = (skills: PeriodicSkill[]): void => {
  try {
    localStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(skills));
    window.dispatchEvent(new Event('portfolio_skills_updated'));
  } catch (e) {
    console.error('Error saving skills to storage', e);
  }
};

export const getStoredProjects = (): Project[] => {
  try {
    const raw = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error reading projects from storage', e);
  }
  return portfolioData.projects;
};

export const saveStoredProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event('portfolio_projects_updated'));
  } catch (e) {
    console.error('Error saving projects to storage', e);
  }
};

export const resetDatabaseToDefaults = (): void => {
  localStorage.removeItem(SKILLS_STORAGE_KEY);
  localStorage.removeItem(PROJECTS_STORAGE_KEY);
  window.dispatchEvent(new Event('portfolio_skills_updated'));
  window.dispatchEvent(new Event('portfolio_projects_updated'));
};
