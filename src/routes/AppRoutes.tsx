import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import AdminPage from "../pages/AdminPage";

import { authRepository } from "../repositories/authRepository";

function AppRoutes() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    authRepository.isAuthenticated()
  );

  const currentUser = authRepository.getCurrentUser();

  const isAdmin = currentUser?.role === "ADMIN";

  const handleLogin = () => {
    const user = authRepository.getCurrentUser();

    setIsAuthenticated(user !== null);

    if (user?.role === "ADMIN") {
      navigate("/admin", { replace: true });
    } else if (user) {
      navigate("/dashboard", { replace: true });
    }
  };

  const handleLogout = () => {
    authRepository.logout();
    setIsAuthenticated(false);
    navigate("/", { replace: true });
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate
              to={isAdmin ? "/admin" : "/dashboard"}
              replace
            />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        }
      />

      <Route
        path="/admin"
        element={
          !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : isAdmin ? (
            <AdminPage onLogout={handleLogout} />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : isAdmin ? (
            <Navigate to="/admin" replace />
          ) : (
            <DashboardPage onLogout={handleLogout} />
          )
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

function AppRoutesWrapper() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default AppRoutesWrapper;