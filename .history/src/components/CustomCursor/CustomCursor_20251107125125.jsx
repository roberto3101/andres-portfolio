import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isOverTranslator, setIsOverTranslator] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [trail, setTrail] = useState([]);
  const idCounter = useRef(0);  // NUEVO: Contador para IDs únicos

  useEffect(() => {
    let animationFrameId;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Detección ampliada (de la solución anterior)
      const isOverTranslate = 
        e.target.closest('#translate-widget-container') ||
        e.target.closest('#google_translate_element') ||
        e.target.closest('.goog-te-combo') ||
        e.target.closest('.goog-te-menu-frame') ||
        e.target.closest('.goog-te-menu-value') ||
        e.target.closest('.skiptranslate');

      setTimeout(() => {
        setIsOverTranslator(isOverTranslate);
      }, 10);

      if (!isOverTranslate) {
        setTrail(prev => {
          idCounter.current += 1;  // NUEVO: Incrementa contador para ID único
          const newTrail = [{ x: e.clientX, y: e.clientY, id: `${Date.now()}-${idCounter.current}` }, ...prev];  // NUEVO: ID compuesto único
          return newTrail.slice(0, 20);
        });
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    // Resto del useEffect igual (handleMouseDown, etc.)
    // ...

    return () => {
      // Cleanup igual
    };
  }, [isOverTranslator]);

  if (typeof window !== 'undefined' && (window.innerWidth < 1024 || 'ontouchstart' in window)) {
    return null;
  }

  return (
    <>
      {!isOverTranslator && trail.map((point, index) => (
        <div
          key={point.id}  // Ahora único
          className={styles.trailDot}
          style={{
            left: point.x,
            top: point.y,
            opacity: (1 - index / 20) * 0.6,
            transform: `translate(-50%, -50%) scale(${1 - index / 20})`,
          }}
        />
      ))}

      {/* Resto del return igual (cursor principal, ripples) */}
    </>
  );
};

export default CustomCursor;