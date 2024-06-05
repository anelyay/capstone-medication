import MedicationForm from "../../components/MedicationForm/MedicationForm";
import "./EditMedication.scss";

export default function EditMedication() {
  return (
    <MedicationForm
      className="edit-med"
      title="Edit Medication"
      buttonName="submit"
      buttonSecond="delete"
      // handleSecond={handleSecond}
    />
  );
}
