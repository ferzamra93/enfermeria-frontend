import type { FormEventHandler } from "react";

interface StudentFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const StudentForm = ({ onSubmit }: StudentFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        name="name"
        type="text"
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
        type="text"
        placeholder="Curso"
        required
      />

      <input
        name="allergies"
        type="text"
        placeholder="Alergias"
      />

      <button type="submit">Guardar estudiante</button>
    </form>
  );
};

export default StudentForm;