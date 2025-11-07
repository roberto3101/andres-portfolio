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

  useEffect(() => {
    let animationFrameId;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Detección ampliada: incluye iframe del menú y más clases de Google
      const isOverTranslate = 
        e.target.closest('#translate-widget-container') ||
        e.target.closest('#google_translate_element') ||
        e.target.closest('.goog-te-combo') ||
        e.target.closest('.goog-te-menu-frame') ||  // NUEVO: iframe del menú
        e.target.closest('.goog-te-menu-value') ||
        e.target.closest('.skiptranslate');

      // Usar setTimeout para evitar flickers en transiciones rápidas
      setTimeout(() => {
        setIsOverTranslator(isOverTranslate);
      }, 10);

      if (!isOverTranslate) {
        setTrail(prev => {
          const newTrail = [{ x: e.clientX, y: e.clientY, id: Date.now() }, ...prev];
          return newTrail.slice(0, 20);
        });
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseDown = () => {
      if (isOverTranslator) return;
      
      setIsClicking(true);
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
      
      const isOverTranslate = 
        target.closest('#translate-widget-container') ||
        target.closest('#google_translate_element') ||
        target.closest('.goog-te-menu-frame');  // NUEVO
      
      if (isOverTranslate) {
        setIsOverTranslator(true);
        return;
      }
      
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
  }, [isOverTranslator]);

  if (typeof window !== 'undefined' && (window.innerWidth < 1024 || 'ontouchstart' in window)) {
    return null;
  }

  return (
    <>
      {!isOverTranslator && trail.map((point, index) => (
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

      <div
        ref={cursorRef}
        className={`${styles.cursor} ${isPointer ? styles.cursorPointer : ''} ${isClicking ? styles.cursorClicking : ''}`}
        style={{
          left: mousePos.x,
          top: mousePos.y,
          display: isOverTranslator ? 'none' : 'block',  // NUEVO: Remueve completamente
          transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          zIndex: 9999,  // NUEVO: Baja z-index por debajo del traductor
        }}
      >
        <div className={styles.cursorRingOuter}>
          <div className={styles.cursorRingMiddle}>
            <div className={styles.cursorRingInner}></div>
          </div>
        </div>
        <div className={styles.cursorCore}></div>
        <div className={styles.orbitDot} style={{ '--delay': '0s' }}></div>
        <div className={styles.orbitDot} style={{ '--delay': '0.5s' }}></div>
        <div className={styles.orbitDot} style={{ '--delay': '1s' }}></div>
      </div>

      {!isOverTranslator && ripples.map((ripple) => (
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