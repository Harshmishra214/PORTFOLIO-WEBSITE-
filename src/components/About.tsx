import React from 'react';
import { motion } from 'motion/react';
import {
  Code,
  Terminal,
  Cpu,
  Eye,
  Layers,
  GitBranch,
  Network,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

const CORE_INTERESTS = [
  {
    name: 'C++',
    tag: 'Systems & Low-Latency',
    icon: Code,
    color: '#007ACC',
    desc: 'High-speed algorithmic computation, manual memory management, and deterministic performance.'
  },
  {
    name: 'Python',
    tag: 'AI & Scientific Computing',
    icon: Terminal,
    color: '#3776AB',
    desc: 'Deep learning research, rapid prototyping, data ingestion pipelines, and RESTful microservices.'
  },
  {
    name: 'DSA',
    tag: 'Data Structures & Algorithms',
    icon: Network,
    color: '#10B981',
    desc: 'Asymptotic complexity mastery, graph theory, dynamic programming, and competitive problem solving.'
  },
  {
    name: 'Artificial Intelligence',
    tag: 'Intelligent Systems',
    icon: Cpu,
    color: '#8B5CF6',
    desc: 'Autonomous agent design, decision heuristics, mathematical optimization, and cognitive compute models.'
  },
  {
    name: 'Machine Learning',
    tag: 'Predictive Modeling',
    icon: Sparkles,
    color: '#EC4899',
    desc: 'Supervised loss minimization, gradient-based optimizations, feature spaces, and hyperparameter tuning.'
  },
  {
    name: 'Computer Vision',
    tag: 'Spatial Perception',
    icon: Eye,
    color: '#00F0FF',
    desc: 'Real-time gesture analysis, MTCNN face recognition, edge-accelerated object detection, and spatial graphs.'
  },
  {
    name: 'Web Development',
    tag: 'Modern Full-Stack',
    icon: Layers,
    color: '#F59E0B',
    desc: 'Responsive reactive architectures, spatial GIS interfaces, WebGL/Three.js 3D rendering, and resilient APIs.'
  },
  {
    name: 'Open Source',
    tag: 'Collaborative Engineering',
    icon: GitBranch,
    color: '#94A3B8',
    desc: 'Transparent codebases, reproducible research, modular libraries, and continuous community contribution.'
  }
];

export const About: React.FC = () => {
  const { prefersReducedMotion } = useDeviceCapability();

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 px-3.5 py-1 rounded-full text-xs font-mono-code text-cyan-400 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>01 // PROFILE & PHILOSOPHY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          About Harsh Mishra
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-3">
          An AI engineering student who thrives at the intersection of algorithmic depth, neural models, and modern full-stack systems.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Narrative Card */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-white/10"
        >
          {/* Subtle decorative glow */}
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
              <BookOpen className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-display font-bold text-white mb-4">
              Algorithmic Roots to Neural Frontiers
            </h3>

            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>
                I am an undergraduate AI engineering student dedicated to understanding systems from the silicon level up. Whether building low-latency algorithms in <span className="text-cyan-300 font-semibold">C++</span> or deploying spatial neural networks in <span className="text-emerald-300 font-semibold">Python</span>, my focus is practical engineering rigor.
              </p>
              <p>
                I actively dissect complex challenges across <span className="text-white font-medium">Computer Vision</span>, <span className="text-white font-medium">Data Structures & Algorithms</span>, and <span className="text-white font-medium">Full-Stack GIS</span> platforms.
              </p>
              <p>
                To me, modern software isn't just about glue code—it's about mathematically sound foundations, clean architectures, and interactive digital interfaces that feel effortless to use.
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-white/[0.02]">
              <div className="text-xl font-display font-bold text-cyan-400">4+</div>
              <div className="text-[11px] font-mono-code text-slate-400">Core Systems</div>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.02]">
              <div className="text-xl font-display font-bold text-emerald-400">96.4%</div>
              <div className="text-[11px] font-mono-code text-slate-400">Model Accuracy</div>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.02]">
              <div className="text-xl font-display font-bold text-purple-400">&lt;45ms</div>
              <div className="text-[11px] font-mono-code text-slate-400">CV Latency</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 8 Core Engineering Focus Areas */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CORE_INTERESTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.06 }}
                className="glass-panel glass-panel-hover rounded-xl p-4 sm:p-5 flex flex-col justify-between group cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all group-hover:scale-105"
                      style={{
                        backgroundColor: `${item.color}15`,
                        borderColor: `${item.color}40`,
                        color: item.color
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04]">
                      {item.tag}
                    </span>
                  </div>

                  <h4 className="text-base font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
