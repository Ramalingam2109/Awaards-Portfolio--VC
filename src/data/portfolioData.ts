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
  symbol: string;
  name: string;
  family: 'Languages' | 'Frameworks' | 'Databases' | 'DevOps & Cloud' | 'Core Skills' | 'Tools & IDEs';
  featured?: boolean;
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
    tagline: 'Software Developer & Full-Stack Engineer',
    headline: 'Engineering scalable web applications and software systems with a passion for clean code and modern architecture.',
    bio: 'Software engineer based in Chennai, India. I specialize in full-stack web development, building responsive frontends, modular REST APIs, and efficient database architectures. Committed to technical excellence, continuous learning, and creating impactful digital experiences.',
    location: 'Chennai, India',
    status: 'Available for opportunities',
    email: 'ramalingam2109@gmail.com',
    github: 'https://github.com/Ramalingam2109',
    linkedin: 'https://linkedin.com/in/ramalingam2109',
    available: true
  },
  stats: [
    { number: '15+', label: 'GitHub Repositories', note: 'Public code & projects' },
    { number: 'Full', label: 'Stack Scope', note: 'Frontend to database' },
    { number: 'Core', label: 'CS Foundations', note: 'Data structures & OOP' },
    { number: 'IST', label: 'Chennai, India', note: 'Available worldwide' }
  ],

  // Complete technical skill set
  periodicSkills: [
    // Primary Featured Core Row (Displayed by default)
    { id: 'sk-1', symbol: 'Re', name: 'React', family: 'Frameworks', featured: true, description: 'Component-driven user interfaces, custom hooks, state management, and modern React patterns.' },
    { id: 'sk-2', symbol: 'Nx', name: 'Next.js', family: 'Frameworks', featured: true, description: 'Full-stack React framework with server-side rendering, API routes, and optimized routing.' },
    { id: 'sk-3', symbol: 'Js', name: 'JavaScript', family: 'Languages', featured: true, description: 'Modern ECMAScript (ES6+), asynchronous event-driven programming, and DOM manipulation.' },
    { id: 'sk-4', symbol: 'Py', name: 'Python', family: 'Languages', featured: true, description: 'Clean scripting, backend services with Django/FastAPI, and algorithmic problem solving.' },
    { id: 'sk-5', symbol: 'Jv', name: 'Java', family: 'Languages', featured: true, description: 'Object-oriented programming, enterprise backend services, and multi-threaded systems.' },
    { id: 'sk-6', symbol: 'Pg', name: 'PostgreSQL', family: 'Databases', featured: true, description: 'Relational database schema modeling, complex SQL queries, indexing, and data integrity.' },
    { id: 'sk-7', symbol: 'Dk', name: 'Docker', family: 'DevOps & Cloud', featured: true, description: 'Containerization, reproducible deployment environments, and multi-service orchestration.' },
    { id: 'sk-8', symbol: 'Gt', name: 'Git', family: 'DevOps & Cloud', featured: true, description: 'Version control, feature branching workflows, code reviews, and collaborative development.' },

    // Languages
    { id: 'sk-9', symbol: 'Ht', name: 'HTML5', family: 'Languages', description: 'Semantic structure, accessibility best practices (a11y), and modern standards compliance.' },
    { id: 'sk-10', symbol: 'Cs', name: 'CSS3', family: 'Languages', description: 'Responsive layouts with Flexbox and Grid, animations, and modern styling architectures.' },
    { id: 'sk-11', symbol: 'No', name: 'Node.js', family: 'Languages', description: 'Asynchronous event-driven JavaScript runtime for high-throughput APIs and network applications.' },

    // Frameworks
    { id: 'sk-12', symbol: 'Dj', name: 'Django', family: 'Frameworks', description: 'High-level Python web framework for clean backend services, ORM, and secure authentication.' },
    { id: 'sk-13', symbol: 'Sb', name: 'SpringBoot', family: 'Frameworks', description: 'Production-ready microservices and RESTful API backends in Java with dependency injection.' },

    // Databases
    { id: 'sk-14', symbol: 'Mg', name: 'MongoDB', family: 'Databases', description: 'NoSQL document database for flexible schema design and aggregation pipelines.' },
    { id: 'sk-15', symbol: 'My', name: 'MySQL', family: 'Databases', description: 'Standard relational database management, structured queries, and normalized schemas.' },
    { id: 'sk-16', symbol: 'Pr', name: 'Prisma', family: 'Databases', description: 'Type-safe database ORM and query builder for Node.js and TypeScript.' },

    // Core Skills & Architecture
    { id: 'sk-17', symbol: 'Op', name: 'OOPs', family: 'Core Skills', description: 'Object-oriented principles: encapsulation, inheritance, polymorphism, and abstraction.' },
    { id: 'sk-18', symbol: 'Ap', name: 'REST APIs', family: 'Core Skills', description: 'RESTful architecture, status codes, payload design, and scalable client-server contracts.' },
    { id: 'sk-19', symbol: 'Ld', name: 'Low Level Design', family: 'Core Skills', description: 'Class diagrams, design patterns, modular component decomposition, and interface segregation.' },
    { id: 'sk-20', symbol: 'Hd', name: 'High Level Design', family: 'Core Skills', description: 'System architecture, scalability planning, service separation, and data flow modeling.' },
    { id: 'sk-21', symbol: 'Dp', name: 'Design Patterns', family: 'Core Skills', description: 'Proven software architectural patterns including Factory, Singleton, Strategy, and Observer.' },

    // DevOps & Deployment Tools
    { id: 'sk-22', symbol: 'Aw', name: 'AWS', family: 'DevOps & Cloud', description: 'Cloud infrastructure deployment, compute services (EC2), and object storage (S3).' },
    { id: 'sk-23', symbol: 'Vc', name: 'Vercel', family: 'DevOps & Cloud', description: 'Continuous integration and edge deployment for modern frontend and Next.js applications.' },
    { id: 'sk-24', symbol: 'Rd', name: 'Render', family: 'DevOps & Cloud', description: 'Unified cloud hosting for web applications, background worker services, and managed databases.' },
    { id: 'sk-25', symbol: 'Tf', name: 'Terraform', family: 'DevOps & Cloud', description: 'Infrastructure as Code (IaC) for declaring, provisioning, and managing cloud environments.' },
    { id: 'sk-26', symbol: 'An', name: 'Ansible', family: 'DevOps & Cloud', description: 'Configuration automation, system provisioning, and multi-node application deployment.' },

    // IDEs, Testing Tools & Methodologies
    { id: 'sk-27', symbol: 'Pm', name: 'Postman', family: 'Tools & IDEs', description: 'API testing, automated collection runs, mock servers, and endpoint documentation.' },
    { id: 'sk-28', symbol: 'Vs', name: 'VS Code', family: 'Tools & IDEs', description: 'Configured primary development environment with advanced linting, debugging, and terminal tools.' },
    { id: 'sk-29', symbol: 'Jb', name: 'JetBrains IDEs', family: 'Tools & IDEs', description: 'IntelliJ IDEA, PyCharm, and WebStorm for specialized software engineering workflows.' },
    { id: 'sk-30', symbol: 'Ec', name: 'Eclipse', family: 'Tools & IDEs', description: 'Enterprise Java development IDE for desktop and enterprise application development.' },
    { id: 'sk-31', symbol: 'Cu', name: 'Cursor', family: 'Tools & IDEs', description: 'Modern AI-enhanced IDE for accelerated coding and architectural exploration.' },
    { id: 'sk-32', symbol: 'Ag', name: 'Antigravity', family: 'Tools & IDEs', description: 'Advanced agentic engineering tools and modern automated workflows.' },
    { id: 'sk-33', symbol: 'Kb', name: 'Kanban', family: 'Tools & IDEs', description: 'Visual workflow management for continuous integration and feature task prioritization.' },
    { id: 'sk-34', symbol: 'Am', name: 'Agile', family: 'Tools & IDEs', description: 'Iterative software development, sprint planning, and collaborative feedback loops.' }
  ] as PeriodicSkill[],

  projects: [
    {
      id: 'proj-1',
      title: 'Awwwards Portfolio Experience',
      category: 'Interactive Web Application',
      year: '2026',
      role: 'Frontend Engineering',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lenis'],
      githubUrl: 'https://github.com/Ramalingam2109/Awaards-Portfolio--VC',
      liveUrl: 'https://ramalingam-portfolio.vercel.app',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      description: 'An interactive portfolio website engineered with React and Vite, featuring smooth inertial scrolling, theme transitions, and clean component architecture.',
      highlights: [
        'Engineered with React, Vite, and strict TypeScript types',
        'Implemented butter-smooth inertial scrolling using Lenis',
        'Designed dynamic scroll-driven theme transitions',
        'Structured modular components with clean CSS utilities'
      ]
    },
    {
      id: 'proj-2',
      title: 'DevPulse Telemetry Dashboard',
      category: 'Full-Stack Application',
      year: '2025',
      role: 'Full-Stack Development',
      techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'],
      githubUrl: 'https://github.com/Ramalingam2109',
      liveUrl: '#',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      description: 'A full-stack monitoring application designed to practice real-time data ingestion, relational schema querying, and analytical dashboard visualization.',
      highlights: [
        'Connected frontend dashboard to Node.js backend endpoints',
        'Designed relational tables in PostgreSQL for metric logs',
        'Built responsive analytical graphs with Tailwind and SVG'
      ]
    },
    {
      id: 'proj-3',
      title: 'Audio Synth Playground',
      category: 'Web Audio Application',
      year: '2025',
      role: 'Frontend Development',
      techStack: ['React', 'Web Audio API', 'HTML5 Canvas', 'TypeScript'],
      githubUrl: 'https://github.com/Ramalingam2109',
      liveUrl: '#',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      description: 'An interactive web audio synthesizer utilizing the Web Audio API for tone generation, harmonic filters, and real-time canvas frequency spectrum visualizers.',
      highlights: [
        'Utilized Web Audio API oscillator and gain nodes',
        'Rendered dynamic frequency FFT wave patterns on Canvas',
        'Structured modular TypeScript state management'
      ]
    },
    {
      id: 'proj-4',
      title: 'Modern Storefront Application',
      category: 'Web Application',
      year: '2024',
      role: 'Frontend Development',
      techStack: ['React', 'JavaScript', 'Tailwind CSS', 'REST API'],
      githubUrl: 'https://github.com/Ramalingam2109',
      liveUrl: '#',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      description: 'A responsive e-commerce web application featuring client-side routing, product search filtering, dynamic shopping cart state, and responsive checkout UI.',
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
      role: 'Computer Science & Engineering',
      company: 'Undergraduate Studies',
      period: '2022 — Present',
      location: 'Chennai, India',
      description: 'Academic studies focusing on core computer science foundations including data structures, algorithms, database management, operating systems, and computer networks.',
      stack: ['Data Structures', 'Algorithms', 'Java', 'C++', 'SQL', 'Computer Networks']
    },
    {
      id: 'exp-2',
      role: 'Web & Software Engineering Projects',
      company: 'Independent Development',
      period: '2023 — Present',
      location: 'Chennai, India',
      description: 'Designing and building modern web applications, learning production-grade TypeScript workflows, exploring backend architectures, and solving technical challenges.',
      stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'Git']
    }
  ]
};
