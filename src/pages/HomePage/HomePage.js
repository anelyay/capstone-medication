import Patient from "../../components/Patient/Patient";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <main className="home">
      <div className="home__container">
        <h1 className="home__title">Today's Medications</h1>

        <div className="home__patientlist">
            <Patient/>
        </div>

      </div>
    </main>
  );
}
