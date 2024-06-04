import Patient from "../../components/MainPatient/Patient";
import "./HomePage.scss";
import { useState, useEffect } from "react";
import PatientAPI from "../../classes/patientAPI";


export default function HomePage() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const userData = await PatientAPI.getPatients();
        console.log(userData);
        setPatients(userData);
      } catch (error) {
        console.error("Unable to get patients");
      }
    };
    getPatients();
  }, []);

  return (
    <main className="home">
      <div className="home__container">
        <h1 className="home__title">Today's Medications</h1>

        <div className="home__patientlist">
          {patients.map((patient) => (
            <Patient key={patient.id} patient={patient} />
          ))}
        </div>
      </div>
    </main>
  );
}
