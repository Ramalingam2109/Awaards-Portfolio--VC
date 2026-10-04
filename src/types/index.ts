export interface ProfileData {
  name: string;
  title: string;
  headline: string;
  bio: string;
  location: string;
  status: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  resumeUrl?: string;
  avatarUrl?: string;
  availableForHire: boolean;
  yearsOfExperience: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  description: string;
  featured: boolean;
  highlights?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database & Cloud' | 'Tools & DevOps' | 'Core CS';
  level: number;
  levelLabel?: string;
  featured?: boolean;
  icon?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  location?: string;
  type: 'Full-time' | 'Internship' | 'Freelance' | 'Education' | 'Open Source';
  skillsUsed?: string[];
}

export interface Stat {
  label: string;
  value: string;
  subtext: string;
}

export interface PortfolioData {
  profile: ProfileData;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  stats: Stat[];
}
