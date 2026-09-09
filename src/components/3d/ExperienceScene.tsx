import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasFallback } from './CanvasFallback';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import { RotateCw, Eye, Sparkles as SparklesIcon, Palette } from 'lucide-react';

type GeometryType = 'torus-knot' | 'icosahedron' | 'geodesic' | 'cyber-core';
type ThemeColor = 'cyan' | 'emerald' | 'violet';

const THEME_CONFIGS: Record<ThemeColor, { primary: string; secondary: string; emissive: string; label: string }> = {
  cyan: {
    primary: '#00f0ff',
    secondary: '#0088cc',
    emissive: '#003355',
    label: 'Cyber Cyan'
  },
  emerald: {
    primary: '#10b981',
    secondary: '#059669',
    emissive: '#064e3b',
    label: 'Neural Matrix'
  },
  violet: {
    primary: '#a855f7',
    secondary: '#7c3aed',
    emissive: '#4c1d95',
    label: 'Deep Violet'
  }
};

interface LabMeshProps {
  geometryType: GeometryType;
  isWireframe: boolean;
  theme: ThemeColor;
  speed: number;
}

function LabInteractiveMesh({ geometryType, isWireframe, theme, speed }: LabMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const colorData = THEME_CONFIGS[theme];

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3 * speed;
      meshRef.current.rotation.y += delta * 0.4 * speed;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x -= delta * 0.2 * speed;
      wireframeRef.current.rotation.y += delta * 0.25 * speed;
    }
  });

  const geometry = useMemo(() => {
    switch (geometryType) {
      case 'torus-knot':
        return <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1.6, 2]} />;
      case 'geodesic':
        return <dodecahedronGeometry args={[1.5, 1]} />;
      case 'cyber-core':
        return <octahedronGeometry args={[1.7, 2]} />;
      default:
        return <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />;
    }
  }, [geometryType]);

  return (
    <group>
      <mesh ref={meshRef}>
        {geometry}
        <meshStandardMaterial
          color={colorData.primary}
          emissive={colorData.emissive}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Outer subtle halo ring */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[2.3, 1]} />
        <meshStandardMaterial
          color={colorData.secondary}
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

// Background dynamic particle field
function LabParticles({ theme, count }: { theme: ThemeColor; count: number }) {
  const colorData = THEME_CONFIGS[theme];
  return (
    <Sparkles
      count={count}
      scale={8}
      size={2.5}
      speed={0.4}
      color={colorData.primary}
      opacity={0.7}
    />
  );
}

export const ExperienceScene: React.FC = () => {
  const { hasWebGL, isLowPower } = useDeviceCapability();
  const [geometryType, setGeometryType] = useState<GeometryType>('torus-knot');
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeColor>('cyan');
  const [speed, setSpeed] = useState<number>(1);

  if (!hasWebGL) {
    return <CanvasFallback title="3D Experimental Matrix" particleCount={60} />;
  }

  const particleCount = isLowPower ? 120 : 350;

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
      {/* 3D Canvas */}
      <Suspense fallback={<CanvasFallback title="Rendering 3D Sandbox..." />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: !isLowPower, powerPreference: 'high-performance' }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <color attach="background" args={['#07090f']} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color={THEME_CONFIGS[theme].primary} />
          <pointLight position={[-10, -10, -5]} intensity={1} color={THEME_CONFIGS[theme].secondary} />
          <pointLight position={[0, 5, -2]} intensity={0.6} color="#ffffff" />

          <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}>
            <LabInteractiveMesh
              geometryType={geometryType}
              isWireframe={isWireframe}
              theme={theme}
              speed={speed}
            />
          </Float>

          <LabParticles theme={theme} count={particleCount} />

          <OrbitControls
            enableZoom={true}
            minDistance={3}
            maxDistance={8}
            enablePan={false}
            autoRotate={false}
            dampingFactor={0.05}
          />
        </Canvas>
      </Suspense>

      {/* Floating HUD Controls */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-10">
        <div className="backdrop-blur-md bg-slate-950/70 border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono-code text-cyan-300 font-semibold">3D EXPERIMENTAL LAB</span>
          <span className="text-[10px] text-slate-400 border-l border-white/10 pl-2 hidden sm:inline">
            Drag to rotate • Scroll to zoom
          </span>
        </div>

        <div className="backdrop-blur-md bg-slate-950/70 border border-white/10 px-3 py-1 rounded-full text-[11px] font-mono-code text-slate-300 pointer-events-auto">
          Theme: <span className="text-cyan-400 font-semibold">{THEME_CONFIGS[theme].label}</span>
        </div>
      </div>

      {/* Interactive Control Dock at Bottom */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-auto z-10">
        <div className="backdrop-blur-xl bg-slate-950/80 border border-white/10 rounded-xl p-3 md:p-4 max-w-2xl mx-auto shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Geometry Selector */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center sm:justify-start">
            {(
              [
                { id: 'torus-knot', label: 'Torus' },
                { id: 'icosahedron', label: 'Icosa' },
                { id: 'geodesic', label: 'Geodesic' },
                { id: 'cyber-core', label: 'Core' }
              ] as const
            ).map(item => (
              <button
                key={item.id}
                onClick={() => setGeometryType(item.id)}
                className={`px-3 py-1.5 text-xs font-mono-code rounded-lg transition-all ${
                  geometryType === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                    : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Wireframe toggle */}
            <button
              onClick={() => setIsWireframe(!isWireframe)}
              className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition-all font-mono-code ${
                isWireframe
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                  : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10'
              }`}
              title="Toggle Wireframe"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isWireframe ? 'Wireframe: ON' : 'Solid'}</span>
            </button>

            {/* Rotation speed */}
            <button
              onClick={() => setSpeed(speed === 1 ? 2 : speed === 2 ? 0.5 : 1)}
              className="p-2 rounded-lg text-xs bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 flex items-center gap-1.5 font-mono-code"
              title="Cycle Speed"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{speed}x</span>
            </button>

            {/* Theme selector */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5">
              {(['cyan', 'emerald', 'violet'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`w-5 h-5 rounded-full transition-transform ${
                    t === 'cyan' ? 'bg-[#00f0ff]' : t === 'emerald' ? 'bg-[#10b981]' : 'bg-[#a855f7]'
                  } ${theme === t ? 'scale-110 ring-2 ring-white/60' : 'opacity-60 hover:opacity-100'}`}
                  aria-label={`Switch to ${t} theme`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
