# RAM — Awwwards-Inspired Developer Portfolio ⚡

> An award-grade, ultra-responsive portfolio website designed for **RAM** (Creative Developer & Software Engineer, Chennai, India). Inspired by Huy Ng's minimalist aesthetic, geometric typography, scroll-driven theme transitions (Dark to Warm Linen Light), Lenis smooth momentum scrolling, and spring physics micro-interactions.

---

## 🌟 Highlights & Features

- 🌓 **Scroll-Driven Theme Morphing**: Seamless background & typography transition as you scroll from **Deep Onyx Dark** (#0c0c0e) in Hero into **Warm Linen Paper Light** (#f3efe6) across About, Selected Works & Technical Matrix, before gliding back into **Deep Obsidian Dark** for Journey & Contact.
- 🏎️ **Awwwards-Grade Motion & Feel**: Powered by Lenis smooth inertia scrolling and physics-based cursor follower.
- 🗂️ **Interactive Projects Showcase**: List & Grid view switch with cursor-tracking floating spring thumbnail preview cards and deep-dive architectural modals.
- 🎨 **Editorial Typography & Palette**: High-contrast pairings of *Space Grotesk*, *Instrument Serif* (editorial italics), and *Plus Jakarta Sans*.
- ⚡ **Tactile Sound FX**: Subtle micro-sound synthesizer using the native Web Audio API (toggleable in navigation).
- 📍 **Chennai Live Clock**: Real-time IST time ticker in the footer.
- 💌 **Direct Contact Suite**: One-click email copy with confetti burst and direct message channel.

---

## 🛠️ Tech Stack

- **Framework**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Smooth Scrolling**: Lenis
- **Icons**: Lucide React
- **Micro-Interactions**: Web Audio API, Canvas Confetti

---

## 📁 Project Structure

`
├── src/
│   ├── data/
│   │   └── portfolioData.ts     # Content & projects data
│   ├── components/
│   │   ├── Navbar.tsx           # Floating glass pill navbar
│   │   ├── Hero.tsx             # Editorial kinetic headline & CTAs
│   │   ├── Marquee.tsx          # Minimalist typographic ribbon
│   │   ├── About.tsx            # Identity, philosophy & metrics
│   │   ├── Projects.tsx         # Hover-preview project catalog
│   │   ├── ProjectModal.tsx     # Project architectural inspection drawer
│   │   ├── Skills.tsx           # Categorized engineering stack
│   │   ├── Experience.tsx       # Milestones timeline
│   │   ├── Contact.tsx          # Direct message form & email copy
│   │   ├── Footer.tsx           # Live Chennai IST clock
│   │   ├── CustomCursor.tsx     # Trailing spring cursor
│   │   └── SmoothScroll.tsx     # Lenis smooth scroll RAF wrapper
│   ├── utils/
│   │   └── audio.ts             # Web Audio API sound synthesizer
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
