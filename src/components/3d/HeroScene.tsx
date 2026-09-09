import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasFallback } from './CanvasFallback';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';

// Floating Futuristic AI Neural Core
function NeuralCore({ isLowPower }: { isLowPower: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const outerWireRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const innerIcosaRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth mouse response
    const targetX = state.pointer.x * 0.8;
    const targetY = state.pointer.y * 0.5;

    meshRef.current.rotation.y += delta * 0.4;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY, 0.05);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetX * 0.5, 0.05);

    if (outerWireRef.current) {
      outerWireRef.current.rotation.x += delta * 0.2;
      outerWireRef.current.rotation.y -= delta * 0.3;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5;
    }

    if (innerIcosaRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      innerIcosaRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Central crystal core */}
      <mesh ref={innerIcosaRef}>
        <octahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#005577"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.85}
          wireframe={false}
        />
      </mesh>

      {/* Outer rotating cybernetic wireframe */}
      <mesh ref={outerWireRef}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshStandardMaterial
          color="#10b981"
          wireframe={true}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Orbital gyro ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Secondary orbital ring */}
      {!isLowPower && (
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.5, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#6d28d9"
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      )}
    </group>
  );
}

// Particle field
function ParticleCloud({ count = 600 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color('#00f0ff');
    const color2 = new THREE.Color('#10b981');
    const color3 = new THREE.Color('#6366f1');

    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = Math.random() > 0.6 ? color1 : Math.random() > 0.5 ? color2 : color3;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.02;

    // Subtle drift with mouse pointer
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      state.pointer.x * 0.3,
      0.03
    );
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

export const HeroScene: React.FC = () => {
  const { hasWebGL, isLowPower } = useDeviceCapability();

  if (!hasWebGL) {
    return <CanvasFallback title="Neural Core Simulator" particleCount={40} />;
  }

  const particleCount = isLowPower ? 350 : 800;

  return (
    <div className="w-full h-full min-h-[360px] sm:min-h-[440px] md:min-h-[520px] relative pointer-events-auto">
      <Suspense fallback={<CanvasFallback title="Initializing 3D Matrix..." particleCount={30} />}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          gl={{ antialias: !isLowPower, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#00f0ff" />
          <pointLight position={[-5, -5, -3]} intensity={0.8} color="#10b981" />
          <pointLight position={[0, 0, 3]} intensity={0.5} color="#ffffff" />

          <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
            <NeuralCore isLowPower={isLowPower} />
          </Float>

          <ParticleCloud count={particleCount} />
        </Canvas>
      </Suspense>
    </div>
  );
};
