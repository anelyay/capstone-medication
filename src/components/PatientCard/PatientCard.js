import { Link, useNavigate } from "react-router-dom";
import "./PatientCard.scss";

export default function PatientUsers({ patient }) {
  const navigate = useNavigate();


  // const calculateAge = (dob) => {
  //   const dobDate = new Date(dob);
  //   const ageDiffMs = Date.now() - dobDate.getTime();
  //   const ageDate = new Date(ageDiffMs);
  //   return Math.abs(ageDate.getUTCFullYear() - 1970);
  // };

  // function formatDate(inputDate) {
  //   const months = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];

  //   const date = new Date(inputDate + "T00:00:00Z");
  //   const day = date.getUTCDate();
  //   const month = months[date.getUTCMonth()];
  //   const year = date.getUTCFullYear();

  //   return `${month} ${day}, ${year}`;
  // }

  const handleDetails = () => {
    navigate(`details/${patient.id}`)
  };

  return (
    <div className="user" onClick={handleDetails}>
      <Link to={`/${patient.id}`}>
        <h2 className="user__title">{patient.patient_name}</h2>
      </Link>
      {/* <div className="user__container">
        <div className="user__birth">
          <div className="user__box">
            <h3 className="user__label">Date of Birth:</h3>
            <p className="user__text">{formatDate(patient.patient_dob)}</p>
          </div>

          <div className="user__box">
            <h3 className="user__label">Age:</h3>
            <p className="user__text">
              {calculateAge(patient.patient_dob)} y.o.
            </p>
          </div>
        </div>

        <div className="user__wrap">
          <div className="user__info">
            <div className="user__box">
              <h3 className="user__label">Primary Doctor:</h3>
              <p className="user__text">{patient.patient_md}</p>
            </div>

            {patient.patient_allergy && (
              <div className="user__box">
                <h3 className="user__label">Allergies:</h3>
                <p className="user__text">{patient.patient_allergy}</p>
              </div>
            )}
          </div>
        </div>
        <div className="user__link">
          <p className="user__details">details</p>
        </div>
      </div> */}
    </div>
  );
}
