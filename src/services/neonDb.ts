import { neon } from '@neondatabase/serverless';
import { portfolioData, PeriodicSkill, Project } from '../data/portfolioData';

// Neon Project: spring-mouse-42979360 (Branch: production)
const NEON_DATABASE_URL = import.meta.env.VITE_NEON_DATABASE_URL || '';

/**
 * Neon PostgreSQL Client instance
 */
export const getNeonClient = () => {
  if (!NEON_DATABASE_URL) {
    return null;
  }
  return neon(NEON_DATABASE_URL);
};

/**
 * Dynamically fetch all skills from Neon PostgreSQL
 */
export const fetchDynamicSkills = async (): Promise<PeriodicSkill[]> => {
  const sql = getNeonClient();
  if (sql) {
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
      console.warn('Neon query error, using local fallback:', error);
    }
  }

  // Fallback to initial dataset if database connection string is not set
  return portfolioData.periodicSkills;
};

/**
 * Dynamically fetch all projects from Neon PostgreSQL
 */
export const fetchDynamicProjects = async (): Promise<Project[]> => {
  const sql = getNeonClient();
  if (sql) {
    try {
      const rows = await sql`
        SELECT id, title, category, year, role, tech_stack as "techStack", github_url as "githubUrl", live_url as "liveUrl", image_url as "image", description, highlights
        FROM projects 
        ORDER BY year DESC
      `;
      if (rows && rows.length > 0) {
        return rows as unknown as Project[];
      }
    } catch (error) {
      console.warn('Neon query error, using local fallback:', error);
    }
  }

  // Fallback to initial dataset if database connection string is not set
  return portfolioData.projects;
};

/**
 * Dynamically fetch profile data from Neon PostgreSQL
 */
export const fetchDynamicProfile = async () => {
  const sql = getNeonClient();
  if (sql) {
    try {
      const rows = await sql`
        SELECT name, full_name as "fullName", tagline, headline, bio, location, status, email, github, linkedin, available
        FROM profile 
        WHERE id = 'main'
        LIMIT 1
      `;
      if (rows && rows.length > 0) {
        return rows[0];
      }
    } catch (error) {
      console.warn('Neon query error, using local fallback:', error);
    }
  }

  return portfolioData.profile;
};
