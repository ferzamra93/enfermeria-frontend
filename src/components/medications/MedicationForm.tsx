interface MedicationFormProps {
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
}

const MedicationForm = ({
  onSubmit,
}: MedicationFormProps) => {
  return (
    <form onSubmit={onSubmit}>

      <label>
        Medicamento

        <input
          name="medicine"
          placeholder="Ej. Paracetamol 500 mg"
          required
        />
      </label>

      <label>
        Dosis administradas

        <input
          name="doses"
          type="number"
          min="1"
          placeholder="Cantidad"
          required
        />
      </label>

      <button type="submit">
        Guardar reporte
      </button>

    </form>
  );
};

export default MedicationForm;