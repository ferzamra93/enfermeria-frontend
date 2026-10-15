import { useState, type FormEvent } from "react";
import "./DashboardPage.css";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import MetricGrid from "../components/dashboard/MetricGrid";

import StudentForm from "../components/students/StudentForm";
import StudentList from "../components/students/StudentList";
import StudentDetails from "../components/students/StudentDetails";

import ClinicalForm from "../components/clinical/ClinicalForm";
import ClinicalHistory from "../components/clinical/ClinicalHistory";

import MedicationForm from "../components/medications/MedicationForm";
import MedicationList from "../components/medications/MedicationList";

interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  allergies: string;
  lastVisit: string;
}

interface MedicationReport {
  id: string;
  studentId: string;
  studentName: string;
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

const initialMedicationReports: MedicationReport[] = [
  {
    id: "REP-001",
    studentId: "EST-001",
    studentName: "María Fernanda López",
    medicine: "Paracetamol 500 mg",
    doses: 18,
    lastAdministered: "2026-08-24 09:10",
  },
  {
    id: "REP-002",
    studentId: "EST-014",
    studentName: "Carlos Daniel Rojas",
    medicine: "Sales de rehidratación oral",
    doses: 7,
    lastAdministered: "2026-08-23 11:35",
  },
  {
    id: "REP-003",
    studentId: "EST-027",
    studentName: "Lucía Camila Vargas",
    medicine: "Loratadina 10 mg",
    doses: 5,
    lastAdministered: "2026-08-22 08:45",
  },
];

interface DashboardPageProps {
  onLogout: () => void;
}

const DashboardPage = ({ onLogout }: DashboardPageProps) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const [medicationReports, setMedicationReports] =
    useState<MedicationReport[]>(initialMedicationReports);

  const [clinicalEntries, setClinicalEntries] =
    useState<ClinicalEntry[]>([]);

  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    initialStudents[0]?.id ?? ""
  );

  const [studentSearch, setStudentSearch] = useState("");

  const selectedStudent =
    students.find((student) => student.id === selectedStudentId) ?? null;

  const filteredStudents = students.filter((student) => {
    const search = studentSearch.trim().toLowerCase();

    return (
      student.name.toLowerCase().includes(search) ||
      student.grade.toLowerCase().includes(search) ||
      student.id.toLowerCase().includes(search)
    );
  });

  const studentMedicationReports = selectedStudent
    ? medicationReports.filter(
        (report) => report.studentId === selectedStudent.id
      )
    : [];

  const studentClinicalEntries = selectedStudent
    ? clinicalEntries.filter(
        (entry) => entry.studentId === selectedStudent.id
      )
    : [];

  const handleStudentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const age = Number(formData.get("age") ?? 0);
    const grade = String(formData.get("grade") ?? "").trim();
    const allergies = String(formData.get("allergies") ?? "").trim();

    if (!name || age <= 0 || !grade) {
      return;
    }

    const newStudent: Student = {
      id: `EST-${Date.now()}`,
      name,
      age,
      grade,
      allergies: allergies || "Ninguna registrada",
      lastVisit: new Date().toISOString().slice(0, 10),
    };

    setStudents((current) => [...current, newStudent]);
    setSelectedStudentId(newStudent.id);
    setStudentSearch("");
    form.reset();
  };

  const handleMedicationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedStudent) {
      window.alert("Selecciona un estudiante antes de guardar el reporte.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const medicine = String(formData.get("medicine") ?? "").trim();
    const doses = Number(formData.get("doses") ?? 0);

    if (!medicine || doses <= 0) {
      return;
    }

    const newReport: MedicationReport = {
      id: `REP-${Date.now()}`,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      medicine,
      doses,
      lastAdministered: new Date().toLocaleString("es-BO"),
    };

    setMedicationReports((current) => [...current, newReport]);
    form.reset();
  };

  const handleClinicalSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedStudent) {
      window.alert(
        "Selecciona un estudiante antes de añadir una nota clínica."
      );
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const reason = String(formData.get("reason") ?? "").trim();
    const note = String(formData.get("note") ?? "").trim();

    if (!reason || !note) {
      return;
    }

    const newEntry: ClinicalEntry = {
      id: `HIST-${Date.now()}`,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      date: new Date().toLocaleString("es-BO"),
      reason,
      note,
    };

    setClinicalEntries((current) => [...current, newEntry]);
    form.reset();
  };

  return (
    <div className="dashboard-page">
      <DashboardHeader onLogout={onLogout} />

      <main className="dashboard-container">
        <section className="dashboard-welcome">
          <p className="dashboard-label">PANEL DE ENFERMERÍA</p>

          <h1>Panel de control</h1>

          <p>
            Gestiona estudiantes, medicamentos e historias clínicas.
          </p>
        </section>

        <MetricGrid
          students={students.length}
          doses={medicationReports.reduce(
            (total, report) => total + report.doses,
            0
          )}
          histories={clinicalEntries.length}
        />

        <section className="dashboard-content">
          <section className="dashboard-students">
            <h2>Estudiantes</h2>

            <StudentForm onSubmit={handleStudentSubmit} />

            <div className="student-search">
              <input
                type="text"
                placeholder="Buscar estudiante por nombre, curso o ID..."
                value={studentSearch}
                onChange={(event) => setStudentSearch(event.target.value)}
              />
            </div>

            {filteredStudents.length > 0 ? (
              <StudentList
                students={filteredStudents}
                selectedStudentId={selectedStudentId}
                onSelect={setSelectedStudentId}
              />
            ) : (
              <div className="empty-state">
                <h3>No se encontraron estudiantes</h3>
                <p>Intenta buscar por nombre, curso o ID.</p>
              </div>
            )}
          </section>

          <section className="dashboard-details">
            {selectedStudent ? (
              <StudentDetails student={selectedStudent} />
            ) : (
              <div className="empty-state">
                <h3>Selecciona un estudiante</h3>
                <p>
                  Selecciona un estudiante para consultar sus datos y registros.
                </p>
              </div>
            )}
          </section>
        </section>

        <section className="dashboard-medication-section">
          <div className="dashboard-section-heading">
            <div>
              <p className="dashboard-section-label">
                REGISTRO DE ATENCIONES
              </p>
              <h2>Reporte de medicamentos</h2>
            </div>
          </div>

          {selectedStudent ? (
            <>
              <p>
                Estudiante seleccionado: <strong>{selectedStudent.name}</strong>
              </p>

              <div className="dashboard-medication-grid">
                <MedicationForm onSubmit={handleMedicationSubmit} />
                <MedicationList reports={studentMedicationReports} />
              </div>
            </>
          ) : (
            <div className="empty-state">
              <h3>Selecciona un estudiante</h3>
              <p>
                Debes seleccionar un estudiante antes de registrar medicamentos
                o consultar sus reportes.
              </p>
            </div>
          )}
        </section>

        <section className="dashboard-clinical">
          <section>
            <p className="dashboard-section-label">
              ATENCIÓN DE ENFERMERÍA
            </p>

            <h2>Registrar nota clínica</h2>

            {selectedStudent ? (
              <>
                <p>
                  Estudiante seleccionado:{" "}
                  <strong>{selectedStudent.name}</strong>
                </p>

                <ClinicalForm onSubmit={handleClinicalSubmit} />
              </>
            ) : (
              <div className="empty-state">
                <p>
                  Selecciona un estudiante para añadir notas a su historial
                  clínico.
                </p>
              </div>
            )}
          </section>

          <section>
            <p className="dashboard-section-label">
              REGISTROS DEL ESTUDIANTE
            </p>

            <h2>
              Historial clínico
              {selectedStudent ? ` · ${selectedStudent.name}` : ""}
            </h2>

            {selectedStudent ? (
              <ClinicalHistory entries={studentClinicalEntries} />
            ) : (
              <div className="empty-state">
                <p>
                  Selecciona un estudiante para consultar su historial clínico.
                </p>
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;