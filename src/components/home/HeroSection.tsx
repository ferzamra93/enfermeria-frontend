import { Link } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">

      <div className="hero-overlay"></div>

      <div className="hero-container">

        <div className="hero-content">

          <p className="hero-small-title">
            CUIDADO Y SALUD
          </p>

          <h1>
            Bienvenido a
            <br />
            Enfermería
          </h1>

          <p className="hero-description">
            Sistema integral para la gestión de servicios
            de enfermería y cuidado personalizado.
          </p>

          <div className="hero-buttons">

            <Link to="/login" className="hero-button primary">
              Iniciar Sesión
            </Link>

            <Link to="/nosotros" className="hero-button secondary">
              Conocer Más
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;