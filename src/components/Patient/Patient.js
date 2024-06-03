import "./Patient.scss";
import MedicationCard from "../MedicationCard/MedicationCard";
import { useNavigate } from "react-router-dom";

export default function Patient() {
  const navigate = useNavigate();

  const handleClick = (event) => {
    navigate("/medication/add");
  };
  return (
    <div className="patient">
      <h2 className="patient__title">For Anelya:</h2>
      <div className="patient__medlist">
        <MedicationCard />
        <MedicationCard />
        <MedicationCard />
        <MedicationCard />
        <MedicationCard />
      </div>
      <button className="patient__button" onClick={handleClick}>
        add a new medication
      </button>
    </div>
  );
}
