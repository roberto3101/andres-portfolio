import { useState } from 'react';
import { projects } from '../../data/portfolioData';
import styles from './Projects.module.css';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Proyectos</h2>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <h3>{project.title}</h3>
              </div>
              
              <p className={styles.description}>{project.description}</p>

              <div className={styles.technologies}>
                {project.technologies.map((tech, index) => (
                  <span key={index} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>

              <button
                className={styles.viewDetailsBtn}
                onClick={() => setSelectedProject(project)}
              >
                Ver Detalles
              </button>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div className={styles.modal} onClick={() => setSelectedProject(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.closeBtn}
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>
              
              <h3>{selectedProject.title}</h3>
              <p className={styles.modalDescription}>{selectedProject.description}</p>

              <div className={styles.modalTechnologies}>
                <h4>Tecnologías utilizadas:</h4>
                <div className={styles.techList}>
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.modalFeatures}>
                <h4>Características principales:</h4>
                <ul>
                  {selectedProject.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;