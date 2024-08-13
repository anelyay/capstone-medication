import { useState } from "react";
import "./MedicationCard.scss";
import { Link } from "react-router-dom";
import MedicationAPI from "../../classes/medicationAPI";
// import ZeroAlert from "../ZeroAlert/ZeroAlert";

export default function MedicationCard({ medication }) {
  const [clicked, setClicked] = useState(false);
  const [zeroAlert, setZeroAlert] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(medication.quantity);
  const [invisible, SetInvisible]=useState(false)

  const handleClick = async () => {
    if (clicked) return; // to prevent multiple clicks!!

    setClicked(true);
    try {
      await MedicationAPI.markMedAsTaken(medication.id, {
        medication_id: medication.id,
        med_time: medication.med_time,
        med_taken: true,
      });

      const updatedQuantity = currentQuantity - 1;
      setCurrentQuantity(updatedQuantity);

      if (updatedQuantity === 0) {
        setZeroAlert(true);
        SetInvisible(true);
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <section className={`card ${invisible ? "card__invisible" : ""}`}>
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

            {medication.med_taken || clicked ? (
              <p className="card__compliance">TAKEN</p>
            ) : (
              <p className="card__compliance card__compliance--totake">
                TO TAKE
              </p>
            )}
          </div>
          <div className="card__done-button">
            <button
              onClick={handleClick}
              disabled={clicked}
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
      {/* {zeroAlert && <ZeroAlert medName={medication.med_name} />} */}
    </section>
  );
}
