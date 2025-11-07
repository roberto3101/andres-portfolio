import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    let animationFrameId;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Actualizar trail
      setTrail(prev => {
        const newTrail = [{ x: e.clientX, y: e.clientY, id: Date.now() }, ...prev];
        return newTrail.slice(0, 20); // Mantener solo 20 puntos
      });

      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      // Crear ripple en click
      const newRipple = {
        id: Date.now(),
        x: lastX,
        y: lastY,
      };
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick ||
        target.classList.contains('clickable') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isInteractive);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // No mostrar en móviles/tablets
  if (typeof window !== 'undefined' && (window.innerWidth < 1024 || 'ontouchstart' in window)) {
    return null;
  }

  return (
    <>
      {/* Trail de partículas */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className={styles.trailDot}
          style={{
            left: point.x,
            top: point.y,
            opacity: (1 - index / 20) * 0.6,
            transform: `translate(-50%, -50%) scale(${1 - index / 20})`,
          }}
        />
      ))}

      {/* Cursor principal - MUCHO MÁS GRANDE Y VISIBLE */}
      <div
        ref={cursorRef}
        className={`${styles.cursor} ${isPointer ? styles.cursorPointer : ''} ${
          isClicking ? styles.cursorClicking : ''
        }`}
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      >
        {/* Anillo exterior grande */}
        <div className={styles.cursorRingOuter}>
          <div className={styles.cursorRingMiddle}>
            <div className={styles.cursorRingInner}></div>
          </div>
        </div>

        {/* Punto central brillante */}
        <div className={styles.cursorCore}></div>

        {/* Puntos orbitales */}
        <div className={styles.orbitDot} style={{ '--delay': '0s' }}></div>
        <div className={styles.orbitDot} style={{ '--delay': '0.5s' }}></div>
        <div className={styles.orbitDot} style={{ '--delay': '1s' }}></div>
      </div>

      {/* Ripples al hacer click */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className={styles.ripple}
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        ></div>
      ))}
    </>
  );
};

export default CustomCursor;