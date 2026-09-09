import React, { useState } from 'react';
import { motion } from 'motion/react';
import { projectsData } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Project } from '../types';
import { Github, Code2, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 px-3.5 py-1 rounded-full text-xs font-mono-code text-cyan-400 mb-3 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>03 // FEATURED ENGINEERING WORK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Key Systems & Projects
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-3">
            High-throughput computer vision, spatial GIS infrastructure, and encrypted electronic healthcare architectures engineered for real-world reliability.
          </p>
        </div>

        <MagneticButton
          href="https://github.com/Harshmishra214"
          variant="glass"
          size="sm"
          className="self-start md:self-auto gap-2"
        >
          <Github className="w-4 h-4 text-cyan-400" />
          <span>All Repositories</span>
        </MagneticButton>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {projectsData.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenModal={p => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
