import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Cpu, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#05070c] py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Title */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display font-extrabold text-lg text-cyan-400">HM.</span>
            <span className="text-sm font-display font-bold text-white">Harsh Mishra</span>
          </div>
          <p className="text-xs text-slate-400">
            AI Engineering Student & Full-Stack Developer • Building intelligent digital experiences.
          </p>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono-code text-slate-400">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5">
            <Cpu className="w-3 h-3 text-cyan-400" />
            Three.js & R3F
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5">
            <Code2 className="w-3 h-3 text-emerald-400" />
            TypeScript & React
          </span>
        </div>

        {/* Actions: Social links & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Harshmishra214"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Harsh Mishra GitHub"
            data-cursor="pointer"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href="https://linkedin.com/in/harshmishra"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Harsh Mishra LinkedIn"
            data-cursor="pointer"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href="mailto:hm5884116@gmail.com"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Send Email to Harsh Mishra"
            data-cursor="pointer"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            aria-label="Back to Top"
            data-cursor="pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-xs font-mono-code text-slate-500">
        © {new Date().getFullYear()} Harsh Mishra • All systems operational • Hosted on Google Cloud
      </div>
    </footer>
  );
};
