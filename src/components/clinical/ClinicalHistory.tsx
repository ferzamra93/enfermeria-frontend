interface ClinicalEntry {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  reason: string;
  note: string;
}

interface ClinicalHistoryProps {
  entries: ClinicalEntry[];
}

const ClinicalHistory = ({ entries }: ClinicalHistoryProps) => {
  return (
    <section>
      <h3>Historial clínico</h3>

      {entries.length === 0 ? (
        <p>No hay notas clínicas registradas para este estudiante.</p>
      ) : (
        entries.map((entry) => (
          <article key={entry.id}>
            <strong>
              {entry.date} · {entry.reason}
            </strong>

            <p>{entry.note}</p>
          </article>
        ))
      )}
    </section>
  );
};

export default ClinicalHistory;