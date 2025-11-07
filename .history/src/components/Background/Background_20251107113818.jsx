import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import styles from './Background.module.css';

function Earth({ isMobile }) {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const atmosphereRef = useRef();

  // Cargar texturas de la Tierra
  const [earthMap, normalMap, specularMap] = useLoader(THREE.TextureLoader, [
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
  ]);

  const cloudsMap = useLoader(
    THREE.TextureLoader,
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotación de la Tierra
    if (earthRef.current) {
      earthRef.current.rotation.y = time * 0.05;
    }
    
    // Rotación de las nubes (más lenta)
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = time * 0.06;
    }

    // Pulso sutil de la atmósfera
    if (atmosphereRef.current) {
      const scale = 1 + Math.sin(time * 0.5) * 0.02;
      atmosphereRef.current.scale.set(scale, scale, scale);
    }
  });

  const segments = isMobile ? 64 : 128;

  return (
    <group position={[0, 0, -5]}>
      {/* Tierra */}
      <Sphere ref={earthRef} args={[2.5, segments, segments]}>
        <meshStandardMaterial
          map={earthMap}
          normalMap={normalMap}
          specularMap={specularMap}
          metalness={0.3}
          roughness={0.7}
        />
      </Sphere>

      {/* Nubes */}
      <Sphere ref={cloudsRef} args={[2.52, segments, segments]}>
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </Sphere>

      {/* Atmósfera (glow) */}
      <Sphere ref={atmosphereRef} args={[2.7, segments, segments]}>
        <meshBasicMaterial
          color="#4a90e2"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

function FloatingCrystals({ isMobile }) {
  const groupRef = useRef();
  const count = isMobile ? 15 : 30;

  const crystals = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ],
      scale: Math.random() * 0.4 + 0.2,
      speed: Math.random() * 0.02 + 0.01,
    }));
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.children.forEach((crystal, i) => {
      crystal.rotation.x += crystals[i].speed;
      crystal.rotation.y += crystals[i].speed * 0.7;
      crystal.position.y += Math.sin(time * crystals[i].speed + i) * 0.002;
    });
    groupRef.current.rotation.y = time * 0.02;
  });

  return (
    <group ref={groupRef}>
      {crystals.map((crystal, i) => (
        <mesh
          key={i}
          position={crystal.position}
          rotation={crystal.rotation}
          scale={crystal.scale}
        >
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#4a90e2"
            wireframe
            transparent
            opacity={0.3}
            emissive="#50c9ff"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function StarField({ isMobile }) {
  const pointsRef = useRef();
  const count = isMobile ? 500 : 1500;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const intensity = Math.random();
      colors[i * 3] = 0.8 + intensity * 0.2;
      colors[i * 3 + 1] = 0.8 + intensity * 0.2;
      colors[i * 3 + 2] = 0.8 + intensity * 0.2;
    }

    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.01;
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
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
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

function OrbitalRings({ isMobile }) {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -time * 0.2;
    if (ring3Ref.current) ring3Ref.current.rotation.z = time * 0.15;
  });

  const segments = isMobile ? 32 : 64;

  return (
    <group position={[0, 0, -5]}>
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4, 0.02, 16, segments]} />
        <meshBasicMaterial color="#4a90e2" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[4.5, 0.015, 16, segments]} />
        <meshBasicMaterial color="#50c9ff" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[5, 0.01, 16, segments]} />
        <meshBasicMaterial color="#7ab8f5" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function GridPlane({ isMobile }) {
  const meshRef = useRef();
  const segments = isMobile ? 20 : 40;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.z = (time * 1.5) % 20 - 10;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
      <planeGeometry args={[100, 100, segments, segments]} />
      <meshBasicMaterial
        color="#4a90e2"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

const Background = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 15, 45]} />
        
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, -3, 5]} intensity={0.5} color="#4a90e2" />
        
        <StarField isMobile={isMobile} />
        <Earth isMobile={isMobile} />
        <FloatingCrystals isMobile={isMobile} />
        <OrbitalRings isMobile={isMobile} />
        <GridPlane isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default Background;