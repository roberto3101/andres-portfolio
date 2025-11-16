import { useEffect, useRef, useState } from 'react';
//import styles from './CustomCursor.module.css';

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

    const handleMouseMove = (e) => {
      // Ocultar cursor si está sobre el traductor
      const translatorWidget = document.getElementById('translate-widget-container');
      if (translatorWidget) {
        const rect = translatorWidget.getBoundingClientRect();
        const isOverTranslator = (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        );
        
        if (isOverTranslator) {
          setIsHidden(true);
          return;
        } else {
          setIsHidden(false);
        }
      }

      mouseX = e.clientX;
      mouseY = e.clientY;

      if (Math.random() > 0.9) {
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

  return (
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

      <div
        ref={cursorDotRef}
        className={`${styles.cursorDot} ${isPointer ? styles.cursorDotPointer : ''} ${
          isHidden ? styles.cursorHidden : ''
        }`}
      ></div>
    </>
  );
};

export default CustomCursor;