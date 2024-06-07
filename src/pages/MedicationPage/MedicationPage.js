import "./MedicationPage.scss";
import { useEffect, useState } from "react";
import MedicationAPI from "../../classes/medicationAPI";
import { useNavigate, useParams } from "react-router-dom";
import otterMedication from "../../assets/images/med_otter.png";

export default function MedicationPage() {
  const { id } = useParams();
  const [medication, setMedication] = useState();
  const [activityLog, setActivityLog] = useState();
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

    const getActivityLog = async () => {
      try {
        const logData = await MedicationAPI.getActivityLog(id);
        setActivityLog(logData);
        console.log(logData);
      } catch (error) {
        console.error("Unable to get an activity log");
      }
    };
    getMedication();
    getActivityLog();
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

  // const sortedLogs = activityLog.sort((a, b) => {
  //   const timeA = a.log_time;
  //   const timeB = b.log_time;
  //   if (timeA > timeB) return -1;
  //   if (timeA < timeB) return 1;
  //   return 0;
  // });

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
            <div className="medication__wrapping">
              <div className="medication__box">
                <h3 className="medication__heading">dose:</h3>
                <p className="medication__text">{medication.med_dose}</p>
              </div>

              <div className="medication__box">
                <h3 className="medication__heading"> current quantity:</h3>
                <p className="medication__text medication__text-quantity">
                  {medication.quantity}
                </p>
              </div>
            </div>

            <div className="medication__middlebox">
              <h3 className="medication__heading">schedule:</h3>
              {medication.schedule && medication.schedule.length > 0 ? (
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
              <div className="medication__box">
                <h3 className="medication__heading">notes:</h3>
                <p className="medication__text">{medication.notes}</p>
              </div>
            )}

            {activityLog && (
              <div className="medication__box-log">
                <div className="medication__headerbox">
                  <h3 className="medication__heading">history:</h3>
                  <h3 className="medication__heading">quantity:</h3>
                </div>
                {/* <div className="medication__activity-list"> */}
                {activityLog.map((log, index) => (
                  <div className="medication__wrapping" key={index}>
                    <p className="medication__text">{log.log_time}</p>
                    <p className="medication__text">{log.quantity}</p>
                  </div>
                ))}
                {/* </div> */}
              </div>
            )}
          </div>
          {/*
          <div className="medication__picture">
            <img
              src={otterMedication}
              alt="otter with a pill"
              className="medication__image"
            />
          </div> */}
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
  );
}
