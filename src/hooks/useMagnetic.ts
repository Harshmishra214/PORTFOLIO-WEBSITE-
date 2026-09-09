import { useRef, useState, useCallback, MouseEvent } from 'react';

interface MagneticOptions {
  strength?: number;
  disabled?: boolean;
}

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(options: MagneticOptions = {}) {
  const { strength = 0.35, disabled = false } = options;
  const ref = useRef<T>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (disabled || !ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength
    });
  }, [disabled, strength]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return {
    ref,
    position,
    handleMouseMove,
    handleMouseLeave
  };
}
