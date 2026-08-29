interface MedicationReport {
  medicine: string;
  doses: number;
  lastAdministered: string;
}

interface MedicationListProps {
  reports: MedicationReport[];
}

const MedicationList = ({
  reports,
}: MedicationListProps) => {
  return (
    <section>

      <h2>
        Medicamentos administrados
      </h2>

      <ul>

        {reports.map((report) => (

          <li
            key={`${report.medicine}-${report.lastAdministered}`}
          >

            <strong>
              {report.medicine}
            </strong>

            <span>
              {report.doses} dosis
            </span>

            <small>
              Última: {report.lastAdministered}
            </small>

          </li>

        ))}

      </ul>

    </section>
  );
};

export default MedicationList;