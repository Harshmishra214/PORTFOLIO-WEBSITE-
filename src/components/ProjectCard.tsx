import React, { useRef, useState, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, ArrowUpRight, Activity, Map, FileText, Users } from 'lucide-react';
import { Project } from '../types';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const { isTouch, prefersReducedMotion } = useDeviceCapability();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouch || prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;

    // Smooth tilt rotation
    const rotateY = normalizedX * 10;
    const rotateX = -normalizedY * 10;

    setTilt({
      rotateX,
      rotateY,
      glowX: (x / rect.width) * 100,
      glowY: (y / rect.height) * 100
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  };

  // Render project-specific visual preview
  const renderVisualHUD = () => {
    switch (project.id) {
      case 'traffic-police-gesture':
        return (
          <div className="relative w-full h-44 bg-gradient-to-br from-cyan-950/40 via-slate-900 to-black rounded-xl overflow-hidden border border-cyan-500/20 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono-code text-cyan-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                CAM_STREAM_01: INFERENCE ACTIVE
              </span>
              <span>38.2 FPS</span>
            </div>

            {/* Gesture Wireframe Schematic */}
            <div className="relative flex items-center justify-center my-auto">
              <div className="relative w-28 h-20 border border-cyan-400/40 rounded-lg flex items-center justify-center bg-cyan-500/5 group-hover:scale-105 transition-transform duration-500">
                {/* Bounding box corners */}
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400" />

                <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
                <span className="absolute bottom-1 right-1.5 text-[9px] font-mono-code text-cyan-300">
                  96.4% CONF
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono-code text-slate-400 border-t border-white/5 pt-1.5">
              <span>TARGET: TRAFFIC STOP SIGNAL</span>
              <span>LATENCY: 42ms</span>
            </div>
          </div>
        );

      case 'land-governance-gis':
        return (
          <div className="relative w-full h-44 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-black rounded-xl overflow-hidden border border-emerald-500/20 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono-code text-emerald-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                CADASTRAL LAYER: VECTOR 4K
              </span>
              <span>50,000+ PARCELS</span>
            </div>

            {/* GIS polygon overlay representation */}
            <div className="relative flex items-center justify-center my-auto">
              <div className="relative w-36 h-20 border border-emerald-500/40 rounded-lg p-2 bg-emerald-500/5 flex items-center justify-around group-hover:scale-105 transition-transform duration-500">
                <div className="w-8 h-8 border border-emerald-400 bg-emerald-500/20 rotate-12 rounded-sm" />
                <div className="w-10 h-10 border border-emerald-300 bg-emerald-500/30 -rotate-6 rounded-sm" />
                <div className="w-7 h-7 border border-emerald-400/80 bg-emerald-500/10 rotate-45 rounded-sm" />
                <span className="absolute -bottom-2 text-[9px] font-mono-code text-emerald-300 bg-black/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  TOPOLOGY: VERIFIED
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono-code text-slate-400 border-t border-white/5 pt-1.5">
              <span>POSTGIS SPATIAL R-TREE</span>
              <span>SUB-METER ACCURACY</span>
            </div>
          </div>
        );

      case 'medical-records-platform':
        return (
          <div className="relative w-full h-44 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-black rounded-xl overflow-hidden border border-indigo-500/20 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono-code text-indigo-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                HIPAA VAULT: AES-256
              </span>
              <span>BIO-BERT NER</span>
            </div>

            {/* Clinical NLP parsing schematic */}
            <div className="relative flex items-center justify-center my-auto">
              <div className="relative w-40 h-20 border border-indigo-500/40 rounded-lg p-2 bg-indigo-500/5 flex flex-col justify-center gap-1.5 group-hover:scale-105 transition-transform duration-500">
                <div className="flex items-center justify-between text-[9px] font-mono-code text-indigo-300">
                  <span>ENTITIES PARSED</span>
                  <span className="text-cyan-300">94.2%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[94%] h-full bg-indigo-500 rounded-full" />
                </div>
                <div className="flex items-center gap-1 text-[8px] font-mono-code text-slate-400">
                  <span className="px-1 py-0.5 bg-indigo-500/20 text-indigo-200 rounded">ICD-10</span>
                  <span className="px-1 py-0.5 bg-cyan-500/20 text-cyan-200 rounded">DOSAGE</span>
                  <span className="px-1 py-0.5 bg-emerald-500/20 text-emerald-200 rounded">VITALS</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono-code text-slate-400 border-t border-white/5 pt-1.5">
              <span>ENCRYPTED EHR ARCHITECTURE</span>
              <span>1.2s LATENCY</span>
            </div>
          </div>
        );

      case 'attendance-cv-system':
        return (
          <div className="relative w-full h-44 bg-gradient-to-br from-pink-950/40 via-slate-900 to-black rounded-xl overflow-hidden border border-pink-500/20 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono-code text-pink-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                MULTI-SUBJECT SCANNER
              </span>
              <span>&lt;300ms LOG</span>
            </div>

            {/* Attendance Face HUD */}
            <div className="relative flex items-center justify-center my-auto">
              <div className="relative w-32 h-20 border border-pink-500/40 rounded-lg p-2 bg-pink-500/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <Users className="w-8 h-8 text-pink-400" />
                <div className="absolute inset-x-2 bottom-1 flex justify-between text-[8px] font-mono-code text-pink-300">
                  <span>FACENET: 512D</span>
                  <span>LIVENESS: OK</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono-code text-slate-400 border-t border-white/5 pt-1.5">
              <span>RETINAFACE MULTI-STAGE</span>
              <span>8 TARGETS / FRAME</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenModal(project)}
        animate={
          isHovered && !prefersReducedMotion
            ? {
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
                scale: 1.02
              }
            : { rotateX: 0, rotateY: 0, scale: 1 }
        }
        transition={{ type: 'spring', stiffness: 240, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        data-cursor="project"
        className="relative h-full rounded-2xl glass-panel p-5 sm:p-6 overflow-hidden border border-white/10 group cursor-pointer flex flex-col justify-between transition-colors duration-300 hover:border-cyan-500/30"
      >
        {/* Dynamic Glow Spotlight */}
        {isHovered && !isTouch && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-100"
            style={{
              background: `radial-gradient(circle 280px at ${tilt.glowX}% ${tilt.glowY}%, ${project.accentColor}20, transparent 75%)`
            }}
          />
        )}

        <div className="relative z-10">
          {/* Top visual preview */}
          <div className="mb-5 overflow-hidden rounded-xl">
            {renderVisualHUD()}
          </div>

          {/* Category & Badge */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span
              className="text-[11px] font-mono-code uppercase tracking-wider font-semibold"
              style={{ color: project.accentColor }}
            >
              {project.category}
            </span>
            <span className="text-[10px] font-mono-code text-slate-400 px-2 py-0.5 rounded bg-white/[0.04]">
              {project.previewBadge}
            </span>
          </div>

          {/* Title with typography reveal on hover */}
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white group-hover:text-cyan-300 transition-colors duration-300 flex items-center justify-between mb-2">
            <span>{project.title}</span>
            <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0 ml-2" />
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-5">
            {project.description}
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.slice(0, 5).map(tech => (
              <span
                key={tech}
                className="px-2 py-1 text-[11px] font-mono-code rounded-md bg-white/[0.04] border border-white/5 text-slate-300"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2 py-1 text-[11px] font-mono-code rounded-md bg-white/[0.04] text-cyan-400">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div
          className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={() => onOpenModal(project)}
            className="text-xs font-mono-code text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 group-hover:underline cursor-pointer"
            data-cursor="pointer"
          >
            <span>Inspect Architecture</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
            title="View Code on GitHub"
            data-cursor="pointer"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};
