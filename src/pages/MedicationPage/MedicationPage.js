import "./MedicationPage.scss";

export default function MedicationPage() {
  return (
    <div className="medication">
      <h1>Medication</h1>

      <div className="medication__card">
        <div className="medication__title-box">
          <h2 className="medication__title">Vitamin B12</h2>
        </div>

        <div className="medication__columns">
          <div className="medication__details">
            <p className="medication__dose"> 250mcg </p>

            <p className="medication__schedule"></p>
          </div>




          <div className="medication__more">
            <p className="medication__more-title">
                {/* More Information */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
