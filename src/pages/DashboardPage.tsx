
import React, { useState } from "react";

import "./DashboardPage.css";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import MetricGrid from "../components/dashboard/MetricGrid";

import StudentForm from "../components/students/StudentForm";
import StudentList from "../components/students/StudentList";
import StudentDetails from "../components/students/StudentDetails";

import ClinicalForm from "../components/clinical/ClinicalForm";
import ClinicalHistory from "../components/clinical/ClinicalHistory";

import AppointmentList from "../components/appointments/AppointmentList";

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

interface DashboardPageProps {
  onLogout: () => void;
}

const DashboardPage = ({
  onLogout,
}: DashboardPageProps) => {
  const [students, setStudents] =
    useState<Student[]>(initialStudents);

  const [appointments] =
    useState<Appointment[]>(initialAppointments);

  const [medicationReports, setMedicationReports] =
    useState<MedicationReport[]>(
      initialMedicationReports
    );

  const [clinicalEntries, setClinicalEntries] =
    useState<ClinicalEntry[]>([]);

  const [selectedStudentId, setSelectedStudentId] =
    useState<string>(
      initialStudents[0]?.id ?? ""
    );

  const [studentSearch, setStudentSearch] =
    useState("");

  const selectedStudent =
    students.find(
      (student) =>
        student.id === selectedStudentId
    ) ?? null;

  const filteredStudents = students.filter(
    (student) => {
      const search =
        studentSearch.toLowerCase().trim();

      return (
        student.name
          .toLowerCase()
          .includes(search) ||
        student.grade
          .toLowerCase()
          .includes(search) ||
        student.id
          .toLowerCase()
          .includes(search)
      );
    }
  );

  const handleLogout = () => {
    onLogout();
  };

  const handleStudentSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget
    );

    const name =
      String(
        formData.get("name") ?? ""
      ).trim();

    const age =
      Number(
        formData.get("age") ?? 0
      );

    const grade =
      String(
        formData.get("grade") ?? ""
      ).trim();

    const allergies =
      String(
        formData.get("allergies") ?? ""
      ).trim();

    if (!name || !age || !grade) {
      return;
    }

    const newStudent: Student = {
      id: `EST-${String(
        students.length + 1
      ).padStart(3, "0")}`,
      name,
      age,
      grade,
      allergies:
        allergies ||
        "Ninguna registrada",
      lastVisit:
        new Date()
          .toISOString()
          .slice(0, 10),
    };

    setStudents(
      (currentStudents) => [
        ...currentStudents,
        newStudent,
      ]
    );

    setSelectedStudentId(
      newStudent.id
    );

    event.currentTarget.reset();
  };

  const handleMedicationSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget
    );

    const medicine =
      String(
        formData.get("medicine") ?? ""
      ).trim();

    const doses =
      Number(
        formData.get("doses") ?? 0
      );

    if (!medicine || !doses) {
      return;
    }

    const newReport: MedicationReport = {
      medicine,
      doses,
      lastAdministered:
        new Date().toLocaleString(
          "es-BO"
        ),
    };

    setMedicationReports(
      (currentReports) => [
        ...currentReports,
        newReport,
      ]
    );

    event.currentTarget.reset();
  };

  const handleClinicalSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget
    );

    const reason =
      String(
        formData.get("reason") ?? ""
      ).trim();

    const note =
      String(
        formData.get("note") ?? ""
      ).trim();

    if (!reason || !note) {
      return;
    }

    if (!selectedStudent) {
      alert(
        "Selecciona un estudiante antes de agregar el historial clínico."
      );
      return;
    }

    const newEntry: ClinicalEntry = {
      id: `HIST-${String(
        clinicalEntries.length + 1
      ).padStart(3, "0")}`,
      studentId:
        selectedStudent.id,
      studentName:
        selectedStudent.name,
      date:
        new Date().toLocaleString(
          "es-BO"
        ),
      reason,
      note,
    };

    setClinicalEntries(
      (currentEntries) => [
        ...currentEntries,
        newEntry,
      ]
    );

    event.currentTarget.reset();
  };

  return (
    <div className="dashboard-page">
      <DashboardHeader
        onLogout={handleLogout}
      />

      <main className="dashboard-container">
        <section className="dashboard-welcome">
          <p className="dashboard-label">
            PANEL DE ENFERMERÍA
          </p>

          <h1>
            Panel de control
          </h1>

          <p>
            Gestiona estudiantes,
            atenciones, medicamentos
            e historias clínicas.
          </p>
        </section>

        <MetricGrid
          students={students.length}
          appointments={
            appointments.length
          }
          doses={medicationReports.reduce(
            (
              total,
              report
            ) =>
              total +
              report.doses,
            0
          )}
          histories={
            clinicalEntries.length
          }
        />

        <section className="dashboard-content">
          <section className="dashboard-students">
            <h2>
              Estudiantes
            </h2>

            <StudentForm
              onSubmit={
                handleStudentSubmit
              }
            />

            <div className="student-search">
              <input
                type="text"
                placeholder="Buscar estudiante..."
                value={
                  studentSearch
                }
                onChange={(event) =>
                  setStudentSearch(
                    event.target.value
                  )
                }
              />
            </div>

            {filteredStudents.length >
            0 ? (
              <StudentList
                students={
                  filteredStudents
                }
                selectedStudentId={
                  selectedStudentId
                }
                onSelect={
                  setSelectedStudentId
                }
              />
            ) : (
              <div className="empty-state">
                <h3>
                  No se encontraron estudiantes
                </h3>

                <p>
                  Intenta buscar por
                  nombre, curso o ID.
                </p>
              </div>
            )}
          </section>

          <section className="dashboard-details">
            {selectedStudent ? (
              <StudentDetails
                student={
                  selectedStudent
                }
              />
            ) : (
              <div className="empty-state">
                <h3>
                  Selecciona un estudiante
                </h3>

                <p>
                  Selecciona un
                  estudiante de la
                  lista para ver sus
                  datos.
                </p>
              </div>
            )}
          </section>
        </section>

        <section className="dashboard-secondary">
          <AppointmentList
            appointments={
              appointments
            }
          />

          <section className="dashboard-medications">
            <MedicationForm
              onSubmit={
                handleMedicationSubmit
              }
            />

            <MedicationList
              reports={
                medicationReports
              }
            />
          </section>
        </section>

        <section className="dashboard-clinical">
          <ClinicalForm
            onSubmit={
              handleClinicalSubmit
            }
          />

          <ClinicalHistory
            entries={
              clinicalEntries
            }
          />
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
