interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  allergies: string;
  lastVisit: string;
}

interface StudentListProps {
  students: Student[];
  selectedStudentId: string;
  onSelect: (id: string) => void;
}

const StudentList = ({
  students,
  selectedStudentId,
  onSelect,
}: StudentListProps) => {
  return (
    <div className="student-list">

      {students.map((student) => (

        <button
          key={student.id}
          type="button"
          className={
            student.id === selectedStudentId
              ? "active"
              : ""
          }
          onClick={() => onSelect(student.id)}
        >

          <strong>
            {student.name}
          </strong>

          <span>
            {student.grade} · {student.age} años
          </span>

        </button>

      ))}

    </div>
  );
};

export default StudentList;