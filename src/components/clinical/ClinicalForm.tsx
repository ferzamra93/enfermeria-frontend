import type { FormEventHandler } from "react";

interface ClinicalFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const ClinicalForm = ({ onSubmit }: ClinicalFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Motivo de consulta
        <input
          name="reason"
          type="text"
          placeholder="Motivo de consulta"
          required
        />
      </label>

      <label>
        Nota clínica
        <textarea
          name="note"
          placeholder="Escriba la nota clínica"
          required
        />
      </label>

      <button type="submit">Añadir al historial clínico</button>
    </form>
  );
};

export default ClinicalForm;