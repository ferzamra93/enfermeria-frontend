interface StudentFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const StudentForm = ({ onSubmit }: StudentFormProps) => {
  return (
    <form onSubmit={onSubmit}>

      <input
        name="name"
        placeholder="Nombre completo"
        required
      />

      <input
        name="age"
        type="number"
        min="1"
        placeholder="Edad"
        required
      />

      <input
        name="grade"
        placeholder="Curso"
        required
      />

      <input
        name="allergies"
        placeholder="Alergias"
      />

      <button type="submit">
        Guardar estudiante
      </button>

    </form>
  );
};

export default StudentForm;