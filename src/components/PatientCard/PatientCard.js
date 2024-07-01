import { Link, useNavigate } from "react-router-dom";
import "./PatientCard.scss";

export default function PatientUsers({ patient }) {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`details/${patient.id}`)
  };
  return (
    <div className="user" onClick={handleDetails}>
      <Link to={`/${patient.id}`}>
        <h2 className="user__title">{patient.patient_name}</h2>
      </Link>
    </div>
  );
}
