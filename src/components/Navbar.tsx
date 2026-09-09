import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, ExternalLink, Terminal } from 'lucide-react';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'threed-lab', label: '3D Lab' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' }
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(NAV_ITEMS.map(item => item.id));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none p-3 sm:p-5">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className={`pointer-events-auto transition-all duration-300 w-full max-w-6xl rounded-2xl flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 ${
          isScrolled
            ? 'glass-panel bg-[#070a12]/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          data-cursor="pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
            <span className="font-display font-extrabold text-sm tracking-wider text-cyan-400 group-hover:text-cyan-300">
              HM.
            </span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-white leading-none">
              Harsh Mishra
            </span>
            <span className="text-[10px] font-mono-code text-cyan-400/80 leading-tight">
              AI Engineer
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/5 rounded-full px-3 py-1.5 backdrop-blur-md">
          {NAV_ITEMS.map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  isActive ? 'text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
                data-cursor="pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-cyan-500/15 border border-cyan-400/30 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Button: GitHub Profile */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/Harshmishra214"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono-code bg-white/[0.04] border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all shadow-sm"
            data-cursor="pointer"
          >
            <Github className="w-3.5 h-3.5 text-cyan-400" />
            <span>@Harshmishra214</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl glass-panel text-slate-300 hover:text-white border border-white/10"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden pointer-events-auto absolute top-16 left-3 right-3 glass-panel bg-[#090d16]/95 backdrop-blur-2xl rounded-2xl border border-white/15 p-5 shadow-2xl z-50 flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href="https://github.com/Harshmishra214"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono-code bg-white/5 border border-white/10 text-slate-300"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>GitHub Profile</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
