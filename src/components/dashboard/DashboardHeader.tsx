interface DashboardHeaderProps {
  onLogout: () => void;
}

const DashboardHeader = ({
  onLogout,
}: DashboardHeaderProps) => {
  return (
    <header className="dashboard-header">

      <div className="dashboard-header-container">

        <div className="dashboard-brand">

          <div className="dashboard-logo">
            +
          </div>

          <div>
            <strong>
              Enfermería
            </strong>

            <span>
              Panel de gestión
            </span>
          </div>

        </div>

        <div className="dashboard-user">

          <div className="user-avatar">
            👩‍⚕️
          </div>

          <div className="user-info">

            <strong>
              Personal de Enfermería
            </strong>

            <span>
              Sesión activa
            </span>

          </div>

          <button
            type="button"
            onClick={onLogout}
            className="logout-button"
          >
            Cerrar sesión
          </button>

        </div>

      </div>

    </header>
  );
};

export default DashboardHeader;