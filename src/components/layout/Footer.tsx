import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-brand-link">
            <span className="footer-brand-icon">+</span>
            <span>Sistema de Enfermería</span>
          </Link>

          <p>
            Una herramienta para organizar la atención, proteger la
            información y acompañar el bienestar de cada estudiante.
          </p>
        </div>

        <div className="footer-column">
          <h4>Navegación</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li>
              <a
                href="https://donboscosucre.edu.bo/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nosotros
              </a>
            </li>
            
          </ul>
        </div>

        <div className="footer-column">
          <h4>Gestión de enfermería</h4>
          <ul>
            <li><span>Estudiantes</span></li>
            <li><span>Reportes de medicamentos</span></li>
            <li><span>Historial clínico</span></li>
            <li><span>Atención de enfermería</span></li>
          </ul>
        </div>

        <div className="footer-column footer-access">
          <h4>Acceso al sistema</h4>
          <p>Ingresa al sistema para gestionar los registros autorizados.</p>
          <Link to="/login" className="footer-login-link">
            Iniciar sesión <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Sistema de Enfermería.</p>
        <p>Atención responsable · Privacidad · Bienestar</p>
      </div>
    </footer>
  );
};

export default Footer;