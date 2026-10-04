import * as XLSX from 'xlsx';
import { PortfolioData } from '../types';
import { defaultPortfolioData } from '../data/defaultData';

export class ExcelService {
  static generateWorkbook(data: PortfolioData = defaultPortfolioData): XLSX.WorkBook {
    const wb = XLSX.utils.book_new();

    const profileRows = [
      { Key: 'Name', Value: data.profile.name, Description: 'Full Name' },
      { Key: 'Title', Value: data.profile.title, Description: 'Primary professional title' },
      { Key: 'Headline', Value: data.profile.headline, Description: 'Hero headline subtext' },
      { Key: 'Bio', Value: data.profile.bio, Description: 'Detailed bio and intro' },
      { Key: 'Location', Value: data.profile.location, Description: 'Current city / country' },
      { Key: 'Status', Value: data.profile.status, Description: 'Work status / availability' },
      { Key: 'Email', Value: data.profile.email, Description: 'Contact email' },
      { Key: 'GitHub', Value: data.profile.github, Description: 'GitHub profile URL' },
      { Key: 'LinkedIn', Value: data.profile.linkedin, Description: 'LinkedIn profile URL' },
      { Key: 'Twitter', Value: data.profile.twitter || '', Description: 'Twitter/X profile URL' },
      { Key: 'YearsOfExperience', Value: data.profile.yearsOfExperience || '2+', Description: 'Experience range' },
      { Key: 'AvailableForHire', Value: data.profile.availableForHire ? 'Yes' : 'No', Description: 'Show green available badge (Yes/No)' },
      { Key: 'AvatarUrl', Value: data.profile.avatarUrl || '', Description: 'Profile avatar image URL' }
    ];
    const wsProfile = XLSX.utils.json_to_sheet(profileRows);
    XLSX.utils.book_append_sheet(wb, wsProfile, 'Profile');

    const projectRows = data.projects.map(p => ({
      ID: p.id,
      Title: p.title,
      Tagline: p.tagline,
      Category: p.category,
      Year: p.year,
      TechStack: p.techStack.join(', '),
      GitHubUrl: p.githubUrl || '',
      LiveUrl: p.liveUrl || '',
      ImageUrl: p.image,
      Description: p.description,
      Featured: p.featured ? 'Yes' : 'No',
      Highlights: (p.highlights || []).join(' | ')
    }));
    const wsProjects = XLSX.utils.json_to_sheet(projectRows);
    XLSX.utils.book_append_sheet(wb, wsProjects, 'Projects');

    const skillRows = data.skills.map(s => ({
      ID: s.id,
      SkillName: s.name,
      Category: s.category,
      Level: s.level,
      LevelLabel: s.levelLabel || 'Advanced',
      Featured: s.featured ? 'Yes' : 'No',
      Icon: s.icon || 'Code'
    }));
    const wsSkills = XLSX.utils.json_to_sheet(skillRows);
    XLSX.utils.book_append_sheet(wb, wsSkills, 'Skills');

    const expRows = data.experiences.map(e => ({
      ID: e.id,
      Role: e.role,
      Company: e.company,
      Period: e.period,
      Location: e.location || '',
      Type: e.type,
      Description: e.description,
      SkillsUsed: (e.skillsUsed || []).join(', ')
    }));
    const wsExp = XLSX.utils.json_to_sheet(expRows);
    XLSX.utils.book_append_sheet(wb, wsExp, 'Experience');

    const statRows = data.stats.map(s => ({
      Label: s.label,
      Value: s.value,
      Subtext: s.subtext
    }));
    const wsStats = XLSX.utils.json_to_sheet(statRows);
    XLSX.utils.book_append_sheet(wb, wsStats, 'Stats');

    return wb;
  }

  static downloadExcelTemplate(data: PortfolioData = defaultPortfolioData, filename = 'portfolio-data.xlsx'): void {
    const wb = this.generateWorkbook(data);
    XLSX.writeFile(wb, filename);
  }

  static parseExcel(data: ArrayBuffer | Uint8Array): PortfolioData {
    const wb = XLSX.read(data, { type: 'array' });
    const result: PortfolioData = JSON.parse(JSON.stringify(defaultPortfolioData));

    if (wb.SheetNames.includes('Profile')) {
      const sheet = wb.Sheets['Profile'];
      const rows = XLSX.utils.sheet_to_json(sheet) as Array<{ Key?: string; Value?: any }>;
      const profileMap: Record<string, any> = {};
      rows.forEach(r => {
        if (r.Key) {
          profileMap[r.Key.trim().toLowerCase()] = r.Value;
        }
      });

      result.profile = {
        name: profileMap['name'] || result.profile.name,
        title: profileMap['title'] || result.profile.title,
        headline: profileMap['headline'] || result.profile.headline,
        bio: profileMap['bio'] || result.profile.bio,
        location: profileMap['location'] || result.profile.location,
        status: profileMap['status'] || result.profile.status,
        email: profileMap['email'] || result.profile.email,
        github: profileMap['github'] || result.profile.github,
        linkedin: profileMap['linkedin'] || result.profile.linkedin,
        twitter: profileMap['twitter'] || result.profile.twitter,
        yearsOfExperience: profileMap['yearsofexperience'] || result.profile.yearsOfExperience,
        availableForHire: String(profileMap['availableforhire']).toLowerCase().startsWith('y') || profileMap['availableforhire'] === true,
        avatarUrl: profileMap['avatarurl'] || result.profile.avatarUrl,
        resumeUrl: profileMap['resumeurl'] || result.profile.resumeUrl
      };
    }

    if (wb.SheetNames.includes('Projects')) {
      const sheet = wb.Sheets['Projects'];
      const rows = XLSX.utils.sheet_to_json(sheet) as any[];
      if (rows && rows.length > 0) {
        result.projects = rows.map((r, index) => ({
          id: r.ID || r.Id || ('proj-' + (index + 1)),
          title: r.Title || 'Project Title',
          tagline: r.Tagline || '',
          category: r.Category || 'Development',
          year: String(r.Year || new Date().getFullYear()),
          techStack: typeof r.TechStack === 'string' ? r.TechStack.split(',').map((s: string) => s.trim()).filter(Boolean) : ['React', 'TypeScript'],
          githubUrl: r.GitHubUrl || r.GithubUrl || '',
          liveUrl: r.LiveUrl || '',
          image: r.ImageUrl || r.Image || defaultPortfolioData.projects[0].image,
          description: r.Description || '',
          featured: String(r.Featured).toLowerCase().startsWith('y') || r.Featured === true,
          highlights: typeof r.Highlights === 'string' ? r.Highlights.split('|').map((s: string) => s.trim()).filter(Boolean) : []
        }));
      }
    }

    if (wb.SheetNames.includes('Skills')) {
      const sheet = wb.Sheets['Skills'];
      const rows = XLSX.utils.sheet_to_json(sheet) as any[];
      if (rows && rows.length > 0) {
        result.skills = rows.map((r, index) => ({
          id: r.ID || r.Id || ('sk-' + (index + 1)),
          name: r.SkillName || r.Name || 'Skill',
          category: r.Category || 'Frontend',
          level: Number(r.Level) || 85,
          levelLabel: r.LevelLabel || 'Advanced',
          featured: String(r.Featured).toLowerCase().startsWith('y') || r.Featured === true,
          icon: r.Icon || 'Sparkles'
        }));
      }
    }

    if (wb.SheetNames.includes('Experience')) {
      const sheet = wb.Sheets['Experience'];
      const rows = XLSX.utils.sheet_to_json(sheet) as any[];
      if (rows && rows.length > 0) {
        result.experiences = rows.map((r, index) => ({
          id: r.ID || r.Id || ('exp-' + (index + 1)),
          role: r.Role || 'Engineer',
          company: r.Company || 'Company',
          period: r.Period || '2024 — Present',
          location: r.Location || '',
          type: r.Type || 'Full-time',
          description: r.Description || '',
          skillsUsed: typeof r.SkillsUsed === 'string' ? r.SkillsUsed.split(',').map((s: string) => s.trim()).filter(Boolean) : []
        }));
      }
    }

    if (wb.SheetNames.includes('Stats')) {
      const sheet = wb.Sheets['Stats'];
      const rows = XLSX.utils.sheet_to_json(sheet) as any[];
      if (rows && rows.length > 0) {
        result.stats = rows.map(r => ({
          label: r.Label || '',
          value: String(r.Value || ''),
          subtext: r.Subtext || ''
        }));
      }
    }

    return result;
  }

  static async loadDefaultExcelFile(): Promise<PortfolioData | null> {
    try {
      const response = await fetch('/portfolio-data.xlsx');
      if (!response.ok) return null;
      const arrayBuffer = await response.arrayBuffer();
      return this.parseExcel(arrayBuffer);
    } catch (e) {
      console.warn('Could not load /portfolio-data.xlsx, using default dataset:', e);
      return null;
    }
  }
}
