import Patient from "../../components/MainPatient/MainPatient";
import "./HomePage.scss";
import { useState, useEffect } from "react";
import PatientAPI from "../../classes/patientAPI";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [failedAuth, setFailedAuth] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          navigate("/login");
          setFailedAuth(true);
          return;
        }

        const userData = await PatientAPI.getPatients();
        setPatients(userData);
      } catch (error) {
        console.error(`Unable to fetch patients: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const addPatient = () => {
    navigate("/profile/add");
  };

  if (isLoading) {
    return (
      <main className="home">
        <div className="home__container">
          <h1 className="home__title">Today's Medications</h1>
          <p>Loading...</p>
        </div>
      </main>
    );
  }


  return (
    <main className="home">
      <div className="home__container">
        <h1 className="home__title">Today's Medications</h1>
          <div className="home__patientlist">
            {patients.length > 0 ? (
              patients.map((patient) => (
                <Patient key={patient.id} patient={patient} />
              ))
            ) : (
              <div className="home__nopatients">
                <h1 className="home__subtitle">
                  No medications to display because there are no patients yet.
                </h1>
                <button className="home__button" onClick={addPatient}>
                  Add a patient
                </button>
              </div>
            )}
          </div>
      </div>
    </main>
  );
}
