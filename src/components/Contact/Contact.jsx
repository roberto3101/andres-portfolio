import { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { personalInfo } from '../../data/portfolioData';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Crear el mailto con los datos del formulario
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Contacto</h2>

        <div className={styles.content}>
          <div className={styles.contactInfo}>
            <h3>Información de Contacto</h3>
            <p className={styles.intro}>
              Estoy disponible para nuevas oportunidades laborales y colaboraciones. 
              No dudes en contactarme.
            </p>

            <div className={styles.infoItems}>
              <div className={styles.infoItem}>
                <FaEnvelope className={styles.icon} />
                <div>
                  <h4>Email</h4>
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <FaPhone className={styles.icon} />
                <div>
                  <h4>Teléfono</h4>
                  <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <FaMapMarkerAlt className={styles.icon} />
                <div>
                  <h4>Ubicación</h4>
                  <p>{personalInfo.location}</p>
                </div>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaGithub />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaLinkedin />
              </a>
            </div>
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <h3>Envíame un Mensaje</h3>
            
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                placeholder="Tu Nombre"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Tu Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="text"
                name="subject"
                placeholder="Asunto"
                value={formData.subject}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <textarea
                name="message"
                placeholder="Tu Mensaje"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className={styles.textarea}
              ></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;