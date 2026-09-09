import React, { useEffect, useRef } from 'react';

interface CanvasFallbackProps {
  title?: string;
  particleCount?: number;
  className?: string;
}

export const CanvasFallback: React.FC<CanvasFallbackProps> = ({
  title = 'Interactive 3D Engine',
  particleCount = 50,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [particleCount]);

  return (
    <div className={`relative w-full h-full min-h-[320px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#080c14] border border-white/10 ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
      <div className="relative z-10 text-center px-6 py-4 backdrop-blur-md bg-slate-900/60 rounded-xl border border-cyan-500/20 max-w-sm">
        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse" />
        </div>
        <h4 className="text-sm font-semibold tracking-wider text-cyan-300 uppercase font-mono-code mb-1">
          {title}
        </h4>
        <p className="text-xs text-slate-400">
          Neural particle matrix active • Optimized rendering mode
        </p>
      </div>
    </div>
  );
};
