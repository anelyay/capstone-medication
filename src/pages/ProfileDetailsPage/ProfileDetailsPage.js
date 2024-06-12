import "./ProfileDetailsPage.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PatientAPI from "../../classes/patientAPI";
import otterMed from "../../assets/images/otterholdspill.png";

export default function ProfileDetailsPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState();
  const [medications, setMedications] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const patientData = await PatientAPI.getSinglePatient(id);
        console.log(patientData);
        setPatient(patientData);
      } catch (error) {
        console.error("Unable to get a patient", error);
        setError("Unable to get patient details.");
      }
    };

    const getMedications = async () => {
      try {
        const medData = await PatientAPI.findMedicationsByPatient(id);
        console.log(medData);
        setMedications(medData);
      } catch (error) {
        console.error(
          "Unable to get medications for patient with that id",
          error
        );
        setError("Unable to get medications.");
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await getUser();
      await getMedications();
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleBack = () => {
    navigate("/profile");
  };

  const navigateEdit = () => {
    navigate(`/profile/${patient.id}/edit`);
  };

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const ageDiffMs = Date.now() - dobDate.getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  function formatDateTimestamp(dateString) {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

  function formatDate(inputDate) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(inputDate + "T00:00:00Z");
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${month} ${day}, ${year}`;
  }

  if (loading) return <div>Loading...</div>;

//   const handleNavigate = () => {
//     navigate(`medication/${med.med_id}`);
//   };

  return (
    <div className="details">
      <div className="details__card">
        <div className="details__title-box">
          <h2 className="details__title">{patient.patient_name}</h2>
        </div>

        <div className="details__wrap">
          <div className="details__box">
            <h3 className="details__heading">Date of Birth:</h3>
            <p className="details__text">{formatDate(patient.patient_dob)}</p>
          </div>
          <div className="details__box">
            <h3 className="details__heading">Age:</h3>
            <p className="details__text">
              {calculateAge(patient.patient_dob)} years old
            </p>
          </div>
        </div>

        <div className="details__wrap">
          <div className="details__box">
            <h3 className="details__heading">Allergies:</h3>
            <p className="details__text">{patient.patient_allergy}</p>
          </div>

          <div className="details__box">
            <h3 className="details__heading">Primary Doctor:</h3>
            <p className="details__text">{patient.patient_md}</p>
          </div>
        </div>

        <div className="details__box-log">
          <h2 className="details__header">All Medications</h2>
          <div className="details__headerbox">
            <h3 className="details__heading">added on:</h3>
            <h3 className="details__heading-main">name:</h3>
            <h3 className="details__heading">quantity:</h3>
          </div>
          <div className="details__wrapper">
            {medications.map((med, index) => (
              <div className="details__wrapping" key={index}>
                <p className="details__text-med">
                  {formatDateTimestamp(med.created_at)}
                </p>
                <p
                  className="details__text-name"
                  onClick={() =>navigate(`/medication/${med.id}`)
                  }
                >
                  {med.med_name}
                </p>
                <p className="details__text-med">{med.quantity}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="details__picture">
          <img
            src={otterMed}
            alt="otter with a pill"
            className="details__image"
          />
        </div>
      </div>
      <div className="details__buttons">
        <button type="button" className="details__button" onClick={handleBack}>
          go back
        </button>
        <button
          type="button"
          className="details__button"
          onClick={navigateEdit}
        >
          edit
        </button>
      </div>
    </div>
  );
}
