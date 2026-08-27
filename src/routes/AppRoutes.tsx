import { useState } from "react";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import { authRepository } from "../repositories/authRepository";

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authRepository.isAuthenticated(),
  );

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return <HomePage onLogout={() => setIsAuthenticated(false)} />;
}

export default AppRoutes;
