import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { journeyData } from '../data/journey';
import { TimelineItem } from '../types';
import { useDeviceCapability } from '../hooks/useDeviceCapability';
import {
  GraduationCap,
  Briefcase,
  Trophy,
  GitPullRequest,
  Lightbulb,
  Calendar,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';

const CATEGORY_ICONS: Record<TimelineItem['category'], LucideIcon> = {
  Education: GraduationCap,
  Projects: Briefcase,
  Hackathons: Trophy,
  'Open Source': GitPullRequest,
  Learning: Lightbulb
};

const CATEGORY_COLORS: Record<TimelineItem['category'], string> = {
  Education: '#00f0ff',
  Projects: '#10b981',
  Hackathons: '#f59e0b',
  'Open Source': '#ec4899',
  Learning: '#8b5cf6'
};

export const Journey: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const { prefersReducedMotion } = useDeviceCapability();

  const filteredItems = filter === 'All'
    ? journeyData
    : journeyData.filter(item => item.category === filter);

  const categories = ['All', 'Education', 'Projects', 'Hackathons', 'Open Source', 'Learning'];

  return (
    <section id="journey" className="relative py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 px-3.5 py-1 rounded-full text-xs font-mono-code text-cyan-400 mb-3 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>05 // TRAJECTORY & MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Engineering Journey
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-3">
            A chronological timeline documenting academic milestones, civic hackathons, independent system deployments, and continuous AI research.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-mono-code rounded-xl transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
              data-cursor="pointer"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Animated Timeline */}
      <div className="relative pl-6 md:pl-10">
        {/* Continuous central glowing spine line */}
        <div className="absolute left-6 md:left-10 top-3 bottom-3 w-[2px] bg-gradient-to-b from-cyan-500/60 via-emerald-500/40 to-slate-800 -translate-x-1/2" />

        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const Icon = CATEGORY_ICONS[item.category];
              const accentColor = CATEGORY_COLORS[item.category];

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.08 }}
                  className="relative pl-8 md:pl-12 group"
                >
                  {/* Timeline node icon */}
                  <div
                    className="absolute left-0 top-1.5 -translate-x-1/2 w-8 h-8 rounded-xl flex items-center justify-center border shadow-lg transition-transform duration-300 group-hover:scale-110 z-10"
                    style={{
                      backgroundColor: '#070a13',
                      borderColor: accentColor,
                      boxShadow: `0 0 15px ${accentColor}40`
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: accentColor }} />
                  </div>

                  {/* Content Glass Card */}
                  <div className="glass-panel glass-panel-hover rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden">
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span
                          className="text-xs font-mono-code px-3 py-1 rounded-full uppercase tracking-wider font-semibold"
                          style={{
                            backgroundColor: `${accentColor}15`,
                            color: accentColor,
                            border: `1px solid ${accentColor}40`
                          }}
                        >
                          {item.category}
                        </span>
                        {item.badge && (
                          <span className="text-[11px] font-mono-code text-slate-300 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono-code text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.year}</span>
                      </div>
                    </div>

                    {/* Title & Organization */}
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono-code text-cyan-400/90 mb-4">
                      @ {item.organization}
                    </p>

                    {/* Description narrative */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                      {item.description}
                    </p>

                    {/* Key accomplishments checklist */}
                    <div className="space-y-2 mb-6">
                      {item.keyAchievements.map((achieve, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{achieve}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technology tags */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                      {item.technologies.map(tech => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono-code px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
