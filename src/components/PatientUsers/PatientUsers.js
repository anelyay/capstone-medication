import "./PatientUsers.scss";

export default function PatientUsers() {
  return (
    <div className="user">
      <h2 className="user__title">Lady Cat</h2>
      <div className="user__container">
        <h3 className="user__label">Date of Birth: 17.12.2012</h3>
        <h3 className="user__label">Age: 11 years old</h3>
        <h3 className="user__label">Primary Doctor: Dr. Meow</h3>
        <h3 className="user__label">Allergies: NKDA</h3>
      </div>
      <h3 className="user__link">Past Medications</h3>
    </div>
  );
}
