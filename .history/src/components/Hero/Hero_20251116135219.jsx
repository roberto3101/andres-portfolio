import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaDownload } from 'react-icons/fa';
import { personalInfo } from '../../data/portfolioData';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.name}>
            {personalInfo.name}
          </h1>
          <h2 className={styles.title}>{personalInfo.title}</h2>
          <p className={styles.subtitle}>{personalInfo.subtitle}</p>
          
          <div className={styles.socialLinks}>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaGithub />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaLinkedin />
            </a>
            <a href={`mailto:${personalInfo.email}`} className={styles.socialLink}>
              <FaEnvelope />
            </a>
            <a href="https://wa.me/51924087168" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaWhatsapp />
            </a>
            <a href="/andresCV.pdf" download="Andres_CV.pdf" className={styles.socialLink}>
              <FaDownload />
            </a>
          </div>

          <div className={styles.ctaButtons}>
            <a href="#contact" className={styles.primaryBtn}>Contáctame</a>
            <a href="#projects" className={styles.secondaryBtn}>Ver Proyectos</a>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <p>Scroll</p>
      </div>
    </section>
  );
};

export default Hero;
```
