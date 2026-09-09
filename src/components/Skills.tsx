import React, { useState, useRef, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { skillsData, skillCategories } from '../data/skills';
import { Skill } from '../types';
import { useDeviceCapability } from '../hooks/useDeviceCapability';
import { CheckCircle2, Sparkles, Filter } from 'lucide-react';

interface TiltCardProps {
  skill: Skill;
}

const TiltSkillCard: React.FC<TiltCardProps> = ({ skill }) => {
  const { isTouch, prefersReducedMotion } = useDeviceCapability();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouch || prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) * 2 - 1; // -1 to 1
    const normalizedY = (y / rect.height) * 2 - 1; // -1 to 1

    // 3D tilt angles
    const rotateY = normalizedX * 12; // tilt left/right
    const rotateX = -normalizedY * 12; // tilt up/down

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
        animate={
          isHovered && !prefersReducedMotion
            ? {
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
                scale: 1.02
              }
            : { rotateX: 0, rotateY: 0, scale: 1 }
        }
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative h-full rounded-2xl glass-panel p-5 sm:p-6 overflow-hidden border border-white/10 transition-colors duration-200 group flex flex-col justify-between"
        data-cursor="pointer"
      >
        {/* Dynamic cursor follow glow overlay */}
        {isHovered && !isTouch && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-100"
            style={{
              background: `radial-gradient(circle 220px at ${tilt.glowX}% ${tilt.glowY}%, ${skill.color}25, transparent 80%)`
            }}
          />
        )}

        <div className="relative z-10">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <span className="text-[10px] font-mono-code uppercase tracking-widest text-slate-400 block mb-1">
                {skill.category}
              </span>
              <h3 className="text-xl font-display font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                {skill.name}
              </h3>
            </div>

            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-mono-code text-xs font-bold border"
              style={{
                backgroundColor: `${skill.color}15`,
                borderColor: `${skill.color}40`,
                color: skill.color
              }}
            >
              {skill.level}%
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {skill.description}
          </p>

          {/* Highlights checklist */}
          <div className="space-y-1.5 mb-5">
            {skill.highlights.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-400">
                <CheckCircle2 className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Level bar footer */}
        <div className="relative z-10 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400 mb-1.5">
            <span>PROFICIENCY</span>
            <span className="text-cyan-400">{skill.experience}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
              className="h-full rounded-full"
              style={{
                backgroundColor: skill.color,
                boxShadow: `0 0 10px ${skill.color}60`
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { prefersReducedMotion } = useDeviceCapability();

  const filteredSkills = selectedCategory === 'All'
    ? skillsData
    : skillsData.filter(skill => skill.category === selectedCategory);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 px-3.5 py-1 rounded-full text-xs font-mono-code text-cyan-400 mb-3 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>02 // TECHNICAL MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Skills & Competencies
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-3">
            Interactive 3D-tilt skill cards covering systems programming, deep neural networks, computer vision, and distributed infrastructure.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          {skillCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-mono-code rounded-xl transition-all cursor-pointer ${
                selectedCategory === cat
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

      {/* Grid of Skill Cards */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch"
      >
        {filteredSkills.map(skill => (
          <motion.div
            key={skill.name}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
          >
            <TiltSkillCard skill={skill} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
