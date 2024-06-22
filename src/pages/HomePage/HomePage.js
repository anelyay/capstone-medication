import Patient from "../../components/MainPatient/MainPatient";
import "./HomePage.scss";
import { useState, useEffect } from "react";
import PatientAPI from "../../classes/patientAPI";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getPatients = async () => {
      try {
        const userData = await PatientAPI.getPatients();
        setPatients(userData);
        setIsLoading(false);
      } catch (error) {
        console.error(`Unable to get patients: ${error.message}`);
        setIsLoading(false);
      }
    };

    getPatients();
  }, []);

  const addPatient = () => {
    navigate("/profile/add");
  };

  return (
    <main className="home">
      <div className="home__container">
        <h1 className="home__title">Today's Medications</h1>

        <div className="home__patientlist">
          {isLoading ? (
            <p>Loading...</p>
          ) : patients.length > 0 ? (
            patients.map((patient) => (
              <Patient key={patient.id} patient={patient} />
            ))
          ) : (
            <div className="home__nopatients">
              <h1 className="home__subtitle">
                No medications to display because there are no patients yet.
              </h1>
              <button className="home__button" onClick={addPatient}>
                add a patient
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
