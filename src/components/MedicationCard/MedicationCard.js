import { useState } from "react";
import "./MedicationCard.scss";
import { Link } from "react-router-dom";

export default function MedicationCard({medication}) {

  


  return (
    <section className="card">
      <div className="card__top">
        <h3 className="card__title">{medication.med_name}</h3>
        <h4 className="card__subtitle"> {medication.med_dose}</h4>
      </div>

      <section className="card__schedulecontainer">
          <div className="card__schedule">
            <div className="card__timebox">
              <p className="card__time">{medication.med_time}</p>
              <p className="card__compliance">
                {medication.med_taken ? "TAKEN" : "TO TAKE"}
              </p>
            </div>
            <div className="card__done-button">
              <button onClick={handleClick}
                className={
                  medication.med_taken ? "card__button" : "card__button--totake"
                }
              ></button>
            </div>
          </div>

      </section>
      <Link to="/medication">
        <div className="card__expand">more details</div>
      </Link>
    </section>
  );
}
