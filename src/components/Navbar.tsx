import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface Props {
  currentTheme: 'dark' | 'light';
}

export const Navbar: React.FC<Props> = ({ currentTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = currentTheme === 'dark';

  const navLinks = [
    { label: 'about', href: '#about' },
    { label: 'services', href: '#services' },
    { label: 'skills', href: '#skills' },
    { label: 'projects', href: '#works' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 lg:px-16 py-5 sm:py-7 flex items-center justify-between pointer-events-none transition-colors duration-500">
        {/* Brand: ram" in lowercase bold */}
        <a
          href="#"
          className={`pointer-events-auto text-xl font-bold font-display tracking-tight transition-colors duration-500 ${
            isDark ? 'text-[#f0f0f0]' : 'text-[#111111]'
          }`}
        >
          <span>ram</span>
          <span className="text-xs align-super ml-0.5 font-normal opacity-70">"</span>
        </a>

        {/* Right Navigation & CTA matching Huy Ng reference */}
        <div className="pointer-events-auto flex items-center gap-6 sm:gap-8">
          <div className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`transition-colors duration-500 hover:opacity-100 ${
                  isDark
                    ? 'text-[#f0f0f0]/75 hover:text-white'
                    : 'text-[#111111]/75 hover:text-black'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Let's Talk. Pill Button */}
          <a
            href="#contact"
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm ${
              isDark
                ? 'bg-[#f0f0f0] text-[#111111] hover:bg-white'
                : 'bg-[#1a1a1a] text-[#f0f0f0] hover:bg-black'
            }`}
          >
            Let's Talk.
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-1.5 rounded-full transition-colors ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed inset-x-4 top-20 z-50 p-6 rounded-2xl shadow-2xl backdrop-blur-2xl border md:hidden flex flex-col gap-3 ${
            isDark
              ? 'bg-[#141414]/95 border-white/10 text-white'
              : 'bg-white/95 border-black/10 text-black'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-semibold uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full mt-2 py-3 rounded-full bg-[#1a1a1a] text-white text-center font-bold text-xs"
          >
            Let's Talk.
          </a>
        </motion.div>
      )}
    </>
  );
};
