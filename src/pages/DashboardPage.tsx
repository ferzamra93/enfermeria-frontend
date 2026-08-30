import { useState } from "react";
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


// ===============================
// TIPOS
// ===============================

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


// ===============================
// DATOS INICIALES
// ===============================

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


// ===============================
// PROPS
// ===============================

interface DashboardPageProps {
  onLogout: () => void;
}


// ===============================
// COMPONENTE
// ===============================

const DashboardPage = ({
  onLogout,
}: DashboardPageProps) => {

  // =============================
  // ESTADOS
  // =============================

  const [students, setStudents] =
    useState<Student[]>(initialStudents);

  const [appointments] =
    useState<Appointment[]>(initialAppointments);

  const [medicationReports] =
    useState<MedicationReport[]>(
      initialMedicationReports
    );

  const [clinicalEntries] =
    useState<ClinicalEntry[]>([]);

  const [selectedStudentId, setSelectedStudentId] =
    useState<string>(
      initialStudents[0]?.id ?? ""
    );


  // =============================
  // ESTUDIANTE SELECCIONADO
  // =============================

  const selectedStudent =
    students.find(
      (student) =>
        student.id === selectedStudentId
    ) ?? null;


  // =============================
  // CERRAR SESIÓN
  // =============================

  const handleLogout = () => {
    onLogout();
  };


  // =============================
  // AGREGAR ESTUDIANTE
  // =============================

  const handleStudentSubmit = () => {

    // Por ahora dejamos esta función
    // preparada para conectar el formulario.

    console.log(
      "Formulario de estudiante enviado"
    );
  };


  // =============================
  // AGREGAR HISTORIAL CLÍNICO
  // =============================

  const handleClinicalSubmit = () => {

    console.log(
      "Formulario clínico enviado"
    );
  };


  // =============================
  // RENDER
  // =============================

  return (
    <div className="dashboard-page">

      {/* =========================
          HEADER
      ========================== */}

      <DashboardHeader
        onLogout={handleLogout}
      />


      <main className="dashboard-container">

        {/* =========================
            BIENVENIDA
        ========================== */}

        <section className="dashboard-welcome">

          <p className="dashboard-label">
            PANEL DE ENFERMERÍA
          </p>

          <h1>
            Panel de control
          </h1>

          <p>
            Gestiona estudiantes, atenciones,
            medicamentos e historias clínicas.
          </p>

        </section>


        {/* =========================
            MÉTRICAS
        ========================== */}

        <MetricGrid
          students={students.length}
          appointments={appointments.length}
          doses={medicationReports.reduce(
            (total, report) =>
              total + report.doses,
            0
          )}
          histories={clinicalEntries.length}
        />


        {/* =========================
            ESTUDIANTES
        ========================== */}

        <section className="dashboard-content">

          <section className="dashboard-students">

            <h2>
              Estudiantes
            </h2>

            <StudentForm
              onSubmit={handleStudentSubmit}
            />

            <StudentList
              students={students}
              selectedStudentId={
                selectedStudentId
              }
              onSelect={
                setSelectedStudentId
              }
            />

          </section>


          {/* =======================
              DETALLES DEL ESTUDIANTE
          ======================== */}

          <section className="dashboard-details">

            {selectedStudent ? (

              <StudentDetails
                student={selectedStudent}
              />

            ) : (

              <div className="empty-state">

                <h3>
                  Selecciona un estudiante
                </h3>

                <p>
                  Selecciona un estudiante
                  de la lista para ver sus
                  datos.
                </p>

              </div>

            )}

          </section>

        </section>


        {/* =========================
            CITAS Y MEDICAMENTOS
        ========================== */}

        <section className="dashboard-secondary">

            <AppointmentList
                appointments={appointments}
            />

            <section className="dashboard-medications">

                <MedicationForm
                onSubmit={() => {
                    console.log("Medicamento registrado");
                }}
                />

                <MedicationList
                reports={medicationReports}
                />

            </section>

        </section>


        {/* =========================
            HISTORIAL CLÍNICO
        ========================== */}

        <section className="dashboard-clinical">

          <ClinicalForm
            onSubmit={handleClinicalSubmit}
          />

          <ClinicalHistory
            entries={clinicalEntries}
          />

        </section>

      </main>

    </div>
  );
};


export default DashboardPage;