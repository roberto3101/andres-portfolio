import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import { personalInfo } from '../../data/portfolioData';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.info}>
            <h3>{personalInfo.name}</h3>
            <p>{personalInfo.title}</p>
          </div>

          <div className={styles.links}>
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li><a href="#hero">Inicio</a></li>
              <li><a href="#about">Sobre mí</a></li>
              <li><a href="#skills">Habilidades</a></li>
              <li><a href="#projects">Proyectos</a></li>
              <li><a href="#contact">Contacto</a></li>
            </ul>
          </div>

          <div className={styles.social}>
            <h4>Sígueme</h4>
            <div className={styles.socialLinks}>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {currentYear} {personalInfo.name}. Todos los derechos reservados.
          </p>
          <p className={styles.madeWith}>
            Hecho con <FaHeart className={styles.heart} /> usando React & Three.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;