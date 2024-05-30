import "./MedicationCard.scss";

export default function MedicationCard() {
  return (
    <section className="card">
      <div className="card__top">
        <h3 className="card__title">Dienogest</h3>
        <h4 className="card__subtitle"> 2mg</h4>
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

      {/* <div className="card__expand">more details</div> */}
    </section>
  );
}
