# Awwwards-Inspired Developer Portfolio ⚡

> An award-grade, ultra-responsive portfolio website built for **Ramalingam** (Creative Developer & Software Engineer, Chennai, India). Inspired by Huy Ng's minimalist aesthetic, geometric typography, spring micro-interactions, Lenis inertial smooth scrolling, and real-time Excel spreadsheet content management.

---

## 🌟 Highlights & Features

- 🏎️ **Awwwards-Grade Motion & Feel**: Powered by Lenis smooth inertia scrolling, fluid physics cursor follower, and kinetic text reveals.
- 📊 **Excel Spreadsheet Data Hub**: Dynamic real-time content synchronization directly from /portfolio-data.xlsx or via in-browser drag-and-drop. Easily update projects, add new skills, and edit your bio without touching code.
- 🎨 **Editorial Monochromatic Aesthetic**: Dark luxury palette (#08080a), glassmorphic floating pills, noise overlay, and vibrant neon accents.
- 🗂️ **Interactive Projects Showcase**: List & Grid view switch with cursor-tracking floating spring thumbnail preview cards and deep-dive architectural modals.
- ⚡ **Sound FX Synthesis**: Built-in tactile micro-audio feedback synthesized with the browser's native Web Audio API (toggleable on/off).
- 📍 **Chennai Live Clock**: Real-time IST time ticker in the footer.
- 💌 **Direct Contact Suite**: One-click email copy with instant feedback toast, confetti burst, and direct message channel.

---

## 🛠️ Tech Stack

- **Framework**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Smooth Scrolling**: Lenis
- **Data Engine**: SheetJS (xlsx)
- **Icons**: Lucide React
- **Micro-Interactions**: Web Audio API, Canvas Confetti

---

## 📁 Project Structure

`
├── public/
│   └── portfolio-data.xlsx   # The live Excel sheet driving portfolio content
├── src/
│   ├── types/                # TypeScript interface definitions
│   ├── data/                 # Default fallback dataset
│   ├── services/             # Excel parsing and export engine (SheetJS)
│   ├── components/           # Modular React components
│   │   ├── Navbar.tsx        # Floating glass pill navbar & controls
│   │   ├── Hero.tsx          # Kinetic hero with magnetic CTAs
│   │   ├── Marquee.tsx       # Infinite text ticker
│   │   ├── About.tsx         # Editorial About & GitHub stats
│   │   ├── Projects.tsx      # Hover-preview project catalog
│   │   ├── ProjectModal.tsx  # Project deep-dive drawer
│   │   ├── Skills.tsx        # Interactive categorized tech matrix
│   │   ├── Experience.tsx    # Professional milestones timeline
│   │   ├── Contact.tsx       # Copy email & contact form
│   │   ├── Footer.tsx        # Live Chennai IST clock & footer
│   │   ├── ExcelManagerModal # In-app Excel sheet manager & live sync
│   │   ├── CustomCursor.tsx  # Trailing spring cursor
│   │   └── SmoothScroll.tsx  # Lenis RAF loop wrapper
│   ├── utils/
│   │   └── audio.ts          # Web Audio synthesized tactile feedback
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── vite.config.ts
`

---

## 🚀 Getting Started

### 1. Install Dependencies
`ash
npm install
`

### 2. Run Local Development Server
`ash
npm run dev
`

### 3. Build for Production
`ash
npm run build
`

---

## 📊 Managing Content via Excel

You can update the portfolio's content at any time:
1. Click the **"Excel Data"** button in the navbar or hero.
2. Download the template or edit public/portfolio-data.xlsx.
3. Add new skills to the Skills sheet, new projects to the Projects sheet, or edit your bio in Profile.
4. Drop the updated file into the modal for instant live sync, or overwrite public/portfolio-data.xlsx.
