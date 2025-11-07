import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import styles from './Background.module.css';

function Nebula({ isMobile }) {
  const pointsRef = useRef();
  // Reducir partículas en móviles
  const count = isMobile ? 1000 : 3000;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const intensity = Math.random();
      colors[i * 3] = 0.2 + intensity * 0.3;
      colors[i * 3 + 1] = 0.5 + intensity * 0.3;
      colors[i * 3 + 2] = 0.8 + intensity * 0.2;

      sizes[i] = Math.random() * 0.3;
    }

    return { positions, colors, sizes };
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.03;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particles.sizes.length}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function GlowingSphere({ isMobile }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;
    const scale = 1 + Math.sin(time * 0.5) * 0.1;
    meshRef.current.scale.set(scale, scale, scale);
  });

  // Menos segmentos en móviles
  const segments = isMobile ? 32 : 64;

  return (
    <Sphere ref={meshRef} args={[3, segments, segments]} position={[0, 0, -5]}>
      <meshStandardMaterial
        color="#4a90e2"
        wireframe
        transparent
        opacity={0.15}
        emissive="#50c9ff"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

function GridPlane({ isMobile }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.z = (time * 2) % 20 - 10;
  });

  // Menos subdivisiones en móviles
  const segments = isMobile ? 20 : 40;

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
      <planeGeometry args={[100, 100, segments, segments]} />
      <meshBasicMaterial
        color="#4a90e2"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}

const Background = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es móvil o tablet
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 
                     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={styles.background}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        dpr={isMobile ? [1, 1] : [1, 2]}
        gl={{ 
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance'
        }}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#0a0814']} />
        <fog attach="fog" args={['#0a0814', 15, 40]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#50c9ff" distance={30} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#4a90e2" />
        
        <Nebula isMobile={isMobile} />
        <GlowingSphere isMobile={isMobile} />
        <GridPlane isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default Background;