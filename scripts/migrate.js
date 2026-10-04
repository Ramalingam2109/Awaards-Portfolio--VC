import { neon } from '@neondatabase/serverless';

const connectionString = 'postgresql://neondb_owner:npg_nJU1wvI2hyYQ@ep-lingering-fire-b3tegmr2-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function run() {
  console.log('Connecting to Neon PostgreSQL...');
  const sql = neon(connectionString);

  // 1. Create Tables
  console.log('Creating tables if not exist...');
  await sql.query(`
    CREATE TABLE IF NOT EXISTS skills (
      id VARCHAR(64) PRIMARY KEY,
      symbol VARCHAR(8) NOT NULL,
      name VARCHAR(128) NOT NULL,
      family VARCHAR(64) NOT NULL,
      description TEXT,
      featured BOOLEAN DEFAULT false,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await sql.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id VARCHAR(64) PRIMARY KEY,
      title VARCHAR(256) NOT NULL,
      category VARCHAR(128) NOT NULL,
      year VARCHAR(16) NOT NULL,
      role VARCHAR(128),
      tech_stack TEXT[] NOT NULL DEFAULT '{}',
      github_url TEXT,
      live_url TEXT,
      image_url TEXT,
      description TEXT,
      highlights TEXT[] NOT NULL DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await sql.query(`
    CREATE TABLE IF NOT EXISTS profile (
      id VARCHAR(64) PRIMARY KEY DEFAULT 'main',
      name VARCHAR(128) NOT NULL,
      full_name VARCHAR(128) NOT NULL,
      tagline TEXT,
      headline TEXT,
      bio TEXT,
      location VARCHAR(128),
      status VARCHAR(128),
      email VARCHAR(128),
      github VARCHAR(256),
      linkedin VARCHAR(256),
      available BOOLEAN DEFAULT true,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Profile
  console.log('Upserting profile...');
  await sql.query(`
    INSERT INTO profile (id, name, full_name, tagline, headline, bio, location, status, email, github, linkedin, available)
    VALUES (
      'main',
      'RAM',
      'RAM',
      'Software Developer & Full-Stack Engineer',
      'Engineering scalable web applications and software systems with a passion for clean code and modern architecture.',
      'Software engineer based in Chennai, India. I specialize in full-stack web development, building responsive frontends, modular REST APIs, and efficient database architectures.',
      'Chennai, India',
      'Available for opportunities',
      'ramalingam2109@gmail.com',
      'https://github.com/Ramalingam2109',
      'https://linkedin.com/in/ramalingam2109',
      true
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      full_name = EXCLUDED.full_name,
      tagline = EXCLUDED.tagline,
      headline = EXCLUDED.headline,
      bio = EXCLUDED.bio,
      location = EXCLUDED.location,
      status = EXCLUDED.status,
      email = EXCLUDED.email,
      github = EXCLUDED.github,
      linkedin = EXCLUDED.linkedin,
      available = EXCLUDED.available,
      updated_at = CURRENT_TIMESTAMP;
  `);

  // 3. Projects
  console.log('Upserting projects...');
  const projects = [
    {
      id: 'proj-1',
      title: 'Awwwards Portfolio Experience',
      category: 'Interactive Web Application',
      year: '2026',
      role: 'Frontend Engineering',
      tech_stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lenis'],
      github_url: 'https://github.com/Ramalingam2109/Awaards-Portfolio--VC',
      live_url: 'https://ramalingam-portfolio.vercel.app',
      image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      description: 'An interactive portfolio website engineered with React and Vite, featuring smooth inertial scrolling, theme transitions, and clean component architecture.',
      highlights: ['Engineered with React, Vite, and strict TypeScript types', 'Implemented butter-smooth inertial scrolling using Lenis', 'Designed dynamic scroll-driven theme transitions', 'Structured modular components with clean CSS utilities']
    },
    {
      id: 'proj-2',
      title: 'DevPulse Telemetry Dashboard',
      category: 'Full-Stack Application',
      year: '2025',
      role: 'Full-Stack Development',
      tech_stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'],
      github_url: 'https://github.com/Ramalingam2109',
      live_url: '#',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      description: 'A full-stack monitoring application designed to practice real-time data ingestion, relational schema querying, and analytical dashboard visualization.',
      highlights: ['Connected frontend dashboard to Node.js backend endpoints', 'Designed relational tables in PostgreSQL for metric logs', 'Built responsive analytical graphs with Tailwind and SVG']
    },
    {
      id: 'proj-3',
      title: 'Audio Synth Playground',
      category: 'Web Audio Application',
      year: '2025',
      role: 'Frontend Development',
      tech_stack: ['React', 'Web Audio API', 'HTML5 Canvas', 'TypeScript'],
      github_url: 'https://github.com/Ramalingam2109',
      live_url: '#',
      image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      description: 'An interactive web audio synthesizer utilizing the Web Audio API for tone generation, harmonic filters, and real-time canvas frequency spectrum visualizers.',
      highlights: ['Utilized Web Audio API oscillator and gain nodes', 'Rendered dynamic frequency FFT wave patterns on Canvas', 'Structured modular TypeScript state management']
    },
    {
      id: 'proj-4',
      title: 'Modern Storefront Application',
      category: 'Web Application',
      year: '2024',
      role: 'Frontend Development',
      tech_stack: ['React', 'JavaScript', 'Tailwind CSS', 'REST API'],
      github_url: 'https://github.com/Ramalingam2109',
      live_url: '#',
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      description: 'A responsive e-commerce web application featuring client-side routing, product search filtering, dynamic shopping cart state, and responsive checkout UI.',
      highlights: ['Implemented persistent shopping cart state in localStorage', 'Built searchable product catalogs with dynamic category filters', 'Developed clean, mobile-first responsive interfaces']
    }
  ];

  for (const p of projects) {
    await sql.query(
      `INSERT INTO projects (id, title, category, year, role, tech_stack, github_url, live_url, image_url, description, highlights)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       ON CONFLICT (id) DO UPDATE SET
         title = EXCLUDED.title,
         category = EXCLUDED.category,
         year = EXCLUDED.year,
         role = EXCLUDED.role,
         tech_stack = EXCLUDED.tech_stack,
         github_url = EXCLUDED.github_url,
         live_url = EXCLUDED.live_url,
         image_url = EXCLUDED.image_url,
         description = EXCLUDED.description,
         highlights = EXCLUDED.highlights`,
      [p.id, p.title, p.category, p.year, p.role, p.tech_stack, p.github_url, p.live_url, p.image_url, p.description, p.highlights]
    );
  }

  // 4. Verification
  const skillsCount = await sql.query('SELECT count(*) FROM skills');
  const projectsRows = await sql.query('SELECT id, title, category FROM projects');
  const profileRow = await sql.query('SELECT id, name, full_name, email FROM profile');

  console.log('=== Neon Database State ===');
  console.log('Skills Count:', skillsCount[0].count);
  console.log('Projects Count:', projectsRows.length);
  console.log('Projects Rows:', projectsRows);
  console.log('Profile Row:', profileRow);
  console.log('Neon Database successfully migrated and populated!');
}

run().catch(err => {
  console.error('Fatal error during migration:', err);
  process.exit(1);
});
