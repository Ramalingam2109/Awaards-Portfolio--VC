import { neon } from '@neondatabase/serverless';
import { portfolioData, PeriodicSkill, Project } from '../data/portfolioData';

// Neon Project Configuration
// Project ID: spring-mouse-42979360 (Branch: production)
const NEON_DATABASE_URL = import.meta.env.VITE_NEON_DATABASE_URL || '';

/**
 * Neon PostgreSQL Client
 */
export const getNeonClient = () => {
  if (!NEON_DATABASE_URL) {
    return null;
  }
  return neon(NEON_DATABASE_URL);
};

/**
 * Fetch all skills from Neon PostgreSQL with fallback to static schema
 */
export const fetchSkillsFromNeon = async (): Promise<PeriodicSkill[]> => {
  const sql = getNeonClient();
  if (!sql) {
    return portfolioData.periodicSkills;
  }

  try {
    const rows = await sql`
      SELECT id, symbol, name, family, description, featured 
      FROM skills 
      ORDER BY id ASC
    `;
    if (rows && rows.length > 0) {
      return rows as unknown as PeriodicSkill[];
    }
  } catch (error) {
    console.warn('Neon connection unavailable, using local database cache:', error);
  }

  return portfolioData.periodicSkills;
};

/**
 * Fetch all projects from Neon PostgreSQL with fallback to static schema
 */
export const fetchProjectsFromNeon = async (): Promise<Project[]> => {
  const sql = getNeonClient();
  if (!sql) {
    return portfolioData.projects;
  }

  try {
    const rows = await sql`
      SELECT id, title, category, year, role, tech_stack as "techStack", github_url as "githubUrl", live_url as "liveUrl", image_url as "image", description 
      FROM projects 
      ORDER BY year DESC
    `;
    if (rows && rows.length > 0) {
      return rows as unknown as Project[];
    }
  } catch (error) {
    console.warn('Neon connection unavailable, using local database cache:', error);
  }

  return portfolioData.projects;
};
