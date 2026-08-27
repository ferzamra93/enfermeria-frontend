import { useEffect, useState } from "react";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import { authRepository } from "../repositories/authRepository";

const LOGIN_PATH = "/login";
const HOME_PATH = "/";

type AppPath = typeof HOME_PATH | typeof LOGIN_PATH;

function getCurrentPath(): AppPath {
  return window.location.pathname === LOGIN_PATH ? LOGIN_PATH : HOME_PATH;
}

function AppRoutes() {
  const [currentPath, setCurrentPath] = useState<AppPath>(getCurrentPath);

  const navigate = (path: AppPath) => {
    window.history.pushState(null, "", path);
    setCurrentPath(path);
  };

  useEffect(() => {
    const handlePopState = () => setCurrentPath(getCurrentPath());

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (currentPath === LOGIN_PATH && !authRepository.isAuthenticated()) {
    return <LoginPage onLoginSuccess={() => navigate(HOME_PATH)} />;
  }

  return <HomePage onLogout={() => navigate(LOGIN_PATH)} />;
}

export default AppRoutes;
