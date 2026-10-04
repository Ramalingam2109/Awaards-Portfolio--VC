import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, ArrowUpRight, Menu, X } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface Props {
  currentTheme: 'dark' | 'light';
}

export const Navbar: React.FC<Props> = ({ currentTheme }) => {
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
    { label: 'Stack', href: '#skills' },
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
          className={'pointer-events-auto flex items-center justify-between gap-4 sm:gap-8 px-5 sm:px-7 py-2.5 rounded-full transition-all duration-500 shadow-xl backdrop-blur-xl border ' + (
            currentTheme === 'light'
              ? 'bg-[#f3efe6]/90 border-black/10 text-[#121215]'
              : 'bg-[#121216]/80 border-white/10 text-[#f3efe6]'
          )}
        >
          {/* Brand Logo */}
          <a
            href="#"
            onMouseEnter={() => soundFX.playHover()}
            onClick={() => soundFX.playClick()}
            className="flex items-center gap-2.5 text-sm font-bold font-display tracking-tight hover:opacity-75 transition-opacity group"
          >
            <span className="w-7 h-7 rounded-full bg-[#c8e972] text-black flex items-center justify-center font-display font-black text-xs shadow-md group-hover:scale-105 transition-transform">
              ✦
            </span>
            <span className="font-extrabold tracking-wider">RAM</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 text-xs font-medium opacity-80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => soundFX.playHover()}
                onClick={() => soundFX.playClick()}
                className="px-3.5 py-1.5 rounded-full hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2.5">
            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              onMouseEnter={() => soundFX.playHover()}
              title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-80 hover:opacity-100"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[#c8e972]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 opacity-40" />
              )}
            </button>

            {/* CTA */}
            <a
              href="#contact"
              onMouseEnter={() => soundFX.playHover()}
              onClick={() => soundFX.playClick()}
              className={'hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-md ' + (
                currentTheme === 'light'
                  ? 'bg-[#121215] text-[#f3efe6] hover:bg-black'
                  : 'bg-[#f3efe6] text-[#121215] hover:bg-[#c8e972]'
              )}
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => {
                soundFX.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={'fixed inset-x-4 top-20 z-40 p-6 rounded-3xl shadow-2xl backdrop-blur-2xl border md:hidden flex flex-col gap-3.5 ' + (
            currentTheme === 'light'
              ? 'bg-[#f3efe6]/95 border-black/10 text-[#121215]'
              : 'bg-[#121216]/95 border-white/10 text-[#f3efe6]'
          )}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                soundFX.playClick();
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-4 rounded-xl text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#c8e972] text-black font-bold text-xs"
          >
            <span>Get In Touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      )}
    </>
  );
};
