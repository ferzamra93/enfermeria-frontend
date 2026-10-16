
import { useEffect, useState, type FormEvent } from "react";
import "./DashboardPage.css";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import MetricGrid from "../components/dashboard/MetricGrid";
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
  carnet: string;
}

interface AdminStudent {
  id: string;
  name: string;
  detail: string;
  carnet?: string;
  allergies?: string;
  active: boolean;
  [key: string]: unknown;
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

interface DashboardPageProps {
  onLogout: () => void;
}

const STUDENTS_KEY = "admin_students";
const MEDICATIONS_KEY = "nursing_medication_reports";
const CLINICAL_KEY = "nursing_clinical_entries";

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
};

const getActiveStudents = (): Student[] => {
  const adminStudents = readStorage<AdminStudent[]>(STUDENTS_KEY, []);

  return adminStudents
    .filter((student) => student.active)
    .map((student) => ({
      id: student.id,
      name: student.name,
      age: 0,
      grade: student.detail,
      allergies: student.allergies?.trim() || "Ninguna registrada",
      lastVisit: "Sin atenciones registradas",
      carnet: student.carnet || "",
    }));
};

const DashboardPage = ({ onLogout }: DashboardPageProps) => {
  const [students, setStudents] = useState<Student[]>(getActiveStudents);

  const [medicationReports, setMedicationReports] =
    useState<MedicationReport[]>(() =>
      readStorage<MedicationReport[]>(MEDICATIONS_KEY, [])
    );

  const [clinicalEntries, setClinicalEntries] =
    useState<ClinicalEntry[]>(() =>
      readStorage<ClinicalEntry[]>(CLINICAL_KEY, [])
    );

  const [selectedStudentId, setSelectedStudentId] = useState(
    () => getActiveStudents()[0]?.id ?? ""
  );

  const [studentSearch, setStudentSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(false);
  const [editName, setEditName] = useState("");
  const [editGrade, setEditGrade] = useState("");
  const [editAllergies, setEditAllergies] = useState("");

  useEffect(() => {
    localStorage.setItem(
      MEDICATIONS_KEY,
      JSON.stringify(medicationReports)
    );
  }, [medicationReports]);

  useEffect(() => {
    localStorage.setItem(CLINICAL_KEY, JSON.stringify(clinicalEntries));
  }, [clinicalEntries]);

  useEffect(() => {
    const refreshStudents = () => {
      const updatedStudents = getActiveStudents();
      setStudents(updatedStudents);

      setSelectedStudentId((currentId) => {
        if (updatedStudents.some((student) => student.id === currentId)) {
          return currentId;
        }
        return updatedStudents[0]?.id ?? "";
      });
    };

    window.addEventListener("storage", refreshStudents);

    return () => {
      window.removeEventListener("storage", refreshStudents);
    };
  }, []);

  const selectedStudent =
    students.find((student) => student.id === selectedStudentId) ?? null;

  const filteredStudents = students.filter((student) => {
    const search = studentSearch.trim().toLowerCase();

    return (
      student.name.toLowerCase().includes(search) ||
      student.grade.toLowerCase().includes(search) ||
      student.id.toLowerCase().includes(search) ||
      student.carnet.toLowerCase().includes(search)
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

  const startEditingStudent = () => {
    if (!selectedStudent) return;

    setEditName(selectedStudent.name);
    setEditGrade(selectedStudent.grade);
    setEditAllergies(
      selectedStudent.allergies === "Ninguna registrada"
        ? ""
        : selectedStudent.allergies
    );
    setEditingStudent(true);
  };

  const handleStudentEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedStudent || !editName.trim() || !editGrade.trim()) {
      window.alert("Completa el nombre y el curso del estudiante.");
      return;
    }

    const savedStudents = readStorage<AdminStudent[]>(STUDENTS_KEY, []);
    const studentExists = savedStudents.some(
      (student) => student.id === selectedStudent.id
    );

    if (!studentExists) {
      window.alert(
        "No se encontró el estudiante guardado. Actualiza la página e inténtalo de nuevo."
      );
      return;
    }

    const updatedStudents = savedStudents.map((student) =>
      student.id === selectedStudent.id
        ? {
            ...student,
            name: editName.trim(),
            detail: editGrade.trim(),
            allergies: editAllergies.trim() || "Ninguna registrada",
          }
        : student
    );

    localStorage.setItem(STUDENTS_KEY, JSON.stringify(updatedStudents));

    setStudents(getActiveStudents());
    setMedicationReports((current) =>
      current.map((report) =>
        report.studentId === selectedStudent.id
          ? { ...report, studentName: editName.trim() }
          : report
      )
    );
    setClinicalEntries((current) =>
      current.map((entry) =>
        entry.studentId === selectedStudent.id
          ? { ...entry, studentName: editName.trim() }
          : entry
      )
    );

    setEditingStudent(false);
    window.alert("Los datos del estudiante se actualizaron correctamente.");
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

    if (!medicine || !Number.isFinite(doses) || doses <= 0) {
      window.alert("Introduce el medicamento y una cantidad válida.");
      return;
    }

    const newReport: MedicationReport = {
      id: crypto.randomUUID(),
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
      window.alert("Completa el motivo y la nota clínica.");
      return;
    }

    const newEntry: ClinicalEntry = {
      id: crypto.randomUUID(),
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
            Consulta estudiantes registrados y gestiona sus reportes e
            historias clínicas.
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
            <h2>Estudiantes registrados</h2>

            <div className="student-search">
              <input
                type="text"
                placeholder="Buscar por nombre, curso, ID o carnet..."
                value={studentSearch}
                onChange={(event) => setStudentSearch(event.target.value)}
              />
            </div>

            {filteredStudents.length > 0 ? (
              <StudentList
                students={filteredStudents}
                selectedStudentId={selectedStudentId}
                onSelect={(id) => {
                  setSelectedStudentId(id);
                  setEditingStudent(false);
                }}
              />
            ) : (
              <div className="empty-state">
                <h3>
                  {students.length === 0
                    ? "No hay estudiantes activos"
                    : "No se encontraron estudiantes"}
                </h3>
                <p>
                  {students.length === 0
                    ? "El administrador debe registrar estudiantes y mantenerlos activos para que aparezcan aquí."
                    : "Prueba con otro nombre, curso o número de carnet."}
                </p>
              </div>
            )}
          </section>

          <section className="dashboard-details">
            {selectedStudent ? (
              <>
                <StudentDetails student={selectedStudent} />

                {!editingStudent ? (
                  <button
                    type="button"
                    className="admin-primary-button"
                    onClick={startEditingStudent}
                  >
                    Editar datos del estudiante
                  </button>
                ) : (
                  <form
                    className="admin-form"
                    onSubmit={handleStudentEditSubmit}
                  >
                    <h3>Editar estudiante</h3>

                    <label>
                      Nombre completo
                      <input
                        value={editName}
                        onChange={(event) => setEditName(event.target.value)}
                        required
                      />
                    </label>

                    <label>
                      Curso o nivel
                      <input
                        value={editGrade}
                        onChange={(event) => setEditGrade(event.target.value)}
                        required
                      />
                    </label>

                    <label>
                      Alergias
                      <textarea
                        value={editAllergies}
                        onChange={(event) =>
                          setEditAllergies(event.target.value)
                        }
                        rows={2}
                      />
                    </label>

                    <button className="admin-primary-button" type="submit">
                      Guardar cambios
                    </button>

                    <button
                      className="admin-action-button"
                      type="button"
                      onClick={() => setEditingStudent(false)}
                    >
                      Cancelar
                    </button>
                  </form>
                )}
              </>
            ) : (
              <div className="empty-state">
                <h3>Selecciona un estudiante</h3>
                <p>
                  Selecciona un estudiante para consultar sus datos y
                  registros.
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
                Estudiante seleccionado:{" "}
                <strong>{selectedStudent.name}</strong>
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
                Debes seleccionar un estudiante antes de registrar
                medicamentos o consultar sus reportes.
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
                  Selecciona un estudiante para consultar su historial
                  clínico.
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
