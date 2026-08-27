import { useState } from "react";

import LoginForm from "../../components/auth/LoginForm";
import { authRepository } from "../../repositories/authRepository";

import type { LoginCredentials } from "../../types/auth";

interface LoginPageProps {
  onLogin: () => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [error, setError] = useState("");

  const handleLogin = (credentials: LoginCredentials) => {
    setError("");

    const user = authRepository.login(credentials);

    if (!user) {
      setError("El carnet o la contraseña son incorrectos.");
      return;
    }

    onLogin();
  };

  return (
    <main className="login-shell">
      <LoginForm error={error} onSubmit={handleLogin} />
    </main>
  );
}

export default LoginPage;
