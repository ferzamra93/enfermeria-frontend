import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">

          <h3>Enfermería</h3>

          <p>
            Sistema integral para la gestión
            de servicios de enfermería y cuidado
            personalizado.
          </p>

          <div className="footer-social">
            <a href="#">f</a>
            <a href="#">in</a>
            <a href="#">◎</a>
          </div>

        </div>


        <div className="footer-column">

          <h4>Enlaces</h4>

          <ul>
            <li>
              <a href="#">Inicio</a>
            </li>

            <li>
              <a href="#">Nosotros</a>
            </li>

            <li>
              <a href="#">Servicios</a>
            </li>

            <li>
              <a href="#">Contacto</a>
            </li>
          </ul>

        </div>


        <div className="footer-column">

          <h4>Servicios</h4>

          <ul>
            <li>
              <a href="#">Gestión de pacientes</a>
            </li>

            <li>
              <a href="#">Citas</a>
            </li>

            <li>
              <a href="#">Historias clínicas</a>
            </li>

            <li>
              <a href="#">Medicamentos</a>
            </li>
          </ul>

        </div>


        <div className="footer-column">

          <h4>Contacto</h4>

          <div className="footer-contact">

            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                📍
              </span>

              <span>
                La Paz, Bolivia
              </span>
            </div>

            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                ✉
              </span>

              <span>
                contacto@enfermeria.com
              </span>
            </div>

            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                ☎
              </span>

              <span>
                +591 70000000
              </span>
            </div>

          </div>

        </div>

      </div>


      <div className="footer-bottom">

        <p>
          © 2026 Enfermería. Todos los derechos reservados.
        </p>

        <div className="footer-bottom-links">
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
        </div>

      </div>

    </footer>
  );
};

export default Footer;