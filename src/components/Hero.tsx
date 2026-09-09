import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles, Terminal, Code2, Cpu } from 'lucide-react';
import { HeroScene } from './3d/HeroScene';
import { MagneticButton } from './MagneticButton';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

export const Hero: React.FC = () => {
  const { prefersReducedMotion } = useDeviceCapability();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden bg-radial-gradient"
    >
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none opacity-40" />

      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Hero Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="mb-5 inline-flex items-center">
            <div className="backdrop-blur-md bg-white/[0.04] border border-cyan-500/30 px-3.5 py-1.5 rounded-full flex items-center gap-2.5 shadow-[0_0_15px_rgba(0,240,255,0.12)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-mono-code font-medium text-cyan-300">
                Hi, I'm Harsh Mishra.
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08] mb-6"
          >
            Building{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              intelligent
            </span>{' '}
            digital experiences.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 font-medium tracking-tight mb-4"
          >
            AI Engineering Student • Developer • Problem Solver
          </motion.p>

          {/* Brief Bio narrative */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed mb-8"
          >
            Engineering deep neural models, real-time computer vision pipelines, and full-stack spatial platforms. Merging algorithmic rigor with high-performance interactive interfaces.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <MagneticButton
              id="hero-explore-projects-btn"
              onClick={() => scrollTo('projects')}
              variant="primary"
              size="lg"
            >
              <span>Explore Projects</span>
              <Code2 className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              id="hero-contact-me-btn"
              onClick={() => scrollTo('contact')}
              variant="glass"
              size="lg"
            >
              <span>Contact Me</span>
              <Terminal className="w-4 h-4 text-cyan-400" />
            </MagneticButton>
          </motion.div>

          {/* Mini Tech stack tickers */}
          <motion.div
            variants={itemVariants}
            className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono-code text-slate-400"
          >
            <span className="text-slate-500">Core Focus:</span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-cyan-300">
                PyTorch & YOLOv8
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-emerald-300">
                C++ & DSA
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-indigo-300">
                React & Three.js
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D Floating Interactive Object Beside/Behind Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
          className="lg:col-span-5 relative flex items-center justify-center w-full"
        >
          <div className="relative w-full aspect-square max-w-[480px]">
            {/* Soft decorative glow rim */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-500/20 via-emerald-500/10 to-transparent blur-2xl pointer-events-none" />

            {/* 3D Interactive Canvas */}
            <HeroScene />

            {/* Corner tech decals */}
            <div className="absolute top-0 right-0 p-2 font-mono-code text-[10px] text-cyan-400/60 tracking-widest hidden sm:block">
              // SYS.AI.ACTIVE
            </div>
            <div className="absolute bottom-0 left-0 p-2 font-mono-code text-[10px] text-slate-500 tracking-widest hidden sm:block">
              COORD:[MOUSE_LERP]
            </div>
          </div>
        </motion.div>
      </div>

      {/* Downward Scroll Indicator */}
      <motion.button
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer group"
        aria-label="Scroll to About Section"
      >
        <span className="text-[10px] font-mono-code uppercase tracking-widest text-slate-500 group-hover:text-cyan-300">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full border border-white/10 group-hover:border-cyan-400/40 flex items-center justify-center bg-white/[0.02]"
        >
          <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
        </motion.div>
      </motion.button>
    </section>
  );
};
