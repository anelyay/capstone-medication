import { useNavigate } from "react-router-dom";
import "./PatientUsers.scss";

export default function PatientUsers({patient}) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    navigate("id/edit");
  };

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const ageDiffMs = Date.now() - dobDate.getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="user">
      <h2 className="user__title">{patient.patient_name}</h2>
      <div className="user__container">
        <h3 className="user__label">Date of Birth: {patient.patient_dob}</h3>
        <h3 className="user__label">Age: {calculateAge(patient.patient_dob)} years</h3>
        <h3 className="user__label">Primary Doctor: {patient.patient_md}</h3>
        <h3 className="user__label">Allergies: {patient.patient_allergy}</h3>
      </div>
      <h3 className="user__link" onClick={handleClick}>
        edit a profile
      </h3>
      {/* <h3 className="user__link">Past Medications</h3> */}
    </div>
  );
}
