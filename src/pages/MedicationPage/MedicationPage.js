import "./MedicationPage.scss";
import { useEffect, useState } from "react";
import MedicationAPI from "../../classes/medicationAPI";
import { useNavigate, useParams } from "react-router-dom";
import otterMedication from "../../assets/images/med_otter.png";
import bubbleSpeech from "../../assets/images/bubble.png";
import AuthAPI from "../../classes/authAPI";
import moment from "moment-timezone";
import Spinner from "../../components/Spinner/Spinner";

export default function MedicationPage() {
  const { id } = useParams();
  const [medication, setMedication] = useState();
  const [activityLog, setActivityLog] = useState();
  const [showAllLogs, setShowAllLogs] = useState(false);
  const [bubble, setBubble] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicationData = await MedicationAPI.getSingleMedication(id);
        setMedication(medicationData);

        const logData = await MedicationAPI.getActivityLog(id);
        setActivityLog(logData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!medication) {
    return <Spinner/>
  }

  const sortedSchedule = medication.schedule.sort((a, b) => {
    const timeA = a.med_time;
    const timeB = b.med_time;
    if (timeA < timeB) return -1;
    if (timeA > timeB) return 1;
    return 0;
  });

const sortedActivityLog = activityLog
  ? activityLog
      .sort((a, b) => {
        const timeA = new Date(a.log_time);
        const timeB = new Date(b.log_time);
        return timeB - timeA;
      })
      .map((entry) => ({
        ...entry,
        formatted_log_time: moment(entry.log_time).format(
          "DD MMMM YYYY | HH:mm"
        ),
      }))
  : [];

  const navigateEdit = () => {
    navigate(`/medication/${id}/edit`);
  };

  const handleBack = () => {
    navigate(`/`);
  };

  const showLogs = () => {
    setShowAllLogs(!showAllLogs);
  };

  const logsToShow = showAllLogs
    ? sortedActivityLog
    : sortedActivityLog.slice(0, 3);

  const showId = () => {
    setBubble(true);
  };

  return (
    <div className="medication">
      <h1 className="medication__maintitle">
        {medication.patient_name}'s Pill Information
      </h1>
      <div className="medication__card">
        <div className="medication__title-box">
          <h2 className="medication__title">{medication.med_name}</h2>
        </div>
        <div className="medication__wrap">
          <div className="medication__container">
            <div className="medication__wrapper">
              <h2 className="medication__header">Medication Details</h2>
              <div>
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
                  <h3 className="medication__heading medication__heading--schedule">
                    schedule:
                  </h3>
                  <div className="medication__times">
                    {medication.schedule && medication.schedule.length > 0 ? (
                      sortedSchedule.map((time, index) => (
                        <p
                          key={`${time.med_time}-${index}`}
                          className="medication__text"
                        >
                          {time.med_time}
                        </p>
                      ))
                    ) : (
                      <p>No schedule available</p>
                    )}
                  </div>
                </div>
              </div>

              {medication.notes && (
                <div className="medication__box">
                  <h3 className="medication__heading">notes:</h3>
                  <p className="medication__text">{medication.notes}</p>
                </div>
              )}
            </div>

            <div className="medication__box-log">
              <h2 className="medication__header">Compliance History</h2>
              {activityLog && activityLog.length > 0 ? (
                <>
                  <div className="medication__headerbox">
                    <h3 className="medication__heading">
                      administration date:
                    </h3>
                    <h3 className="medication__heading">pills left:</h3>
                  </div>
                  {logsToShow.map((log, index) => (
                    <div className="medication__wrapping" key={index}>
                      <p className="medication__text-history">
                        {log.formatted_log_time}
                      </p>
                      <p className="medication__text-history">{log.quantity}</p>
                    </div>
                  ))}
                  {sortedActivityLog.length > 3 && (
                    <div className="medication__showbox">
                      <p className="medication__show-button" onClick={showLogs}>
                        {showAllLogs ? "show less" : "show more"}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <h4 className="medication__h4">
                    Medication has not been taken yet
                  </h4>
                </div>
              )}
            </div>
          </div>

          <div className="medication__picture">
            {bubble && (
              <img
                src={bubbleSpeech}
                alt="bubble speech"
                className="medication__bubble"
              />
            )}
            {bubble && (
              <p className="medication__id">id: {medication.medication_id}</p>
            )}
            <img
              src={otterMedication}
              alt="otter with a pill"
              className="medication__image"
              onClick={showId}
            />
          </div>
        </div>
      </div>
      <div className="medication__buttons">
        <button
          type="button"
          className="medication__button medication__button-back"
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
