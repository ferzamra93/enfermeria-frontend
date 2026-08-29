const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-column">

          <h3>Enfermería</h3>

          <p>
            Tu cuidado, nuestra prioridad.
            Un sistema pensado para facilitar
            la gestión y atención de enfermería.
          </p>

        </div>

        <div className="footer-column">

          <h4>Enlaces rápidos</h4>

          <a href="/">Inicio</a>
          <a href="/nosotros">Nosotros</a>
          <a href="/servicios">Servicios</a>
          <a href="/contacto">Contacto</a>

        </div>

        <div className="footer-column">

          <h4>Contacto</h4>

          <p>📧 enfermeria@example.com</p>
          <p>📞 +591 70000000</p>
          <p>📍 Bolivia</p>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Enfermería. Todos los derechos reservados.
      </div>

    </footer>
  );
};

export default Footer;