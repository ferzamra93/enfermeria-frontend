import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <span>+</span>
          </div>

          <div className="logo-text">
            <span className="logo-title">Enfermería</span>
            <span className="logo-subtitle">
              Tu cuidado, nuestra prioridad
            </span>
          </div>
        </Link>

        {/* MENÚ */}
        <nav className="navbar-menu">
          <Link to="/" className="nav-link active">
            <span className="nav-icon">⌂</span>
            Inicio
          </Link>

          <Link to="/nosotros" className="nav-link">
            <span className="nav-icon">👥</span>
            Nosotros
          </Link>

          <Link to="/servicios" className="nav-link">
            <span className="nav-icon">▣</span>
            Servicios
          </Link>

          <Link to="/contacto" className="nav-link">
            <span className="nav-icon">✉</span>
            Contacto
          </Link>
        </nav>

        {/* BOTÓN LOGIN */}
        <Link to="/login" className="login-button">
          <span className="login-icon">👤</span>
          Iniciar Sesión
        </Link>

      </div>
    </header>
  );
};

export default Navbar;