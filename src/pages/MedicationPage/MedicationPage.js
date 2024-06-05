import "./MedicationPage.scss";
import { useEffect, useState } from "react";
import MedicationAPI from "../../classes/medicationAPI";
import { useParams } from "react-router-dom";

export default function MedicationPage() {
  const { id } = useParams();
  const [medication, setMedication] = useState();

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

  return (
    <div className="medication">
      <div className="medication__wrap">
        <h1 className="medication__title">Medication</h1>

        <div className="medication__card">
          <div className="medication__title-box">
            <h2 className="medication__title">{medication.med_name}</h2>
          </div>

          <div className="medication__columns">
            <div className="medication__details">
              <p className="medication__dose">{medication.med_dose}</p>
              <p className="medication__quantity">
                Quantity: {medication.quantity}
              </p>
              <p className="medication__schedule">Schedule</p>
              {Array.isArray(medication.schedule) &&
              medication.schedule.length > 0 ? (
                sortedSchedule.map((time, index) => (
                  <p key={`${time.med_time}-${index}`}>{time.med_time}</p>
                ))
              ) : (
                <p>No schedule available</p>
              )}
            </div>

            <div className="medication__more">
              <p className="medication__more-title">{/* More Information */}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
