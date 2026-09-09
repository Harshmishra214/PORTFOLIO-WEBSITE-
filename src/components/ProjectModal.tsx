import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Github, ExternalLink, Cpu, CheckCircle, BarChart3, Layers } from 'lucide-react';
import { Project } from '../types';
import { MagneticButton } from './MagneticButton';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative w-full max-w-4xl glass-panel bg-[#090e18]/95 border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6 pr-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className="text-xs font-mono-code px-3 py-1 rounded-full uppercase tracking-wider font-semibold"
                style={{
                  backgroundColor: `${project.accentColor}20`,
                  color: project.accentColor,
                  border: `1px solid ${project.accentColor}40`
                }}
              >
                {project.category}
              </span>
              <span className="text-xs font-mono-code text-slate-400">
                // PRODUCTION SPECIFICATION
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-cyan-300 font-medium mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {project.metrics.map((metric, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-center"
              >
                <div
                  className="text-xl sm:text-2xl font-display font-extrabold"
                  style={{ color: project.accentColor }}
                >
                  {metric.value}
                </div>
                <div className="text-[11px] font-mono-code text-slate-400 mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Narrative */}
          <div className="mb-8">
            <h3 className="text-sm font-mono-code uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              System Architecture & Core Motivation
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
              {project.fullDescription}
            </p>
          </div>

          {/* 2-Column Grid: Architecture & Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Architectural Modules */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <h4 className="text-xs font-mono-code uppercase tracking-wider text-cyan-300 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                Pipeline Stages
              </h4>
              <ul className="space-y-2.5">
                {project.architecture.map((arch, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono-code text-[10px] flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{arch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Features & Validation */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <h4 className="text-xs font-mono-code uppercase tracking-wider text-emerald-300 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Key Capabilities
              </h4>
              <ul className="space-y-2.5">
                {project.keyFeatures.map((feat, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technology Stack tags */}
          <div className="mb-8">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-slate-400 mb-3">
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono-code bg-white/5 border border-white/10 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono-code text-slate-400">
              Author: <span className="text-white">Harsh Mishra (@Harshmishra214)</span>
            </div>

            <div className="flex items-center gap-3">
              <MagneticButton
                href={project.githubUrl}
                variant="glass"
                size="sm"
                className="gap-2"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </MagneticButton>

              <MagneticButton
                onClick={onClose}
                variant="primary"
                size="sm"
              >
                <span>Close Viewer</span>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
