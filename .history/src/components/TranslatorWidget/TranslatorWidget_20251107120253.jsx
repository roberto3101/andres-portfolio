import { useState, useRef, useEffect } from 'react';
import { FaGlobe, FaTimes, FaGripVertical } from 'react-icons/fa';
import styles from './TranslatorWidget.module.css';

const TranslatorWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 150, y: 100 });
  const [currentLang, setCurrentLang] = useState('es');
  const [isGoogleReady, setIsGoogleReady] = useState(false);
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

  // Verificar cuando Google Translate está listo
  useEffect(() => {
    const checkGoogleTranslate = setInterval(() => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        setIsGoogleReady(true);
        clearInterval(checkGoogleTranslate);
        console.log('✅ Google Translate está listo!');
      }
    }, 100);

    return () => clearInterval(checkGoogleTranslate);
  }, []);

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

  // FUNCIÓN QUE SÍ FUNCIONA
  const changeLanguage = (langCode) => {
    console.log(`🌐 Cambiando a idioma: ${langCode}`);
    
    if (!isGoogleReady) {
      console.warn('⚠️ Google Translate aún no está listo');
      alert('Espera un momento, Google Translate se está cargando...');
      return;
    }

    setCurrentLang(langCode);
    
    // Método 1: Usando la función global
    if (window.changeLanguage) {
      window.changeLanguage(langCode);
      console.log('✅ Idioma cambiado usando función global');
    } else {
      // Método 2: Directo al select
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
        console.log('✅ Idioma cambiado usando select directo');
      } else {
        console.error('❌ No se encontró el selector de Google Translate');
      }
    }
    
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
            title={isGoogleReady ? 'Cambiar idioma' : 'Cargando traductor...'}
          >
            <FaGlobe className={styles.icon} />
            <span className={styles.currentFlag}>{getCurrentFlag()}</span>
            {!isGoogleReady && <span className={styles.loading}>...</span>}
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
            
            {!isGoogleReady && (
              <p className={styles.loadingText}>Cargando traductor...</p>
            )}

            <div className={styles.languageList}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`${styles.langButton} ${currentLang === lang.code ? styles.active : ''}`}
                  onClick={() => changeLanguage(lang.code)}
                  disabled={!isGoogleReady}
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