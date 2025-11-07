import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import styles from './Background.module.css';

function AnimatedSphere() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} scale={2}>
      <meshStandardMaterial
        color="#4a90e2"
        wireframe
        transparent
        opacity={0.3}
      />
    </Sphere>
  );
}

function Particles() {
  const count = 100;
  const particles = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    particles.current.rotation.y = time * 0.05;
  });

  const particlesPosition = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    particlesPosition[i * 3] = (Math.random() - 0.5) * 10;
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 10;
    particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#4a90e2" transparent opacity={0.6} />
    </points>
  );
}

const Background = () => {
  return (
    <div className={styles.background}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedSphere />
        <Particles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Background;