import React, { lazy, Suspense, useState } from 'react';
import { motion } from 'motion/react';
import { Box, Sparkles, Layers, Cpu } from 'lucide-react';
import { CanvasFallback } from './3d/CanvasFallback';

// Lazy-loaded ExperienceScene
const ExperienceScene = lazy(() =>
  import('./3d/ExperienceScene').then(module => ({ default: module.ExperienceScene }))
);

export const ThreeLab: React.FC = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <section id="threed-lab" className="relative py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 px-3.5 py-1 rounded-full text-xs font-mono-code text-cyan-400 mb-3 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>04 // INTERACTIVE 3D LAB</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Spatial 3D Laboratory
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-3">
            Real-time WebGL graphics, wireframe topology, dynamic shader lighting, and particle simulation running on hardware-accelerated GPU pipelines.
          </p>
        </div>

        {/* Feature tags */}
        <div className="flex items-center gap-3 text-xs font-mono-code text-slate-400">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            WebGL 2.0
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            R3F & Drei
          </span>
        </div>
      </div>

      {/* Lazy Loaded 3D Viewport */}
      <div className="relative w-full">
        <Suspense fallback={<CanvasFallback title="Loading 3D Laboratory..." particleCount={50} />}>
          <ExperienceScene />
        </Suspense>
      </div>
    </section>
  );
};
