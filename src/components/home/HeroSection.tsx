import { Link } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay" />

      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-small-title">
            SISTEMA INTEGRAL DE SALUD ESCOLAR
          </p>

          <h1>
            Cuidamos la salud,
            <br />
            <strong>protegemos el futuro.</strong>
          </h1>

          <p className="hero-description">
            Una plataforma para organizar la atención de enfermería,
            gestionar estudiantes y mantener su información clínica
            de forma clara y responsable.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="hero-button primary">
              Iniciar sesión
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;