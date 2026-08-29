interface StudentDetailsProps {
  student: {
    id: string;
    name: string;
    age: number;
    grade: string;
    allergies: string;
    lastVisit: string;
  };
}

const StudentDetails = ({ student }: StudentDetailsProps) => {
  return (
    <section className="student-details">

      <p>Paciente seleccionado</p>

      <h2>{student.name}</h2>

      <p>
        Código: {student.id}
      </p>

      <p>
        Curso: {student.grade}
      </p>

      <p>
        Edad: {student.age} años
      </p>

      <p>
        Alergias: {student.allergies}
      </p>

      <p>
        Última consulta: {student.lastVisit}
      </p>

    </section>
  );
};

export default StudentDetails;