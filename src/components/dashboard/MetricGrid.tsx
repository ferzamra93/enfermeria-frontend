
import MetricCard from "./MetricCard";

interface MetricGridProps {
  students: number;
  doses: number;
  histories: number;
}

const MetricGrid = ({
  students,
  doses,
  histories,
}: MetricGridProps) => {
  return (
    <section className="metric-grid">
      <MetricCard
        value={students}
        title="Estudiantes registrados"
      />

      <MetricCard
        value={doses}
        title="Dosis administradas"
      />

      <MetricCard
        value={histories}
        title="Historias clínicas registradas"
      />
    </section>
  );
};

export default MetricGrid;
