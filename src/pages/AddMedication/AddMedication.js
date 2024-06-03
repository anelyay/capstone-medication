import { useNavigate } from "react-router-dom";
import MedicationForm from "../../components/MedicationForm/MedicationForm";
import "./AddMedication.scss";

export default function AddMedication() {
  const navigate = useNavigate();

  const handleSecond = (event) => {
    navigate("/");
  };

  return (
    <MedicationForm
      className="add-med"
      title="Add Medication"
      buttonName="add"
      buttonSecond="go back"
      handleSecond={handleSecond}
    />
  );
}
