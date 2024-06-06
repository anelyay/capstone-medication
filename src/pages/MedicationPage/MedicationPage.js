import "./MedicationPage.scss";
import { useEffect, useState } from "react";
import MedicationAPI from "../../classes/medicationAPI";
import { useNavigate, useParams } from "react-router-dom";
import otterMedication from "../../assets/images/med_otter.png";

export default function MedicationPage() {
  const { id } = useParams();
  const [medication, setMedication] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getMedication = async () => {
      try {
        const medicationData = await MedicationAPI.getSingleMedication(id);
        console.log(medicationData);
        setMedication(medicationData);
      } catch (error) {
        console.error("Unable to get medication");
      }
    };
    getMedication();
  }, [id]);

  if (!medication) {
    return <div>Loading...</div>;
  }

  const sortedSchedule = medication.schedule.sort((a, b) => {
    const timeA = a.med_time;
    const timeB = b.med_time;
    if (timeA < timeB) return -1;
    if (timeA > timeB) return 1;
    return 0;
  });

  const navigateEdit = (event) => {
    navigate(`/medication/${id}/edit`);
  };

  const handleBack = (event) => {
    navigate(`/`);
  };

  return (
    <div className="medication">
      <div className="medication__card">
        <div className="medication__title-box">
          <h2 className="medication__title">{medication.med_name}</h2>
        </div>
        <div className="medication__wrap">
          <div className="medication__container">
            <div className="medication__details">
              <h3 className="medication__heading">Details:</h3>
              <p className="medication__text">Dose: {medication.med_dose}</p>
              <p className="medication__text">
                Quantity: {medication.quantity}
              </p>
            </div>

            <div className="medication__schedule-box">
              <h3 className="medication__heading">Schedule:</h3>
              {Array.isArray(medication.schedule) &&
              medication.schedule.length > 0 ? (
                sortedSchedule.map((time, index) => (
                  <p
                    key={`${time.med_time}-${index}`}
                    className="medication__text"
                  >
                    time: {time.med_time}
                  </p>
                ))
              ) : (
                <p>No schedule available</p>
              )}
            </div>

            {medication.notes && (
              <div className="medication__more">
                <h3 className="medication__heading">Notes:</h3>
                <p className="medication__text">{medication.notes}</p>
              </div>
            )}

            {/* {medication.activityLog && (
            <div className="medication__activity-log">
              <h3 className="medication__heading">Activity Log:</h3>
              <ul className="medication__activity-list">
                {medication.activityLog.map((log, index) => (
                  <li key={index}>
                    <p>Taken At: {log.taken_at}</p>
                    <p>Quantity: {log.quantity}</p>
                  </li>
                ))} */}
          </div>

          <div className="medication__picture">
            <img
              src={otterMedication}
              alt="otter with a pill"
              className="medication__image"
            />
          </div>
        </div>

        <div className="medication__buttons">
          <button
            type="button"
            className="medication__button"
            onClick={handleBack}
          >
            go back
          </button>
          <button
            type="button"
            className="medication__button"
            onClick={navigateEdit}
          >
            edit
          </button>
        </div>
      </div>
    </div>
  );
}
