import React, { useRef, useState, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'glass' | 'outline';
  strength?: number;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
  strength = 0.35,
  size = 'md',
  id
}) => {
  const { isTouch, prefersReducedMotion } = useDeviceCapability();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouch || prefersReducedMotion || !buttonRef.current) return;

    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs font-medium',
    md: 'px-6 py-3 text-sm font-semibold',
    lg: 'px-8 py-4 text-base font-semibold'
  };

  const variantStyles = {
    primary:
      'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.35)] border border-cyan-400/40',
    secondary:
      'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    glass:
      'glass-panel text-slate-200 hover:text-white hover:border-cyan-500/40 hover:bg-white/[0.08] shadow-lg',
    outline:
      'border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 bg-transparent'
  };

  const Component = href ? motion.a : motion.button;

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block relative"
    >
      <Component
        id={id}
        href={href}
        onClick={onClick}
        animate={prefersReducedMotion ? {} : { x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 220, damping: 15, mass: 0.2 }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
        className={`relative inline-flex items-center justify-center gap-2 rounded-xl transition-colors cursor-pointer select-none font-sans ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        data-cursor="pointer"
      >
        {children}
      </Component>
    </div>
  );
};
