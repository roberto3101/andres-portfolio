import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [particles, setParticles] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Crear partículas ocasionalmente
      if (Math.random() > 0.95) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        };
        setParticles(prev => [...prev, newParticle]);
        
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 1000);
      }
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.onclick ||
        e.target.classList.contains('clickable') ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.classList.contains('goog-te-combo') ||
        window.getComputedStyle(e.target).cursor === 'pointer'
      ) {
        setIsPointer(true);
      }
    };

    const handleMouseOut = () => {
      setIsPointer(false);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      if (cursor) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
      }

      requestAnimationFrame(animate);
    };

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

  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  const cursor = (
    <>
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

      <div
        ref={cursorRef}
        className={`${styles.cursor} ${isPointer ? styles.cursorPointer : ''} ${
          isHidden ? styles.cursorHidden : ''
        }`}
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
    </>
  );

  return ReactDOM.createPortal(cursor, document.body);
}