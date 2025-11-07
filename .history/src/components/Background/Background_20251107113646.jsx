// Solo reemplaza el componente Earth:

function Earth({ isMobile }) {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const atmosphereRef = useRef();

  // Crear textura procedural de la Tierra
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Océanos
    ctx.fillStyle = '#1a5f7a';
    ctx.fillRect(0, 0, 1024, 512);

    // Continentes (formas aleatorias verdes)
    ctx.fillStyle = '#2d5016';
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const radius = Math.random() * 100 + 50;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Nubes (blanco semi-transparente)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 100; i++) {
      ctx.beginPath();
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const radius = Math.random() * 30 + 10;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = time * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = time * 0.06;
    }
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
          map={earthTexture}
          metalness={0.2}
          roughness={0.8}
        />
      </Sphere>

      {/* Atmósfera brillante */}
      <Sphere ref={atmosphereRef} args={[2.7, segments, segments]}>
        <meshBasicMaterial
          color="#4a90e2"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Glow exterior */}
      <Sphere args={[2.9, segments, segments]}>
        <meshBasicMaterial
          color="#50c9ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}