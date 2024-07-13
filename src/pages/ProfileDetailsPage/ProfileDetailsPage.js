import "./ProfileDetailsPage.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PatientAPI from "../../classes/patientAPI";
// import otterMed from "../../assets/images/otterholdspill.png";
import moment from "moment-timezone";
import Spinner from "../../components/Spinner/Spinner";


export default function ProfileDetailsPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [medications, setMedications] = useState([]);
  const [patientError, setPatientError] = useState(null);
  const [medError, setMedError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const patientData = await PatientAPI.getSinglePatient(id);
        setPatient(patientData);
      } catch (error) {
        console.error("Unable to get a patient", error);
        setPatientError("Unable to get patient details.");
      }
    };

    const getMedications = async () => {
      try {
        const medData = await PatientAPI.findMedicationsByPatient(id);
        const uniqueMedications = medData.filter(
          (medication, index, self) =>
            index === self.findIndex((m) => m.med_name === medication.med_name)
        );
        setMedications(uniqueMedications);
      } catch (error) {
        console.error(
          "Unable to get medications for patient with that id",
          error
        );
        setMedError("Unable to get medications.");
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
    if (patient) {
      navigate(`/profile/${patient.id}/edit`);
    } else {
      console.error("Patient data is not loaded yet.");
    }
  };

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const ageDiffMs = Date.now() - dobDate.getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

   const formatDateTimestamp = (timestamp) => {
     return moment(timestamp).format("MMM DD, YYYY"); //local to user
   };


  const handleAdd = () => {
    navigate(`/medication/${id}/add`);
  };

  if (loading) return <Spinner/>;
  if (patientError) return <div>{patientError}</div>;

  return (
    <div className="details">
      <div className="details__title-box">
        <h2 className="details__title">{patient.patient_name}`s Information</h2>
      </div>
      <div className="details__card">
        <div className="details__bigbox">
          <div className="details__topbox">
            <h3 className="details__header">Details</h3>

            <div className="details__wrap">
              <div className="details__box">
                <h3 className="details__heading">Date of Birth:</h3>
                <p className="details__text">
                  {moment(patient.patient_dob).format("MMM DD, YYYY")}
                </p>
              </div>
              <div className="details__box details__box-age">
                <h3 className="details__heading">Age:</h3>
                <p className="details__text">
                  {calculateAge(patient.patient_dob)} years old
                </p>
              </div>
            </div>

            <div className="details__wrap">
              <div className="details__box">
                <h3 className="details__heading">Allergies:</h3>
                <p className="details__text">
                  {patient.patient_allergy ? patient.patient_allergy : "NKDA"}
                </p>
              </div>

              <div className="details__box">
                <h3 className="details__heading">Primary Doctor:</h3>
                <p className="details__text">{patient.patient_md}</p>
              </div>
            </div>

            <div className="details__buttonbox">
              <button
                type="button"
                className="details__button"
                onClick={navigateEdit}
              >
                edit
              </button>
            </div>
          </div>

          <div className="details__box-log">
            <h2 className="details__header">Medications</h2>

            {!medError && (
              <>
                <div className="details__headerbox">
                  <h3 className="details__heading">Added on:</h3>
                  <h3 className="details__heading-main">Name:</h3>
                  <h3 className="details__heading">Quantity:</h3>
                </div>
              </>
            )}

            <div className="details__wrapper">
              {medError ? (
                <p className="details__text-med">
                  No medications yet
                </p>
              ) : medications.length > 0 ? (
                medications.map((med, index) => (
                  <div className="details__wrapping" key={index}>
                    <p className="details__text-med">
                      {formatDateTimestamp(med.created_at)}
                    </p>
                    <p
                      className="details__text-name"
                      onClick={() => navigate(`/medication/${med.id}`)}
                    >
                      {med.med_name}
                    </p>
                    <p className="details__text-med details__text-number">
                      {med.quantity}
                    </p>
                  </div>
                ))
              ) : (
                <p className="details__text-med">No medications yet</p>
              )}
            </div>

            <div className="details__buttonbox">
              <button
                type="button"
                className="details__button"
                onClick={handleAdd}
              >
                add a pill
              </button>
            </div>
          </div>
        </div>

        <div className="details__tabletbuttons">
          <button
            type="button"
            className="details__button-tablet"
            onClick={navigateEdit}
          >
            edit
          </button>
          <button
            type="button"
            className="details__button-tablet"
            onClick={handleAdd}
          >
            add a pill
          </button>
        </div>

        {/* <div className="details__picture">
          <img
            src={otterMed}
            alt="otter with a pill"
            className="details__image"
          />
        </div> */}
      </div>
      <div className="details__buttons">
        <button
          type="button"
          className="details__button details__button--back"
          onClick={handleBack}
        >
          go back
        </button>
        {/* <button
          type="button"
          className="details__button"
          onClick={navigateEdit}
        >
          edit
        </button> */}
      </div>
    </div>
  );
}
