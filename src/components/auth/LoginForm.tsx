import { useState } from "react";
import type { FormEventHandler } from "react";
import type { LoginCredentials } from "../../types/auth";

interface LoginFormProps {
  error?: string;
  onSubmit: (credentials: LoginCredentials) => void;
}

function LoginForm({ error, onSubmit }: LoginFormProps) {
  const [carnet, setCarnet] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const normalizedCarnet = carnet.trim();

    if (!normalizedCarnet || !password) {
      return;
    }

    onSubmit({
      carnet: normalizedCarnet,
      password,
    });
  };

  return (
    <section className="login-card" aria-labelledby="login-title">
      <div className="login-badge" aria-hidden="true">
        +
      </div>

      <p className="eyebrow">Acceso seguro</p>
      <h1 id="login-title">Iniciar sesión</h1>
      <p className="login-copy">
        Ingresa con tu carnet y contraseña para acceder al sistema de enfermería.
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="carnet">Carnet de identidad</label>

          <input
            id="carnet"
            name="carnet"
            type="text"
            value={carnet}
            onChange={(event) => setCarnet(event.target.value)}
            placeholder="Ingrese su carnet"
            autoComplete="username"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Contraseña</label>

          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Ingrese su contraseña"
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <p className="login-error" role="alert" aria-live="polite">
            {error}
          </p>
        )}

        <button className="primary-button" type="submit">
          Ingresar
        </button>
      </form>
    </section>
  );
}

export default LoginForm;
