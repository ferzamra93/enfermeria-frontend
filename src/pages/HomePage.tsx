import { useEffect, useMemo, useState } from "react";
import type { FormEventHandler } from "react";

import { authRepository } from "../repositories/authRepository";

const DASHBOARD_STORAGE_KEY = "medical_dashboard_draft";

interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  allergies: string;
  lastVisit: string;
}

interface Appointment {
  time: string;
  student: string;
  reason: string;
  status: string;
}

interface MedicationReport {
  medicine: string;
  doses: number;
  lastAdministered: string;
}

interface ClinicalEntry {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  reason: string;
  note: string;
}

interface DashboardDraft {
  students: Student[];
  appointments: Appointment[];
  medicationReports: MedicationReport[];
  clinicalEntries: ClinicalEntry[];
}

const initialStudents: Student[] = [
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

const initialAppointments: Appointment[] = [
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

const initialMedicationReports: MedicationReport[] = [
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

const getInitialDraft = (): DashboardDraft => {
  const fallbackDraft: DashboardDraft = {
    students: initialStudents,
    appointments: initialAppointments,
    medicationReports: initialMedicationReports,
    clinicalEntries: [],
  };

  try {
    const storedDraft = sessionStorage.getItem(DASHBOARD_STORAGE_KEY);

    if (!storedDraft) {
      return fallbackDraft;
    }

    return JSON.parse(storedDraft) as DashboardDraft;
  } catch (error) {
    console.error("Error al leer los datos temporales del panel médico:", error);
    return fallbackDraft;
  }
};

const getToday = () => new Date().toISOString().slice(0, 10);
const getCurrentTime = () => new Date().toTimeString().slice(0, 5);
const getCurrentDateTime = () => new Date().toISOString().slice(0, 16).replace("T", " ");

interface HomePageProps {
  onLogout: () => void;
}

function HomePage({ onLogout }: HomePageProps) {
  const [dashboardDraft, setDashboardDraft] = useState(getInitialDraft);
  const [selectedStudentId, setSelectedStudentId] = useState(
    dashboardDraft.students[0]?.id ?? "",
  );
  const user = authRepository.getCurrentUser();

  const selectedStudent = useMemo(
    () =>
      dashboardDraft.students.find((student) => student.id === selectedStudentId) ??
      dashboardDraft.students[0],
    [dashboardDraft.students, selectedStudentId],
  );

  const selectedClinicalEntries = dashboardDraft.clinicalEntries.filter(
    (entry) => entry.studentId === selectedStudent?.id,
  );

  useEffect(() => {
    sessionStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(dashboardDraft));
  }, [dashboardDraft]);

  const handleLogout = () => {
    authRepository.logout();
    onLogout();
  };

  const handleStudentSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const age = Number(formData.get("age") ?? 0);
    const grade = String(formData.get("grade") ?? "").trim();
    const allergies = String(formData.get("allergies") ?? "").trim();

    if (!name || !age || !grade) {
      return;
    }

    const newStudent: Student = {
      id: `EST-${String(dashboardDraft.students.length + 1).padStart(3, "0")}`,
      name,
      age,
      grade,
      allergies: allergies || "Ninguna registrada",
      lastVisit: getToday(),
    };

    setDashboardDraft((currentDraft) => ({
      ...currentDraft,
      students: [...currentDraft.students, newStudent],
    }));
    setSelectedStudentId(newStudent.id);
    event.currentTarget.reset();
  };

  const handleClinicalSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!selectedStudent) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const reason = String(formData.get("reason") ?? "").trim();
    const note = String(formData.get("note") ?? "").trim();

    if (!reason || !note) {
      return;
    }

    const newEntry: ClinicalEntry = {
      id: crypto.randomUUID(),
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      date: getToday(),
      reason,
      note,
    };

    setDashboardDraft((currentDraft) => ({
      ...currentDraft,
      students: currentDraft.students.map((student) =>
        student.id === selectedStudent.id ? { ...student, lastVisit: getToday() } : student,
      ),
      appointments: [
        ...currentDraft.appointments,
        {
          time: getCurrentTime(),
          student: selectedStudent.name,
          reason,
          status: "Registrada",
        },
      ],
      clinicalEntries: [newEntry, ...currentDraft.clinicalEntries],
    }));
    event.currentTarget.reset();
  };

  const handleMedicationSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const medicine = String(formData.get("medicine") ?? "").trim();
    const doses = Number(formData.get("doses") ?? 0);

    if (!medicine || !doses) {
      return;
    }

    setDashboardDraft((currentDraft) => ({
      ...currentDraft,
      medicationReports: [
        { medicine, doses, lastAdministered: getCurrentDateTime() },
        ...currentDraft.medicationReports,
      ],
    }));
    event.currentTarget.reset();
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
          <small>Los datos nuevos se guardan temporalmente en este navegador.</small>
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
          <span>{dashboardDraft.students.length}</span>
          <p>Estudiantes registrados</p>
        </article>
        <article>
          <span>{dashboardDraft.appointments.length}</span>
          <p>Atenciones en calendario</p>
        </article>
        <article>
          <span>
            {dashboardDraft.medicationReports.reduce((total, report) => total + report.doses, 0)}
          </span>
          <p>Dosis administradas este mes</p>
        </article>
        <article>
          <span>{dashboardDraft.clinicalEntries.length}</span>
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
          </div>

          <form className="student-form" onSubmit={handleStudentSubmit}>
            <input name="name" placeholder="Nombre completo" required />
            <input name="age" type="number" min="1" placeholder="Edad" required />
            <input name="grade" placeholder="Curso" required />
            <input name="allergies" placeholder="Alergias" />
            <button type="submit">Guardar estudiante</button>
          </form>

          <div className="student-list">
            {dashboardDraft.students.map((student) => (
              <button
                className={student.id === selectedStudent?.id ? "active" : ""}
                key={student.id}
                type="button"
                onClick={() => setSelectedStudentId(student.id)}
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

        {selectedStudent && (
          <article className="panel">
            <p className="eyebrow">Paciente seleccionado</p>
            <h2>{selectedStudent.name}</h2>
            <dl className="clinical-summary">
              <div><dt>Código</dt><dd>{selectedStudent.id}</dd></div>
              <div><dt>Curso</dt><dd>{selectedStudent.grade}</dd></div>
              <div><dt>Alergias</dt><dd>{selectedStudent.allergies}</dd></div>
              <div>
                <dt>Fechas de consultas</dt>
                <dd>
                  {selectedClinicalEntries.length > 0
                    ? selectedClinicalEntries.map((entry) => entry.date).join(", ")
                    : selectedStudent.lastVisit}
                </dd>
              </div>
            </dl>

            <div className="history-list">
              <h3>Historial clínico local</h3>
              {selectedClinicalEntries.length > 0 ? (
                selectedClinicalEntries.map((entry) => (
                  <article key={entry.id}>
                    <strong>{entry.date} · {entry.reason}</strong>
                    <p>{entry.note}</p>
                  </article>
                ))
              ) : (
                <p>Aún no hay notas clínicas registradas para este paciente.</p>
              )}
            </div>
          </article>
        )}

        <article className="panel form-panel">
          <p className="eyebrow">Nueva atención</p>
          <h2>Registrar motivo e historial clínico</h2>
          <form onSubmit={handleClinicalSubmit}>
            <label>
              Motivo de consulta
              <input name="reason" placeholder="Ej. mareo durante educación física" required />
            </label>
            <label>
              Nota clínica del paciente
              <textarea
                name="note"
                placeholder="Signos vitales, antecedentes, diagnóstico y recomendaciones"
                required
              />
            </label>
            <button type="submit">Añadir al historial clínico</button>
          </form>
        </article>

        <article className="panel">
          <p className="eyebrow">Calendario</p>
          <h2>Atenciones programadas</h2>
          <ul className="timeline">
            {dashboardDraft.appointments.map((appointment) => (
              <li key={`${appointment.time}-${appointment.student}-${appointment.reason}`}>
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

        <article className="panel form-panel">
          <p className="eyebrow">Reportes</p>
          <h2>Medicamentos administrados</h2>
          <form onSubmit={handleMedicationSubmit}>
            <label>
              Medicamento
              <input name="medicine" placeholder="Ej. Paracetamol 500 mg" required />
            </label>
            <label>
              Dosis administradas
              <input name="doses" type="number" min="1" placeholder="Cantidad" required />
            </label>
            <button type="submit">Guardar reporte</button>
          </form>
          <ul className="medication-list">
            {dashboardDraft.medicationReports.map((report) => (
              <li key={`${report.medicine}-${report.lastAdministered}`}>
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
