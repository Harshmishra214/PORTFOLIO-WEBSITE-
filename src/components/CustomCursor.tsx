import React, { useEffect, useRef, useState } from 'react';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

export const CustomCursor: React.FC = () => {
  const { isTouch, prefersReducedMotion } = useDeviceCapability();

  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'project' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);

  // Position state refs for smooth rAF lerp
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const innerDotRef = useRef<HTMLDivElement>(null);
  const outerFollowerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices or if reduced motion is preferred
    if (isTouch || prefersReducedMotion) {
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) setIsVisible(true);

      // Direct placement for inner dot
      if (innerDotRef.current) {
        innerDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check element under cursor for special cursor states
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest('[data-cursor="project"]');
      const interactive = target.closest('button, a, input, textarea, select, [role="button"], [data-cursor="pointer"]');

      if (projectCard) {
        setCursorType('project');
      } else if (interactive) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth follower animation loop
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animateFollower = () => {
      followerPos.current.x = lerp(followerPos.current.x, mousePos.current.x, 0.16);
      followerPos.current.y = lerp(followerPos.current.y, mousePos.current.y, 0.16);

      if (outerFollowerRef.current) {
        outerFollowerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animateFollower);
    };

    rafId.current = requestAnimationFrame(animateFollower);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isTouch, prefersReducedMotion, isVisible]);

  if (isTouch || prefersReducedMotion) {
    return null;
  }

  return (
    <>
      {/* Inner precise dot */}
      <div
        ref={innerDotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 -translate-x-1/2 -translate-y-1/2 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            cursorType === 'project'
              ? 'w-1 h-1 bg-transparent'
              : cursorType === 'pointer'
              ? 'w-2 h-2 bg-cyan-300 shadow-[0_0_8px_#00f0ff]'
              : 'w-1.5 h-1.5 bg-cyan-400'
          }`}
        />
      </div>

      {/* Outer smooth follower */}
      <div
        ref={outerFollowerRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out border ${
            cursorType === 'project'
              ? 'w-16 h-16 bg-cyan-950/80 border-cyan-400 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-100'
              : cursorType === 'pointer'
              ? 'w-11 h-11 bg-cyan-400/10 border-cyan-400/60 scale-110 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
              : 'w-7 h-7 bg-transparent border-slate-400/30'
          }`}
        >
          {cursorType === 'project' && (
            <span className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-cyan-300">
              VIEW
            </span>
          )}
        </div>
      </div>
    </>
  );
};
