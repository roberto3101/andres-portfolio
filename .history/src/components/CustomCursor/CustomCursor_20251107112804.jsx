import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    // Seguimiento del mouse
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Crear partículas ocasionalmente
      if (Math.random() > 0.9) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        };
        setParticles(prev => [...prev, newParticle]);
        
        // Eliminar partícula después de la animación
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 1000);
      }
    };

    // Detectar elementos interactivos
    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.onclick ||
        e.target.classList.contains('clickable') ||
        window.getComputedStyle(e.target).cursor === 'pointer'
      ) {
        setIsPointer(true);
      }
    };

    const handleMouseOut = () => {
      setIsPointer(false);
    };

    // Ocultar cursor cuando sale de la ventana
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    // Animación suave del cursor
    const animate = () => {
      // Cursor principal con suavizado
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      // Punto central con más suavizado
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;

      if (cursor) {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }
      if (cursorDot) {
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
      }

      requestAnimationFrame(animate);
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // No mostrar en móviles
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Cursor principal */}
      <div
        ref={cursorRef}
        className={`${styles.cursor} ${isPointer ? styles.cursorPointer : ''} ${
          isHidden ? styles.cursorHidden : ''
        }`}
      >
        <div className={styles.cursorRing}></div>
      </div>

      {/* Punto central */}
      <div
        ref={cursorDotRef}
        className={`${styles.cursorDot} ${isPointer ? styles.cursorDotPointer : ''} ${
          isHidden ? styles.cursorHidden : ''
        }`}
      ></div>

      {/* Partículas */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={styles.particle}
          style={{
            left: particle.x,
            top: particle.y,
          }}
        ></div>
      ))}
    </>
  );
};

export default CustomCursor;