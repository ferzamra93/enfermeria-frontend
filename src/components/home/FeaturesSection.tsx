import FeatureCard from "./FeatureCard";
import "./FeaturesSection.css";

const FeaturesSection = () => {
  return (
    <section className="features-section">

      <div className="features-container">

        <div className="section-heading">
          <p>FUNCIONALIDADES</p>

          <h2>
            ¿Qué puedes hacer?
          </h2>

          <span>
            Todas las herramientas que necesitas
            para gestionar el cuidado de tus pacientes.
          </span>
        </div>

        <div className="features-grid">

          <FeatureCard
            icon="👥"
            title="Gestión de Pacientes"
            description="Administra la información de tus pacientes de manera sencilla y organizada."
          />

          <FeatureCard
            icon="📋"
            title="Servicios de Enfermería"
            description="Registra y controla los servicios de enfermería realizados."
          />

          <FeatureCard
            icon="📅"
            title="Citas y Programación"
            description="Organiza tus citas y mantén un calendario de atención actualizado."
          />

          <FeatureCard
            icon="📊"
            title="Reportes y Estadísticas"
            description="Consulta información y estadísticas para mejorar la gestión."
          />

        </div>

      </div>

    </section>
  );
};

export default FeaturesSection;