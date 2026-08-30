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

import { authRepository } from "../repositories/authRepository";


function AppRoutes() {

  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    authRepository.isAuthenticated()
  );


  // =========================
  // LOGIN
  // =========================

  const handleLogin = () => {

    setIsAuthenticated(true);

    navigate("/dashboard");
  };


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    authRepository.logout();

    setIsAuthenticated(false);

    navigate("/");
  };


  return (
    <Routes>

      {/* =========================
          HOME
      ========================== */}

      <Route
        path="/"
        element={<HomePage />}
      />


      {/* =========================
          LOGIN
      ========================== */}

      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate
              to="/dashboard"
              replace
            />
          ) : (
            <LoginPage
              onLogin={handleLogin}
            />
          )
        }
      />


      {/* =========================
          DASHBOARD
      ========================== */}

      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <DashboardPage
              onLogout={handleLogout}
            />
          ) : (
            <Navigate
              to="/login"
              replace
            />
          )
        }
      />


      {/* =========================
          RUTA NO ENCONTRADA
      ========================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}


// ========================================
// BROWSER ROUTER
// ========================================

function AppRoutesWrapper() {

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}


export default AppRoutesWrapper;