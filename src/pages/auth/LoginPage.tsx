import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import { authRepository } from "../../repositories/authRepository";

import "./LoginPage.css";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleLogin = (credentials: {
    carnet: string;
    password: string;
  }) => {
    setError("");

    const user = authRepository.login(credentials);

    if (!user) {
      setError("Carnet o contraseña incorrectos.");
      return;
    }

    onLogin();
  };

  return (
    <main className="login-page">
      <section className="login-layout">
        <div className="login-info">
          <button
            type="button"
            className="login-back-button"
            onClick={() => navigate("/")}
          >
            ← Volver al inicio
          </button>

          <div className="login-info-content">
            <div className="login-brand">
              <div className="login-brand-icon">+</div>

              <span>Sistema de Enfermería</span>
            </div>

            <h1>
              Atención y cuidado
              <br />
              <strong>en un solo lugar.</strong>
            </h1>

            <p>
              Gestiona estudiantes, atenciones, medicamentos e historias
              clínicas de forma sencilla y segura.
            </p>

            <div className="login-features">
              <div className="login-feature">
                <span>✓</span>
                <p>Gestión de estudiantes</p>
              </div>

              <div className="login-feature">
                <span>✓</span>
                <p>Control de atenciones</p>
              </div>

              <div className="login-feature">
                <span>✓</span>
                <p>Historial clínico organizado</p>
              </div>
            </div>
          </div>
        </div>

        <div className="login-form-container">
          <div className="login-card">
            <div className="login-card-header">
              <div className="login-mobile-back">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                >
                  ← Inicio
                </button>
              </div>

              <div className="login-icon">+</div>

              <h2>Bienvenido</h2>

              <p>Inicia sesión para acceder al sistema</p>
            </div>

            <LoginForm
              error={error}
              onSubmit={handleLogin}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;


