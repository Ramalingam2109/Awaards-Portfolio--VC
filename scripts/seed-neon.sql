-- ==============================================================================
-- Neon PostgreSQL Database Schema & Initial Seed Data
-- Project ID: spring-mouse-42979360 (Branch: production)
-- ==============================================================================

-- 1. Create Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id VARCHAR(64) PRIMARY KEY,
    symbol VARCHAR(8) NOT NULL,
    name VARCHAR(128) NOT NULL,
    family VARCHAR(64) NOT NULL,
    description TEXT,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Projects Table
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

-- 3. Create Profile Table
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

-- ==============================================================================
-- SEED DATA INSERTION
-- ==============================================================================

-- Insert / Update Profile
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
    tagline = EXCLUDED.tagline,
    bio = EXCLUDED.bio,
    updated_at = CURRENT_TIMESTAMP;

-- Insert Skills
INSERT INTO skills (id, symbol, name, family, featured, description) VALUES
('sk-1', 'Re', 'React', 'Frameworks', true, 'Component-driven user interfaces, custom hooks, state management, and modern React patterns.'),
('sk-2', 'Nx', 'Next.js', 'Frameworks', true, 'Full-stack React framework with server-side rendering, API routes, and optimized routing.'),
('sk-3', 'Js', 'JavaScript', 'Languages', true, 'Modern ECMAScript (ES6+), asynchronous event-driven programming, and DOM manipulation.'),
('sk-4', 'Py', 'Python', 'Languages', true, 'Clean scripting, backend services with Django/FastAPI, and algorithmic problem solving.'),
('sk-5', 'Jv', 'Java', 'Languages', true, 'Object-oriented programming, enterprise backend services, and multi-threaded systems.'),
('sk-6', 'Pg', 'PostgreSQL', 'Databases', true, 'Relational database schema modeling, complex SQL queries, indexing, and data integrity.'),
('sk-7', 'Dk', 'Docker', 'DevOps & Cloud', true, 'Containerization, reproducible deployment environments, and multi-service orchestration.'),
('sk-8', 'Gt', 'Git', 'DevOps & Cloud', true, 'Version control, feature branching workflows, code reviews, and collaborative development.'),
('sk-9', 'Ht', 'HTML5', 'Languages', false, 'Semantic structure, accessibility best practices (a11y), and modern standards compliance.'),
('sk-10', 'Cs', 'CSS3', 'Languages', false, 'Responsive layouts with Flexbox and Grid, animations, and modern styling architectures.'),
('sk-11', 'No', 'Node.js', 'Languages', false, 'Asynchronous event-driven JavaScript runtime for high-throughput APIs and network applications.'),
('sk-12', 'Dj', 'Django', 'Frameworks', false, 'High-level Python web framework for clean backend services, ORM, and secure authentication.'),
('sk-13', 'Sb', 'SpringBoot', 'Frameworks', false, 'Production-ready microservices and RESTful API backends in Java with dependency injection.'),
('sk-14', 'Mg', 'MongoDB', 'Databases', false, 'NoSQL document database for flexible schema design and aggregation pipelines.'),
('sk-15', 'My', 'MySQL', 'Databases', false, 'Standard relational database management, structured queries, and normalized schemas.'),
('sk-16', 'Pr', 'Prisma', 'Databases', false, 'Type-safe database ORM and query builder for Node.js and TypeScript.'),
('sk-17', 'Op', 'OOPs', 'Core Skills', false, 'Object-oriented principles: encapsulation, inheritance, polymorphism, and abstraction.'),
('sk-18', 'Ap', 'REST APIs', 'Core Skills', false, 'RESTful architecture, status codes, payload design, and scalable client-server contracts.'),
('sk-19', 'Ld', 'Low Level Design', 'Core Skills', false, 'Class diagrams, design patterns, modular component decomposition, and interface segregation.'),
('sk-20', 'Hd', 'High Level Design', 'Core Skills', false, 'System architecture, scalability planning, service separation, and data flow modeling.'),
('sk-21', 'Dp', 'Design Patterns', 'Core Skills', false, 'Proven software architectural patterns including Factory, Singleton, Strategy, and Observer.'),
('sk-22', 'Aw', 'AWS', 'DevOps & Cloud', false, 'Cloud infrastructure deployment, compute services (EC2), and object storage (S3).'),
('sk-23', 'Vc', 'Vercel', 'DevOps & Cloud', false, 'Continuous integration and edge deployment for modern frontend and Next.js applications.'),
('sk-24', 'Rd', 'Render', 'DevOps & Cloud', false, 'Unified cloud hosting for web applications, background worker services, and managed databases.'),
('sk-25', 'Tf', 'Terraform', 'DevOps & Cloud', false, 'Infrastructure as Code (IaC) for declaring, provisioning, and managing cloud environments.'),
('sk-26', 'An', 'Ansible', 'DevOps & Cloud', false, 'Configuration automation, system provisioning, and multi-node application deployment.'),
('sk-27', 'Pm', 'Postman', 'Tools & IDEs', false, 'API testing, automated collection runs, mock servers, and endpoint documentation.'),
('sk-28', 'Vs', 'VS Code', 'Tools & IDEs', false, 'Configured primary development environment with advanced linting, debugging, and terminal tools.'),
('sk-29', 'Jb', 'JetBrains IDEs', 'Tools & IDEs', false, 'IntelliJ IDEA, PyCharm, and WebStorm for specialized software engineering workflows.'),
('sk-30', 'Ec', 'Eclipse', 'Tools & IDEs', false, 'Enterprise Java development IDE for desktop and enterprise application development.'),
('sk-31', 'Cu', 'Cursor', 'Tools & IDEs', false, 'Modern AI-enhanced IDE for accelerated coding and architectural exploration.'),
('sk-32', 'Ag', 'Antigravity', 'Tools & IDEs', false, 'Advanced agentic engineering tools and modern automated workflows.'),
('sk-33', 'Kb', 'Kanban', 'Tools & IDEs', false, 'Visual workflow management for continuous integration and feature task prioritization.'),
('sk-34', 'Am', 'Agile', 'Tools & IDEs', false, 'Iterative software development, sprint planning, and collaborative feedback loops.')
ON CONFLICT (id) DO UPDATE SET
    symbol = EXCLUDED.symbol,
    name = EXCLUDED.name,
    family = EXCLUDED.family,
    description = EXCLUDED.description,
    featured = EXCLUDED.featured;

-- Insert Projects
INSERT INTO projects (id, title, category, year, role, tech_stack, github_url, live_url, image_url, description, highlights) VALUES
(
    'proj-1',
    'Awwwards Portfolio Experience',
    'Interactive Web Application',
    '2026',
    'Frontend Engineering',
    ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lenis'],
    'https://github.com/Ramalingam2109/Awaards-Portfolio--VC',
    'https://ramalingam-portfolio.vercel.app',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    'An interactive portfolio website engineered with React and Vite, featuring smooth inertial scrolling, theme transitions, and clean component architecture.',
    ARRAY['Engineered with React, Vite, and strict TypeScript types', 'Implemented butter-smooth inertial scrolling using Lenis', 'Designed dynamic scroll-driven theme transitions', 'Structured modular components with clean CSS utilities']
),
(
    'proj-2',
    'DevPulse Telemetry Dashboard',
    'Full-Stack Application',
    '2025',
    'Full-Stack Development',
    ARRAY['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'],
    'https://github.com/Ramalingam2109',
    '#',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'A full-stack monitoring application designed to practice real-time data ingestion, relational schema querying, and analytical dashboard visualization.',
    ARRAY['Connected frontend dashboard to Node.js backend endpoints', 'Designed relational tables in PostgreSQL for metric logs', 'Built responsive analytical graphs with Tailwind and SVG']
),
(
    'proj-3',
    'Audio Synth Playground',
    'Web Audio Application',
    '2025',
    'Frontend Development',
    ARRAY['React', 'Web Audio API', 'HTML5 Canvas', 'TypeScript'],
    'https://github.com/Ramalingam2109',
    '#',
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    'An interactive web audio synthesizer utilizing the Web Audio API for tone generation, harmonic filters, and real-time canvas frequency spectrum visualizers.',
    ARRAY['Utilized Web Audio API oscillator and gain nodes', 'Rendered dynamic frequency FFT wave patterns on Canvas', 'Structured modular TypeScript state management']
),
(
    'proj-4',
    'Modern Storefront Application',
    'Web Application',
    '2024',
    'Frontend Development',
    ARRAY['React', 'JavaScript', 'Tailwind CSS', 'REST API'],
    'https://github.com/Ramalingam2109',
    '#',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'A responsive e-commerce web application featuring client-side routing, product search filtering, dynamic shopping cart state, and responsive checkout UI.',
    ARRAY['Implemented persistent shopping cart state in localStorage', 'Built searchable product catalogs with dynamic category filters', 'Developed clean, mobile-first responsive interfaces']
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    year = EXCLUDED.year,
    tech_stack = EXCLUDED.tech_stack,
    description = EXCLUDED.description;
