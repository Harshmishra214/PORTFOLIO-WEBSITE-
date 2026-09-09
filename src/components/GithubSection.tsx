import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Github,
  GitBranch,
  Star,
  GitFork,
  ExternalLink,
  Code2,
  Terminal,
  Check,
  Copy
} from 'lucide-react';
import { MagneticButton } from './MagneticButton';

const FEATURED_REPOS = [
  {
    name: 'traffic-police-gesture-recognition',
    description: 'Autonomous spatial gesture classification using MediaPipe keypoints & ST-GCN network for smart traffic lights.',
    stars: 34,
    forks: 8,
    language: 'Python',
    languageColor: '#3572A5',
    updated: 'Recently updated'
  },
  {
    name: 'land-governance-gis-engine',
    description: 'Cadastral parcel registry with PostGIS spatial algorithms, vector polygon overlays, and overlap validation.',
    stars: 28,
    forks: 5,
    language: 'TypeScript',
    languageColor: '#3178C6',
    updated: 'Active release'
  },
  {
    name: 'medical-records-ehr-nlp',
    description: 'HIPAA-compliant medical records platform featuring clinical BERT NER extraction and encrypted patient timelines.',
    stars: 42,
    forks: 11,
    language: 'Python',
    languageColor: '#3572A5',
    updated: 'Active release'
  },
  {
    name: 'face-attendance-vision-system',
    description: 'RetinaFace + FaceNet biometric attendance platform with anti-spoofing liveness verification.',
    stars: 25,
    forks: 6,
    language: 'Python',
    languageColor: '#3572A5',
    updated: 'Maintained'
  }
];

export const GithubSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyProfile = () => {
    navigator.clipboard.writeText('https://github.com/Harshmishra214');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 md:p-12 border border-white/10 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-code text-cyan-300 mb-3">
              <Github className="w-3.5 h-3.5" />
              <span>GITHUB ECOSYSTEM</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Open Source & Public Repositories
            </h3>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Exploring reproducible computer vision workflows, machine learning algorithms, and full-stack systems under <span className="text-cyan-300 font-mono-code">@Harshmishra214</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyProfile}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono-code bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
              data-cursor="pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'URL Copied!' : 'Copy GitHub URL'}</span>
            </button>

            <MagneticButton
              href="https://github.com/Harshmishra214"
              variant="primary"
              size="md"
              className="gap-2"
            >
              <Github className="w-4 h-4" />
              <span>Follow on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </MagneticButton>
          </div>
        </div>

        {/* Featured Public Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURED_REPOS.map(repo => (
            <a
              key={repo.name}
              href={`https://github.com/Harshmishra214/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel glass-panel-hover rounded-xl p-5 border border-white/5 flex flex-col justify-between group cursor-pointer"
              data-cursor="pointer"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-sm font-mono-code font-bold text-white group-hover:text-cyan-300 transition-colors">
                    <Code2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{repo.name}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 flex-shrink-0" />
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono-code text-slate-400 pt-3 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: repo.languageColor }}
                  />
                  <span>{repo.language}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 hover:text-amber-300 transition-colors">
                    <Star className="w-3.5 h-3.5 text-amber-400" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                    <GitFork className="w-3.5 h-3.5 text-slate-400" />
                    {repo.forks}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
