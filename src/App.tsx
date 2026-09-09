import React from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ThreeLab } from './components/ThreeLab';
import { Journey } from './components/Journey';
import { GithubSection } from './components/GithubSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Desktop-only custom animated cursor with smooth follower & states */}
      <CustomCursor />

      {/* Floating Glass Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 overflow-hidden">
        {/* 1. Full-screen animated Hero with interactive 3D scene */}
        <Hero />

        {/* 2. Profile & Technical Philosophy */}
        <About />

        {/* 3. Interactive 3D Tilt Skill Cards */}
        <Skills />

        {/* 4. Core Projects with Detail Modal & 3D Tilt */}
        <Projects />

        {/* 5. Dedicated Lazy-loaded Three.js 3D Laboratory */}
        <ThreeLab />

        {/* 6. Vertical Animated Timeline */}
        <Journey />

        {/* 7. GitHub Ecosystem & Open Source Showcase */}
        <GithubSection />

        {/* 8. Contact & Transmission Form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
