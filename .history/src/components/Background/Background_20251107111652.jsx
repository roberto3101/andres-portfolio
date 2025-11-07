import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import styles from './Background.module.css';

function StarField() {
  const ref = useRef();
  const count = 2000;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Posiciones aleatorias en un espacio más grande
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      // Colores variados entre azules y celestes
      const colorVariant = Math.random();
      if (colorVariant > 0.7) {
        colors[i * 3] = 0.3;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 1;
      } else if (colorVariant > 0.4) {
        colors[i * 3] = 0.29;
        colors[i * 3 + 1] = 0.56;
        colors[i * 3 + 2] = 0.89;
      } else {
        colors[i * 3] = 0.5;
        colors[i * 3 + 1] = 0.7;
        colors[i * 3 + 2] = 0.9;
      }
    }

    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = time * 0.02;
    ref.current.rotation.y = time * 0.03;
  });

  return (
    <group ref={ref}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FloatingGeometry() {
  const meshRef = useRef();
  const count = 8;

  const geometries = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: Math.random() * 0.5 + 0.3,
    }));
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.children.forEach((mesh, i) => {
        mesh.rotation.x = time * (0.1 + i * 0.02);
        mesh.rotation.y = time * (0.15 + i * 0.02);
        mesh.position.y += Math.sin(time + i) * 0.001;
      });
    }
  });

  return (
    <group ref={meshRef}>
      {geometries.map((geo, i) => (
        <mesh key={i} position={geo.position} rotation={geo.rotation} scale={geo.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#4a90e2"
            wireframe
            transparent
            opacity={0.15}
            emissive="#4a90e2"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function Waves() {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const wave1 = Math.sin(x * 0.5 + time * 0.5) * 0.5;
        const wave2 = Math.sin(y * 0.5 + time * 0.3) * 0.5;
        positions.setZ(i, wave1 + wave2);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 4, 0, 0]} position={[0, -10, -10]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshStandardMaterial
        color="#4a90e2"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}

const Background = () => {
  return (
    <div className={styles.background}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0a0814']} />
        <fog attach="fog" args={['#0a0814', 10, 50]} />
        
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#4a90e2" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#50c9ff" />
        
        <StarField />
        <FloatingGeometry />
        <Waves />
      </Canvas>
    </div>
  );
};

export default Background;