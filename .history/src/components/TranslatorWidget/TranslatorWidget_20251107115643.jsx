import { useState, useRef, useEffect } from 'react';
import { FaGlobe, FaTimes, FaGripVertical } from 'react-icons/fa';
import styles from './TranslatorWidget.module.css';

const TranslatorWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 150, y: 100 });
  const [currentLang, setCurrentLang] = useState('es');
  const widgetRef = useRef(null);
  const dragRef = useRef({ startX: 0, startY: 0 });

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX - position.x,
      startY: e.clientY - position.y,
    };
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragRef.current.startX;
      const newY = e.clientY - dragRef.current.startY;
      
      // Obtener dimensiones del widget
      const widgetWidth = isOpen ? 300 : 70;
      const widgetHeight = isOpen ? 380 : 70;
      
      // Limitar dentro de la ventana con margen
      const maxX = window.innerWidth - widgetWidth;
      const maxY = window.innerHeight - widgetHeight;
      
      setPosition({
        x: Math.max(20, Math.min(newX, maxX)),
        y: Math.max(20, Math.min(newY, maxY)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    dragRef.current = {
      startX: touch.clientX - position.x,
      startY: touch.clientY - position.y,
    };
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      const newX = touch.clientX - dragRef.current.startX;
      const newY = touch.clientY - dragRef.current.startY;
      
      const widgetWidth = isOpen ? 300 : 70;
      const widgetHeight = isOpen ? 380 : 70;
      
      const maxX = window.innerWidth - widgetWidth;
      const maxY = window.innerHeight - widgetHeight;
      
      setPosition({
        x: Math.max(20, Math.min(newX, maxX)),
        y: Math.max(20, Math.min(newY, maxY)),
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, isOpen]);

  // Ajustar posición cuando se abre/cierra para no salir de pantalla
  useEffect(() => {
    const widgetWidth = isOpen ? 300 : 70;
    const widgetHeight = isOpen ? 380 : 70;
    
    const maxX = window.innerWidth - widgetWidth - 20;
    const maxY = window.innerHeight - widgetHeight - 20;
    
    setPosition(prev => ({
      x: Math.min(prev.x, maxX),
      y: Math.min(prev.y, maxY),
    }));
  }, [isOpen]);

  const changeLanguage = (langCode) => {
    setCurrentLang(langCode);
    console.log(`Cambiando idioma a: ${langCode}`);
    setIsOpen(false);
  };

  const getCurrentFlag = () => {
    return languages.find(lang => lang.code === currentLang)?.flag || '🌐';
  };

  const toggleOpen = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        ref={widgetRef}
        className={`${styles.floatingWidget} ${isOpen ? styles.open : ''} ${isDragging ? styles.dragging : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className={styles.nebula}>
          <div className={styles.nebulaCore}></div>
          <div className={styles.nebulaGlow}></div>
        </div>

        {!isOpen ? (
          <button
            className={styles.mainButton}
            onClick={toggleOpen}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <FaGlobe className={styles.icon} />
            <span className={styles.currentFlag}>{getCurrentFlag()}</span>
          </button>
        ) : (
          <div 
            className={styles.languagePanel}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <div className={styles.dragHandle}>
                <FaGripVertical />
              </div>
              
              <button
                className={styles.closeButton}
                onClick={toggleOpen}
              >
                <FaTimes />
              </button>
            </div>

            <h3 className={styles.panelTitle}>Selecciona Idioma</h3>

            <div className={styles.languageList}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`${styles.langButton} ${currentLang === lang.code ? styles.active : ''}`}
                  onClick={() => changeLanguage(lang.code)}
                >
                  <span className={styles.flag}>{lang.flag}</span>
                  <span className={styles.langName}>{lang.name}</span>
                  {currentLang === lang.code && (
                    <span className={styles.checkMark}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TranslatorWidget;