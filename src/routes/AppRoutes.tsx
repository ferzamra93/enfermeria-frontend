import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useState } from "react";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/DashboardPage";

import { authRepository } from "../repositories/authRepository";


function AppRoutes() {

  const [isAuthenticated, setIsAuthenticated] = useState(
    authRepository.isAuthenticated()
  );


  const handleLogin = () => {
    setIsAuthenticated(true);
  };


  const handleLogout = () => {
    setIsAuthenticated(false);
  };


  return (
    <BrowserRouter>

      <Routes>

        {/* =========================
            PÁGINA PRINCIPAL
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
            <LoginPage
              onLogin={handleLogin}
            />
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

    </BrowserRouter>
  );
}


export default AppRoutes;
