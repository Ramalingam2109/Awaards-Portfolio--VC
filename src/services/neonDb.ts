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

export interface VisitorSessionRecord {
  sessionId: string;
  ip?: string;
  country?: string;
  city?: string;
  deviceType?: string;
  browser?: string;
  os?: string;
  referrer?: string;
  durationSeconds?: number;
  sectionsViewed?: string[];
}

/**
 * Record a new visitor session into Neon PostgreSQL
 */
export const recordVisitorSession = async (session: VisitorSessionRecord): Promise<boolean> => {
  const sql = getNeonClient();
  if (!sql) return false;

  try {
    await sql.query(
      `INSERT INTO visitor_sessions (session_id, ip, country, city, device_type, browser, os, referrer, duration_seconds, sections_viewed, created_at, last_active_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       ON CONFLICT (session_id) DO UPDATE SET
         last_active_at = CURRENT_TIMESTAMP`,
      [
        session.sessionId,
        session.ip || 'ANONYMIZED',
        session.country || 'Unknown',
        session.city || 'Unknown',
        session.deviceType || 'Desktop',
        session.browser || 'Unknown',
        session.os || 'Unknown',
        session.referrer || 'Direct',
        session.durationSeconds || 0,
        session.sectionsViewed || ['hero'],
      ]
    );
    return true;
  } catch (err) {
    console.warn('Could not record visitor session:', err);
    return false;
  }
};

/**
 * Update active duration and visited sections for a visitor session
 */
export const updateSessionDuration = async (
  sessionId: string,
  durationSeconds: number,
  sectionsViewed: string[]
): Promise<boolean> => {
  const sql = getNeonClient();
  if (!sql) return false;

  try {
    await sql.query(
      `UPDATE visitor_sessions 
       SET duration_seconds = $2, 
           sections_viewed = $3, 
           last_active_at = CURRENT_TIMESTAMP 
       WHERE session_id = $1`,
      [sessionId, durationSeconds, sectionsViewed]
    );
    return true;
  } catch (err) {
    console.warn('Could not update session duration:', err);
    return false;
  }
};

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  message: string;
  country?: string;
  city?: string;
}

/**
 * Save incoming contact form submission to Neon PostgreSQL
 */
export const saveContactMessage = async (msg: ContactMessageRecord): Promise<boolean> => {
  const sql = getNeonClient();
  if (!sql) return false;

  try {
    await sql.query(
      `INSERT INTO contact_messages (id, name, email, message, country, city, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)`,
      [
        msg.id,
        msg.name,
        msg.email,
        msg.message,
        msg.country || 'Unknown',
        msg.city || 'Unknown',
      ]
    );
    return true;
  } catch (err) {
    console.warn('Could not save contact message in Neon:', err);
    return false;
  }
};
