interface MedicationReport {
  id: string;
  studentId: string;
  studentName: string;
  medicine: string;
  doses: number;
  lastAdministered: string;
}

interface MedicationListProps {
  reports: MedicationReport[];
}

const MedicationList = ({ reports }: MedicationListProps) => {
  return (
    <section>
      <h2>Medicamentos administrados</h2>

      {reports.length === 0 ? (
        <p>No hay reportes de medicamentos para este estudiante.</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li key={report.id}>
              <strong>{report.medicine}</strong>
              <span>{report.doses} dosis</span>
              <small>Última: {report.lastAdministered}</small>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MedicationList;