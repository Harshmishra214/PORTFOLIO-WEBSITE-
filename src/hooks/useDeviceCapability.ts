import { useState, useEffect } from 'react';

export interface DeviceCapability {
  isTouch: boolean;
  hasWebGL: boolean;
  prefersReducedMotion: boolean;
  isLowPower: boolean;
  isMobile: boolean;
}

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    isTouch: false,
    hasWebGL: true,
    prefersReducedMotion: false,
    isLowPower: false,
    isMobile: false
  });

  useEffect(() => {
    // Detect touch
    const isTouch = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      window.matchMedia('(pointer: coarse)').matches;

    // Detect prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect WebGL
    let hasWebGL = false;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      hasWebGL = Boolean(gl);
    } catch {
      hasWebGL = false;
    }

    // Detect mobile viewport
    const isMobile = window.innerWidth < 768;

    // Detect low-tier device heuristic (e.g., low hardware concurrency or memory)
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const isLowPower = isMobile || hardwareConcurrency <= 2;

    setCapability({
      isTouch,
      hasWebGL,
      prefersReducedMotion,
      isLowPower,
      isMobile
    });

    const handleResize = () => {
      setCapability(prev => ({
        ...prev,
        isMobile: window.innerWidth < 768
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return capability;
}
