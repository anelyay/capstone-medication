import "./Patient.scss";
import MedicationCard from "../MedicationCard/MedicationCard";

export default function Patient() {
  return (
    <div className="patient">
      <h2 className="patient__title">For Anelya:</h2>
      <div className="patient__medlist">
        <MedicationCard />
        <MedicationCard />
        <MedicationCard />
        <MedicationCard />
        <MedicationCard />
        <MedicationCard />
      </div>
    </div>
  );
}
