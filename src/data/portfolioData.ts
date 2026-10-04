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

export interface PeriodicSkill {
  id: string;
  number: string;
  symbol: string;
  name: string;
  family: 'Languages' | 'Frontend' | 'Backend' | 'Databases' | 'Tools' | 'Core';
  level: string;
  description: string;
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
    tagline: 'Aspiring Software Engineer & Web Developer',
    headline: 'Building modern web applications with clean code, strong fundamentals, and genuine passion.',
    bio: 'Computer Science student and aspiring software engineer based in Chennai, India. Focused on full-stack web development, data structures, and modern JavaScript frameworks. Motivated to learn quickly, collaborate effectively, and contribute to impactful software engineering teams.',
    location: 'Chennai, India',
    status: 'Seeking Entry-Level Roles & Opportunities',
    email: 'ramalingam2109@gmail.com',
    github: 'https://github.com/Ramalingam2109',
    linkedin: 'https://linkedin.com/in/ramalingam2109',
    yearsExp: 'Fresher (0 Years)',
    available: true
  },
  stats: [
    { number: '15+', label: 'GitHub Repositories', note: 'Personal and academic code' },
    { number: '100%', label: 'Commitment to Growth', note: 'Continuous daily learning' },
    { number: 'CS', label: 'Solid Core Fundamentals', note: 'Data structures & algorithms' },
    { number: 'IST', label: 'Chennai, India', note: 'Open to remote & on-site' }
  ],
  periodicSkills: [
    // Languages
    { id: 'sk-1', number: '01', symbol: 'C++', name: 'C++', family: 'Languages', level: 'Core Fundamentals', description: 'Object-oriented programming, memory management, and problem solving.' },
    { id: 'sk-2', number: '02', symbol: 'Jv', name: 'Java', family: 'Languages', level: 'Intermediate', description: 'Core OOP concepts, collections framework, and application logic.' },
    { id: 'sk-3', number: '03', symbol: 'Py', name: 'Python', family: 'Languages', level: 'Proficient', description: 'Scripting, backend development with FastAPI, and data manipulation.' },
    { id: 'sk-4', number: '04', symbol: 'Js', name: 'JavaScript', family: 'Languages', level: 'Proficient', description: 'ES6+ standards, asynchronous execution, DOM handling, and modern patterns.' },
    { id: 'sk-5', number: '05', symbol: 'Ts', name: 'TypeScript', family: 'Languages', level: 'Proficient', description: 'Static typing, interfaces, type inference, and scalable development.' },

    // Frontend
    { id: 'sk-6', number: '06', symbol: 'Re', name: 'React.js', family: 'Frontend', level: 'Primary Library', description: 'Functional components, custom hooks, virtual DOM, and component state.' },
    { id: 'sk-7', number: '07', symbol: 'Nx', name: 'Next.js', family: 'Frontend', level: 'Framework', description: 'Server-side rendering, API routes, App router, and optimization.' },
    { id: 'sk-8', number: '08', symbol: 'Ht', name: 'HTML5', family: 'Frontend', level: 'Fundamental', description: 'Semantic structure, accessibility standards, and SEO best practices.' },
    { id: 'sk-9', number: '09', symbol: 'Cs', name: 'CSS3', family: 'Frontend', level: 'Styling', description: 'Flexbox, Grid layouts, keyframe animations, and responsive media queries.' },
    { id: 'sk-10', number: '10', symbol: 'Tw', name: 'Tailwind CSS', family: 'Frontend', level: 'Utility CSS', description: 'Rapid responsive UI engineering and custom theme configurations.' },
    { id: 'sk-11', number: '11', symbol: 'Fm', name: 'Framer Motion', family: 'Frontend', level: 'Animation', description: 'Spring physics, layout transitions, and micro-interactions.' },

    // Backend
    { id: 'sk-12', number: '12', symbol: 'No', name: 'Node.js', family: 'Backend', level: 'Runtime', description: 'Event-driven architecture, non-blocking I/O, and npm package ecosystem.' },
    { id: 'sk-13', number: '13', symbol: 'Ex', name: 'Express.js', family: 'Backend', level: 'REST Framework', description: 'Middleware composition, route handlers, and REST API development.' },
    { id: 'sk-14', number: '14', symbol: 'Fa', name: 'FastAPI', family: 'Backend', level: 'Python Framework', description: 'High-performance asynchronous REST endpoints and Pydantic validation.' },
    { id: 'sk-15', number: '15', symbol: 'Ra', name: 'REST APIs', family: 'Backend', level: 'Architecture', description: 'HTTP verbs, status codes, JSON formatting, and CRUD workflows.' },

    // Databases
    { id: 'sk-16', number: '16', symbol: 'Sq', name: 'SQL', family: 'Databases', level: 'Query Language', description: 'Relational schema design, normalization, joins, and indexing.' },
    { id: 'sk-17', number: '17', symbol: 'Pg', name: 'PostgreSQL', family: 'Databases', level: 'RDBMS', description: 'Relational database administration, constraints, and transactions.' },
    { id: 'sk-18', number: '18', symbol: 'My', name: 'MySQL', family: 'Databases', level: 'RDBMS', description: 'Tables, queries, relational models, and stored procedures.' },
    { id: 'sk-19', number: '19', symbol: 'Mg', name: 'MongoDB', family: 'Databases', level: 'NoSQL', description: 'Document stores, Mongoose schemas, and aggregation pipelines.' },

    // Tools
    { id: 'sk-20', number: '20', symbol: 'Gt', name: 'Git', family: 'Tools', level: 'Version Control', description: 'Branching strategies, pull requests, merges, and commit hygiene.' },
    { id: 'sk-21', number: '21', symbol: 'Gh', name: 'GitHub', family: 'Tools', level: 'Collaboration', description: 'Repository hosting, GitHub Actions, CI/CD basics, and documentation.' },
    { id: 'sk-22', number: '22', symbol: 'Pm', name: 'Postman', family: 'Tools', level: 'Testing', description: 'API endpoint verification, request collections, and environment testing.' },
    { id: 'sk-23', number: '23', symbol: 'Vs', name: 'VS Code', family: 'Tools', level: 'Primary IDE', description: 'Extensions, debugging workflows, and terminal integration.' },

    // Core
    { id: 'sk-24', number: '24', symbol: 'Ds', name: 'Data Structures', family: 'Core', level: 'CS Fundamentals', description: 'Arrays, linked lists, stacks, queues, trees, graphs, and hash maps.' },
    { id: 'sk-25', number: '25', symbol: 'Al', name: 'Algorithms', family: 'Core', level: 'CS Fundamentals', description: 'Searching, sorting, recursion, dynamic programming, and Big-O notation.' },
    { id: 'sk-26', number: '26', symbol: 'Op', name: 'OOP Concepts', family: 'Core', level: 'Paradigm', description: 'Encapsulation, inheritance, polymorphism, and abstraction.' }
  ] as PeriodicSkill[],
  projects: [
    {
      id: 'proj-1',
      title: 'Awwwards Portfolio Experience',
      category: 'Interactive Web Application',
      year: '2026',
      role: 'Frontend Developer',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lenis'],
      githubUrl: 'https://github.com/Ramalingam2109/Awaards-Portfolio--VC',
      liveUrl: 'https://ramalingam-portfolio.vercel.app',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      description: 'A personal portfolio website exploring Awwwards-inspired design principles, smooth scroll animations, and interactive component architecture.',
      highlights: [
        'Built with React, Vite, and strict TypeScript types',
        'Implemented smooth inertial scrolling with Lenis',
        'Engineered responsive layouts and theme transition states',
        'Applied modern CSS utilities and spring-physics interactions'
      ]
    },
    {
      id: 'proj-2',
      title: 'DevPulse Telemetry Dashboard',
      category: 'Full-Stack Project',
      year: '2025',
      role: 'Full-Stack Developer',
      techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'],
      githubUrl: 'https://github.com/Ramalingam2109',
      liveUrl: '#',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      description: 'A practical full-stack monitoring dashboard built to practice real-time data handling, database queries, and metric visualizations.',
      highlights: [
        'Connected frontend dashboard to Node.js backend endpoints',
        'Designed relational tables in PostgreSQL for metric logs',
        'Created responsive analytical graphs with Tailwind and SVG'
      ]
    },
    {
      id: 'proj-3',
      title: 'Audio Synth Playground',
      category: 'Web Audio Project',
      year: '2025',
      role: 'Frontend Developer',
      techStack: ['React', 'Web Audio API', 'HTML5 Canvas', 'TypeScript'],
      githubUrl: 'https://github.com/Ramalingam2109',
      liveUrl: '#',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      description: 'An interactive browser experiment exploring the Web Audio API, sound generation algorithms, and real-time canvas frequency spectrum visualizers.',
      highlights: [
        'Utilized Web Audio API oscillator and gain nodes',
        'Rendered real-time dynamic frequency FFT waves on Canvas',
        'Structured modular TypeScript state management'
      ]
    },
    {
      id: 'proj-4',
      title: 'Modern Storefront Application',
      category: 'Web Development Project',
      year: '2024',
      role: 'Frontend Developer',
      techStack: ['React', 'JavaScript', 'Tailwind CSS', 'REST API'],
      githubUrl: 'https://github.com/Ramalingam2109',
      liveUrl: '#',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      description: 'A responsive e-commerce web application featuring client-side routing, product filtering, dynamic cart state, and responsive checkout UI.',
      highlights: [
        'Implemented persistent shopping cart state in localStorage',
        'Built searchable product catalogs with dynamic category filters',
        'Developed clean, mobile-first responsive interfaces'
      ]
    }
  ],
  experiences: [
    {
      id: 'exp-1',
      role: 'Computer Science & Engineering Scholar',
      company: 'Undergraduate Degree',
      period: '2022 — Present',
      location: 'Chennai, India',
      description: 'Academically focused on core computer science foundations including data structures, algorithms, database management systems, operating systems, and computer networks.',
      stack: ['Data Structures', 'Algorithms', 'Java', 'C++', 'SQL', 'Computer Networks']
    },
    {
      id: 'exp-2',
      role: 'Independent Web & Software Development',
      company: 'Self-Directed Projects',
      period: '2023 — Present',
      location: 'Chennai, India',
      description: 'Actively building modern web applications, learning production-grade TypeScript workflows, exploring backend architectures, and solving programming challenges.',
      stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'Git']
    }
  ]
};
