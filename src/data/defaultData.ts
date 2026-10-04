import { PortfolioData } from '../types';

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: 'Ramalingam',
    title: 'Creative Developer & Software Engineer',
    headline: 'Crafting digital experiences with precision, aesthetic engineering, and high-performance code.',
    bio: 'I am a passionate software developer and engineer from Chennai, India, dedicated to transforming creative concepts into scalable, award-grade digital products. With a keen eye for motion design and robust architecture, I build fluid web applications and intelligent systems.',
    location: 'Chennai, India',
    status: 'Open to Work (Remote / Hybrid / Freelance)',
    email: 'ramalingam2109@gmail.com',
    github: 'https://github.com/Ramalingam2109',
    linkedin: 'https://linkedin.com/in/ramalingam2109',
    twitter: 'https://twitter.com',
    resumeUrl: '#',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    availableForHire: true,
    yearsOfExperience: '2+'
  },
  stats: [
    { label: 'Public Repositories', value: '15+', subtext: 'Open source projects on GitHub' },
    { label: 'Core Competencies', value: '12+', subtext: 'Modern web & backend technologies' },
    { label: 'Code Quality', value: '100%', subtext: 'Modern TypeScript & responsive design' },
    { label: 'Location', value: 'Chennai', subtext: 'Available Worldwide for remote roles' }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Awwwards Portfolio Experience',
      tagline: 'Interactive luxury developer portfolio with Lenis smooth scroll and Excel data integration',
      category: 'Creative Development',
      year: '2026',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lenis', 'SheetJS'],
      githubUrl: 'https://github.com/Ramalingam2109/Awaards-Portfolio--VC',
      liveUrl: 'https://ramalingam-portfolio.vercel.app',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      description: 'An Awwwards-inspired developer portfolio featuring fluid physics-based cursor followers, dynamic Excel sheet synchronization, editorial kinetic typography, and silky smooth momentum scrolling.',
      featured: true,
      highlights: [
        'Live synchronization with Excel (.xlsx) data sheet',
        'Custom Web Audio API micro-sound synthesis',
        'Spring-physics floating hover preview card tracking pointer',
        'Dark luxury aesthetic with noise texture and ambient gradient mesh'
      ]
    },
    {
      id: 'proj-2',
      title: 'Nexus Cloud Analytics Platform',
      tagline: 'Real-time telemetry dashboard with reactive data visualization & AI insights',
      category: 'Full-Stack Application',
      year: '2025',
      techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Ramalingam2109',
      liveUrl: '#',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      description: 'A comprehensive cloud metrics monitoring suite delivering real-time streaming analytics, anomalous traffic detection, and custom user configurable report widgets.',
      featured: true,
      highlights: [
        'Sub-100ms real-time event streaming via WebSockets',
        'Interactive charts & dynamic metric heatmaps',
        'Role-based access control and multi-tenant database partitioning'
      ]
    },
    {
      id: 'proj-3',
      title: 'Aura AI Audio Studio',
      tagline: 'Generative soundscapes & voice synthesis engine for next-gen creators',
      category: 'AI & WebGL',
      year: '2025',
      techStack: ['React', 'Python', 'FastAPI', 'Three.js', 'Web Audio API'],
      githubUrl: 'https://github.com/Ramalingam2109',
      liveUrl: '#',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      description: 'An experimental browser-based audio workstation integrating neural voice modulation, dynamic visual waveform shaders, and seamless export workflows.',
      featured: true,
      highlights: [
        'Interactive 3D particle visualizer linked to real-time audio frequencies',
        'Low-latency audio processing pipeline',
        'Custom modular node graph for audio synthesis effects'
      ]
    },
    {
      id: 'proj-4',
      title: 'Vanguard E-Commerce Suite',
      tagline: 'High-conversion headless storefront with lightning fast page transitions',
      category: 'Web Application',
      year: '2024',
      techStack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Stripe API', 'Express'],
      githubUrl: 'https://github.com/Ramalingam2109',
      liveUrl: '#',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      description: 'An ultra-fast, modern e-commerce platform boasting instant search, optimistic cart updates, automated tax computation, and seamless Stripe checkout integration.',
      featured: false,
      highlights: [
        '99+ Lighthouse performance & accessibility score',
        'Optimistic client-side cart updates with offline caching',
        'End-to-end checkout pipeline with Stripe webhooks'
      ]
    }
  ],
  skills: [
    { id: 'sk-1', name: 'React & Next.js', category: 'Frontend', level: 95, levelLabel: 'Expert', featured: true, icon: 'Atom' },
    { id: 'sk-2', name: 'TypeScript', category: 'Frontend', level: 90, levelLabel: 'Advanced', featured: true, icon: 'FileCode2' },
    { id: 'sk-3', name: 'Tailwind CSS', category: 'Frontend', level: 95, levelLabel: 'Expert', featured: true, icon: 'Palette' },
    { id: 'sk-4', name: 'Framer Motion & GSAP', category: 'Frontend', level: 88, levelLabel: 'Advanced', featured: true, icon: 'Sparkles' },
    { id: 'sk-5', name: 'Node.js & Express', category: 'Backend', level: 85, levelLabel: 'Advanced', featured: true, icon: 'Server' },
    { id: 'sk-6', name: 'Python', category: 'Backend', level: 82, levelLabel: 'Proficient', featured: true, icon: 'Terminal' },
    { id: 'sk-7', name: 'REST & GraphQL APIs', category: 'Backend', level: 88, levelLabel: 'Advanced', featured: false, icon: 'Cpu' },
    { id: 'sk-8', name: 'PostgreSQL & MongoDB', category: 'Database & Cloud', level: 84, levelLabel: 'Advanced', featured: true, icon: 'Database' },
    { id: 'sk-9', name: 'Git & GitHub', category: 'Tools & DevOps', level: 92, levelLabel: 'Expert', featured: true, icon: 'GitBranch' },
    { id: 'sk-10', name: 'Docker & CI/CD', category: 'Tools & DevOps', level: 78, levelLabel: 'Proficient', featured: false, icon: 'Box' },
    { id: 'sk-11', name: 'Data Structures & Algorithms', category: 'Core CS', level: 86, levelLabel: 'Advanced', featured: true, icon: 'Binary' },
    { id: 'sk-12', name: 'UI/UX & Design Systems', category: 'Frontend', level: 90, levelLabel: 'Advanced', featured: true, icon: 'Layout' }
  ],
  experiences: [
    {
      id: 'exp-1',
      role: 'Full-Stack Developer & Freelance Engineer',
      company: 'Self-Employed / Freelance',
      period: '2024 — Present',
      location: 'Remote / Chennai, India',
      type: 'Freelance',
      description: 'Architecting dynamic web applications, bespoke client websites, and interactive user interfaces. Delivering modern, performant codebases with Next.js, TypeScript, and cloud services.',
      skillsUsed: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Figma']
    },
    {
      id: 'exp-2',
      role: 'Software Engineering Student',
      company: 'University / Higher Education',
      period: '2022 — Present',
      location: 'Chennai, India',
      type: 'Education',
      description: 'Specializing in computer science fundamentals, algorithm design, full-stack software development, database management systems, and collaborative team projects.',
      skillsUsed: ['Data Structures', 'Python', 'Java', 'Database Systems', 'Software Engineering']
    },
    {
      id: 'exp-3',
      role: 'Open Source Contributor',
      company: 'GitHub Ecosystem',
      period: '2023 — Present',
      location: 'Global',
      type: 'Open Source',
      description: 'Actively publishing open-source utility repositories, component libraries, and experimenting with cutting-edge front-end animation paradigms.',
      skillsUsed: ['Git', 'TypeScript', 'Vite', 'Open Source']
    }
  ]
};
