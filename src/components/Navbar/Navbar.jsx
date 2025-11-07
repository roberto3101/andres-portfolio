import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => scrollToSection('hero')}>
          <span className={styles.logoText}>AS</span>
        </div>

        <button
          className={styles.mobileMenuBtn}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ''}`}>
          <li><a onClick={() => scrollToSection('hero')}>Inicio</a></li>
          <li><a onClick={() => scrollToSection('about')}>Sobre mí</a></li>
          <li><a onClick={() => scrollToSection('skills')}>Habilidades</a></li>
          <li><a onClick={() => scrollToSection('projects')}>Proyectos</a></li>
          <li><a onClick={() => scrollToSection('contact')}>Contacto</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;