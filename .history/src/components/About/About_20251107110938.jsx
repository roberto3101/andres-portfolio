import { personalInfo, education, interests } from '../../data/portfolioData';
import styles from './About.module.css';

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Sobre Mí</h2>
        
        <div className={styles.content}>
          <div className={styles.infoCard}>
            <h3>Presentación</h3>
            <p className={styles.description}>{personalInfo.description}</p>
            
            <div className={styles.personalDetails}>
              <div className={styles.detail}>
                <strong>Edad:</strong> <span>{personalInfo.age} años</span>
              </div>
              <div className={styles.detail}>
                <strong>Ubicación:</strong> <span>{personalInfo.location}</span>
              </div>
              <div className={styles.detail}>
                <strong>Email:</strong> <span>{personalInfo.email}</span>
              </div>
              <div className={styles.detail}>
                <strong>Teléfono:</strong> <span>{personalInfo.phone}</span>
              </div>
            </div>
          </div>

          <div className={styles.educationCard}>
            <h3>Formación Académica</h3>
            <div className={styles.educationList}>
              {education.map((edu, index) => (
                <div key={index} className={styles.educationItem}>
                  <div className={styles.eduHeader}>
                    <h4>{edu.institution}</h4>
                    <span className={styles.period}>{edu.period}</span>
                  </div>
                  <p className={styles.degree}>{edu.degree}</p>
                  <p className={styles.location}>{edu.location}</p>
                  <span className={styles.status}>{edu.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.interestsCard}>
            <h3>Intereses</h3>
            <div className={styles.interestsList}>
              {interests.map((interest, index) => (
                <span key={index} className={styles.interestTag}>
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;