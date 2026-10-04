import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, FileSpreadsheet, ArrowUpRight, Menu, X } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface Props {
  onOpenExcelManager: () => void;
  isCustomData: boolean;
}

export const Navbar: React.FC<Props> = ({ onOpenExcelManager, isCustomData }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.enabled = next;
    if (next) soundFX.playClick();
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Works', href: '#works' },
    { label: 'Skills', href: '#skills' },
    { label: 'Journey', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 sm:py-6 pointer-events-none">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={'pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ' + (
            scrolled
              ? 'bg-[#0f0f14]/85 border border-white/10 shadow-2xl backdrop-blur-xl'
              : 'bg-[#0f0f14]/60 border border-white/5 backdrop-blur-md'
          )}
        >
          <a
            href="#"
            onMouseEnter={() => soundFX.playHover()}
            onClick={() => soundFX.playClick()}
            className="flex items-center gap-2 text-sm sm:text-base font-bold font-display tracking-tight text-white hover:text-lime-300 transition-colors group"
          >
            <span className="w-7 h-7 rounded-full bg-lime-400 text-black flex items-center justify-center font-mono text-xs font-black shadow-lg group-hover:scale-105 transition-transform">
              R
            </span>
            <span className="hidden sm:inline">Ramalingam</span>
          </a>

          <div className="hidden md:flex items-center gap-1 text-xs font-medium text-white/70">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => soundFX.playHover()}
                onClick={() => soundFX.playClick()}
                className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenExcelManager();
              }}
              onMouseEnter={() => soundFX.playHover()}
              title="Manage data via Excel (.xlsx)"
              className={'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ' + (
                isCustomData
                  ? 'bg-lime-400/15 border-lime-400/40 text-lime-300 shadow-[0_0_12px_rgba(217,249,157,0.2)]'
                  : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white'
              )}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-lime-400" />
              <span className="hidden sm:inline">Excel Data</span>
              {isCustomData && <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />}
            </button>

            <button
              onClick={toggleSound}
              onMouseEnter={() => soundFX.playHover()}
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-lime-400" /> : <VolumeX className="w-3.5 h-3.5 text-white/40" />}
            </button>

            <a
              href="#contact"
              onMouseEnter={() => soundFX.playHover()}
              onClick={() => soundFX.playClick()}
              className="hidden sm:flex items-center gap-1 px-4 py-1.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-lime-400 transition-colors shadow-lg hover:shadow-lime-400/20"
            >
              Let's Talk
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => {
                soundFX.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white/80"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-x-4 top-20 z-40 p-5 rounded-2xl bg-[#121216]/95 border border-white/10 backdrop-blur-2xl md:hidden shadow-2xl flex flex-col gap-3"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                soundFX.playClick();
                setMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                soundFX.playClick();
                setMobileMenuOpen(false);
                onOpenExcelManager();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-lime-400/10 border border-lime-400/30 text-lime-300 text-xs font-semibold"
            >
              <FileSpreadsheet className="w-4 h-4 text-lime-400" />
              Manage Excel Data
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs"
            >
              Get In Touch
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
};
