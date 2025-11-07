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
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const handleMouseDown = (e) => {
    if (e.target.closest(`.${styles.dragHandle}`)) {
      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX - position.x,
        startY: e.clientY - position.y,
      };
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragRef.current.startX;
      const newY = e.clientY - dragRef.current.startY;
      
      // Limitar dentro de la ventana
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 100;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const changeLanguage = (langCode) => {
    setCurrentLang(langCode);
    // Aquí podrías implementar la lógica de traducción real
    console.log(`Cambiando idioma a: ${langCode}`);
    setIsOpen(false);
  };

  const getCurrentFlag = () => {
    return languages.find(lang => lang.code === currentLang)?.flag || '🌐';
  };

  return (
    <>
      {/* Botón flotante */}
      <div
        ref={widgetRef}
        className={`${styles.floatingWidget} ${isOpen ? styles.open : ''} ${isDragging ? styles.dragging : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={handleMouseDown}
      >
        <div className={styles.nebula}>
          <div className={styles.nebulaCore}></div>
          <div className={styles.nebulaGlow}></div>
        </div>

        {!isOpen ? (
          <button
            className={styles.mainButton}
            onClick={() => setIsOpen(true)}
          >
            <FaGlobe className={styles.icon} />
            <span className={styles.currentFlag}>{getCurrentFlag()}</span>
          </button>
        ) : (
          <div className={styles.languagePanel}>
            <div className={styles.dragHandle}>
              <FaGripVertical />
            </div>
            
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>

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