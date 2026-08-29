import MetricCard from "./MetricCard";

interface MetricGridProps {
  students: number;
  appointments: number;
  doses: number;
  histories: number;
}

const MetricGrid = ({
  students,
  appointments,
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
        value={appointments}
        title="Atenciones en calendario"
      />

      <MetricCard
        value={doses}
        title="Dosis administradas"
      />

      <MetricCard
        value={histories}
        title="Historias clínicas actualizadas"
      />

    </section>
  );
};

export default MetricGrid;