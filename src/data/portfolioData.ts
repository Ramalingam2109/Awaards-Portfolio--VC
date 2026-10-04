export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  role: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database & Cloud' | 'Tools & Architecture';
  level: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  stack: string[];
}

export const portfolioData = {
  profile: {
    name: 'RAM',
    fullName: 'RAM',
    tagline: 'Creative Developer & Software Engineer',
    headline: 'Designing and engineering digital products with motion, precision, and architectural discipline.',
    bio: 'Based in Chennai, India. I specialize in building minimal, high-performance web experiences and scalable full-stack applications. Passionate about tactile interactions, editorial typography, and buttery-smooth interfaces.',
    location: 'Chennai, India',
    status: 'Available for Select Opportunities',
    email: 'ramalingam2109@gmail.com',
    github: 'https://github.com/Ramalingam2109',
    linkedin: 'https://linkedin.com/in/ramalingam2109',
    yearsExp: '2+ Years',
    available: true
  },
  stats: [
    { number: '15+', label: 'Public Repositories', note: 'Open-source code on GitHub' },
    { number: '04+', label: 'Flagship Systems', note: 'Full-stack & interactive web apps' },
    { number: '100%', label: 'Craft & Precision', note: 'Modern TypeScript & responsive UI' },
    { number: 'IST', label: 'Chennai, India', note: 'Working with teams worldwide' }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Awwwards Portfolio Experience',
      category: 'Creative Development & WebGL',
      year: '2026',
      role: 'Design & Engineering',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lenis'],
      githubUrl: 'https://github.com/Ramalingam2109/Awaards-Portfolio--VC',
      liveUrl: 'https://ramalingam-portfolio.vercel.app',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      description: 'An editorial developer portfolio featuring scroll-driven theme transitions (Dark to Light), spring-physics cursor follower, kinetic typography, and silky smooth momentum scrolling.',
      highlights: [
        'Dynamic scroll-driven background morphing between dark and warm paper light',
        'Spring physics trailing cursor with interactive hitboxes',
        'Tactile Web Audio API micro-sound feedback',
        'Responsive layout tuned for 60fps performance'
      ]
    },
    {
      id: 'proj-2',
      title: 'Nexus Cloud Telemetry',
      category: 'Full-Stack Platform',
      year: '2025',
      role: 'Full-Stack Lead',
      techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'],
      githubUrl: 'https://github.com/Ramalingam2109',
      liveUrl: '#',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      description: 'A cloud infrastructure intelligence platform providing sub-second streaming analytics, latency tracking, and anomaly detection.',
      highlights: [
        'Low-latency WebSocket streaming metrics',
        'Interactive SVG heatmaps and anomaly alarms',
        'Multi-tenant database isolation'
      ]
    },
    {
      id: 'proj-3',
      title: 'Aura Sound Lab',
      category: 'Experimental Audio & UI',
      year: '2025',
      role: 'Creative Developer',
      techStack: ['React', 'Web Audio API', 'Canvas', 'TypeScript', 'FastAPI'],
      githubUrl: 'https://github.com/Ramalingam2109',
      liveUrl: '#',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      description: 'An audio synthesis studio running natively in the browser with harmonic visualization shaders and custom modulators.',
      highlights: [
        'Real-time frequency FFT visualizer on HTML5 Canvas',
        'Node-based audio routing and low-latency buffer management',
        'Custom interactive knobs and tactile sliders'
      ]
    },
    {
      id: 'proj-4',
      title: 'Vanguard Commerce',
      category: 'Headless Web Application',
      year: '2024',
      role: 'Frontend Engineer',
      techStack: ['React', 'Redux', 'Tailwind CSS', 'Stripe API'],
      githubUrl: 'https://github.com/Ramalingam2109',
      liveUrl: '#',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      description: 'An ultra-lean headless storefront built for instant catalog navigation, seamless page transitions, and frictionless checkout flows.',
      highlights: [
        'Sub-50ms client-side page transitions',
        'Optimistic cart synchronization with local state',
        'Stripe Checkout and webhook integration'
      ]
    }
  ],
  skills: [
    { id: 'sk-1', name: 'React & Next.js', category: 'Frontend', level: 'Production Ready' },
    { id: 'sk-2', name: 'TypeScript', category: 'Frontend', level: 'Core Competency' },
    { id: 'sk-3', name: 'Tailwind CSS & Styling', category: 'Frontend', level: 'Expertise' },
    { id: 'sk-4', name: 'Framer Motion & GSAP', category: 'Frontend', level: 'Motion Design' },
    { id: 'sk-5', name: 'Node.js & Express', category: 'Backend', level: 'System Design' },
    { id: 'sk-6', name: 'Python & FastAPI', category: 'Backend', level: 'API Development' },
    { id: 'sk-7', name: 'PostgreSQL & MongoDB', category: 'Database & Cloud', level: 'Data Modeling' },
    { id: 'sk-8', name: 'Git & GitHub Workflow', category: 'Tools & Architecture', level: 'Daily Driver' },
    { id: 'sk-9', name: 'Docker & Containerization', category: 'Tools & Architecture', level: 'Infrastructure' },
    { id: 'sk-10', name: 'Data Structures & Algorithms', category: 'Tools & Architecture', level: 'Fundamentals' },
    { id: 'sk-11', name: 'UI/UX & Design Systems', category: 'Frontend', level: 'Art Direction' },
    { id: 'sk-12', name: 'REST & GraphQL APIs', category: 'Backend', level: 'Integration' }
  ],
  experiences: [
    {
      id: 'exp-1',
      role: 'Creative Developer & Software Engineer',
      company: 'Independent / Freelance',
      period: '2024 — Present',
      location: 'Chennai / Remote',
      description: 'Developing high-impact web products, interactive user experiences, and bespoke software systems for digital-first brands and teams.',
      stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
    },
    {
      id: 'exp-2',
      role: 'Software Engineering & CS Scholar',
      company: 'University Studies',
      period: '2022 — Present',
      location: 'Chennai, India',
      description: 'Rigorous study in algorithmic complexity, distributed systems, software engineering patterns, and modern full-stack web technologies.',
      stack: ['Algorithms', 'Python', 'Java', 'Databases', 'Computer Networks']
    },
    {
      id: 'exp-3',
      role: 'Open Source Contributor',
      company: 'GitHub Community',
      period: '2023 — Present',
      location: 'Global',
      description: 'Contributing to open developer tooling, crafting UI component libraries, and experimenting with kinetic front-end interactions.',
      stack: ['Git', 'TypeScript', 'Vite', 'Open Source']
    }
  ]
};
