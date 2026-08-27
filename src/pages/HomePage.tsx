import { authRepository } from "../repositories/authRepository";

interface HomePageProps {
  onLogout: () => void;
}

function HomePage({ onLogout }: HomePageProps) {
  const user = authRepository.getCurrentUser();

  const handleLogout = () => {
    authRepository.logout();
    onLogout();
  };

  return (
    <main className="home-page">
      <section className="home-card">
        <p className="eyebrow">Sistema de enfermería</p>
        <h1>Página principal</h1>

        {user ? (
          <>
            <p>Bienvenido, {user.name}</p>
            <p>Carnet: {user.carnet}</p>
            <p>Rol: {user.role}</p>

            <button type="button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <p>No existe una sesión activa. Ingrese desde /login.</p>
        )}
      </section>
    </main>
  );
}

export default HomePage;
