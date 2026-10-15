import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <span>+</span>
          </div>

          <div className="logo-text">
            <span className="logo-title">Sistema de Enfermería</span>
            <span className="logo-subtitle">
              Cuidar, acompañar y proteger
            </span>
          </div>
        </Link>

        <nav className="navbar-menu" aria-label="Navegación principal">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Inicio
          </NavLink>

          <a
              href="https://donboscosucre.edu.bo/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Nosotros
          </a>
        </nav>

        <Link to="/login" className="login-button">
          <span className="login-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M20 21a8 8 0 0 0-16 0"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle
                cx="12"
                cy="7"
                r="4"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
          </span>
          <span>Iniciar sesión</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;