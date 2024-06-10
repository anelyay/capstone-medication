import { useEffect, useState } from "react";
import "./MedicationCard.scss";
import { Link } from "react-router-dom";
import MedicationAPI from "../../classes/medicationAPI";

export default function MedicationCard({ medication }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = async (event) => {
    setClicked(true);
    try {
      await MedicationAPI.markMedAsTaken(medication.id, {
        medication_id: medication.id,
        med_time: medication.med_time,
        med_taken: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="card">
      <div className="card__top">
        <Link to={`/medication/${medication.id}`}>
          <h3 className="card__title">{medication.med_name}</h3>
        </Link>
        <h4 className="card__subtitle"> {medication.med_dose}</h4>
      </div>

      <section className="card__schedulecontainer">
        <div className="card__schedule">
          <div className="card__timebox">
            <p className="card__time">{medication.med_time}</p>
            <p className="card__compliance">
              {medication.med_taken || clicked ? "TAKEN" : "TO TAKE"}
            </p>
          </div>
          <div className="card__done-button">
            <button
              onClick={handleClick}
              className={
                medication.med_taken || clicked
                  ? "card__button"
                  : "card__button--totake"
              }
            ></button>
          </div>
        </div>
      </section>
      <Link to={`/medication/${medication.id}`}>
        <div className="card__expand">details</div>
      </Link>
    </section>
  );
}
