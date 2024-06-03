import "./MedicationCard.scss";
import { Link } from "react-router-dom";

export default function MedicationCard() {
  return (
    <section className="card">
      <div className="card__top">
        <h3 className="card__title">Vitamin B12</h3>
        <h4 className="card__subtitle"> 250mcg</h4>
      </div>

      <section className="card__schedulecontainer">
        <div className="card__schedule">
          <div className="card__timebox">
            <p className="card__time">7am:</p>
            <p className="card__compliance">TAKEN</p>
          </div>

          <div className="card__done-button">
            <button className="card__button"></button>
          </div>
        </div>
      </section>
      <Link to="/medication">
        <div className="card__expand">more details</div>
      </Link>
    </section>
  );
}
