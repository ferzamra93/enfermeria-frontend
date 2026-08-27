import { useState } from "react";

import { authRepository } from "../repositories/authRepository";

const students = [
  {
    id: "EST-001",
    name: "María Fernanda López",
    age: 16,
    grade: "5º Secundaria",
    allergies: "Penicilina",
    lastVisit: "2026-08-24",
  },
  {
    id: "EST-014",
    name: "Carlos Daniel Rojas",
    age: 15,
    grade: "4º Secundaria",
    allergies: "Ninguna registrada",
    lastVisit: "2026-08-20",
  },
  {
    id: "EST-027",
    name: "Lucía Camila Vargas",
    age: 17,
    grade: "6º Secundaria",
    allergies: "Ibuprofeno",
    lastVisit: "2026-08-18",
  },
];

const appointments = [
  {
    time: "08:30",
    student: "María Fernanda López",
    reason: "Control posterior a medicación",
    status: "Pendiente",
  },
  {
    time: "10:00",
    student: "Carlos Daniel Rojas",
    reason: "Dolor de cabeza recurrente",
    status: "En espera",
  },
  {
    time: "12:15",
    student: "Lucía Camila Vargas",
    reason: "Revisión de historial clínico",
    status: "Confirmada",
  },
];

const medicationReports = [
  {
    medicine: "Paracetamol 500 mg",
    doses: 18,
    lastAdministered: "2026-08-24 09:10",
  },
  {
    medicine: "Sales de rehidratación oral",
    doses: 7,
    lastAdministered: "2026-08-23 11:35",
  },
  {
    medicine: "Loratadina 10 mg",
    doses: 5,
    lastAdministered: "2026-08-22 08:45",
  },
];

interface HomePageProps {
  onLogout: () => void;
}

function HomePage({ onLogout }: HomePageProps) {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const user = authRepository.getCurrentUser();

  const handleLogout = () => {
    authRepository.logout();
    onLogout();
  };

  return (
    <main className="dashboard-shell">
      <header className="dashboard-hero">
        <div>
          <p className="eyebrow">Panel médico escolar</p>
          <h1>Gestión clínica de estudiantes</h1>
          <p>
            Registre estudiantes, documente motivos de atención, administre el
            historial clínico por paciente y consulte reportes de medicamentos.
          </p>
        </div>

        {user && (
          <section className="session-card" aria-label="Sesión activa">
            <span>Usuario médico</span>
            <strong>{user.name}</strong>
            <small>Carnet: {user.carnet}</small>
            <button type="button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </section>
        )}
      </header>

      <section className="metric-grid" aria-label="Resumen de actividad">
        <article>
          <span>{students.length}</span>
          <p>Estudiantes registrados</p>
        </article>
        <article>
          <span>{appointments.length}</span>
          <p>Atenciones en calendario</p>
        </article>
        <article>
          <span>30</span>
          <p>Dosis administradas este mes</p>
        </article>
        <article>
          <span>12</span>
          <p>Historias clínicas actualizadas</p>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="panel wide-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Registro</p>
              <h2>Datos de estudiantes</h2>
            </div>
            <button type="button">Registrar estudiante</button>
          </div>

          <div className="student-list">
            {students.map((student) => (
              <button
                className={student.id === selectedStudent.id ? "active" : ""}
                key={student.id}
                type="button"
                onClick={() => setSelectedStudent(student)}
              >
                <strong>{student.name}</strong>
                <span>
                  {student.grade} · {student.age} años · Última consulta:{" "}
                  {student.lastVisit}
                </span>
              </button>
            ))}
          </div>
        </article>

        <article className="panel">
          <p className="eyebrow">Paciente seleccionado</p>
          <h2>{selectedStudent.name}</h2>
          <dl className="clinical-summary">
            <div><dt>Código</dt><dd>{selectedStudent.id}</dd></div>
            <div><dt>Curso</dt><dd>{selectedStudent.grade}</dd></div>
            <div><dt>Alergias</dt><dd>{selectedStudent.allergies}</dd></div>
            <div><dt>Fechas de consultas</dt><dd>18/08, 20/08, 24/08</dd></div>
          </dl>
        </article>

        <article className="panel form-panel">
          <p className="eyebrow">Nueva atención</p>
          <h2>Registrar motivo e historial clínico</h2>
          <form>
            <label>
              Motivo de consulta
              <input placeholder="Ej. mareo durante educación física" />
            </label>
            <label>
              Nota clínica del paciente
              <textarea placeholder="Signos vitales, antecedentes, diagnóstico y recomendaciones" />
            </label>
            <button type="button">Añadir al historial clínico</button>
          </form>
        </article>

        <article className="panel">
          <p className="eyebrow">Calendario</p>
          <h2>Atenciones programadas</h2>
          <ul className="timeline">
            {appointments.map((appointment) => (
              <li key={`${appointment.time}-${appointment.student}`}>
                <time>{appointment.time}</time>
                <div>
                  <strong>{appointment.student}</strong>
                  <span>{appointment.reason}</span>
                </div>
                <em>{appointment.status}</em>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <p className="eyebrow">Reportes</p>
          <h2>Medicamentos administrados</h2>
          <ul className="medication-list">
            {medicationReports.map((report) => (
              <li key={report.medicine}>
                <strong>{report.medicine}</strong>
                <span>{report.doses} dosis · Última: {report.lastAdministered}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}

export default HomePage;
