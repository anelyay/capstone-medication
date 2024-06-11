import PatientUsers from "../../components/PatientCard/PatientCard";
import otter from "../../assets/images/profile.png";
import "./ProfilePage.scss";
import { useNavigate } from "react-router-dom";
import PatientAPI from "../../classes/patientAPI";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("add");
  };

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await PatientAPI.getPatients();
        setUsers(userData);
      } catch (error) {
        console.error("Unable to get patients");
      }
    };
    getUsers();
  }, []);

  return (
    <div className="profile">
      <div className="profile__wrap">
        <div className="profile__container">
          <img
            src={otter}
            alt="otter profile pic"
            className="profile__picture"
          />
          <h1 className="profile__title">hello Anelya</h1>
        </div>
        <div className="profile__list">
          <h2 className="profile__heading">Your managed profiles:</h2>
          <div className="profile__patients">
            {users.map((user) => (
              <PatientUsers key={user.id} patient={user} />
            ))}
          </div>
        </div>

        <div className="profile__buttons">
          <button className="profile__action-back" onClick={handleBack}>
            go back
          </button>
          <button className="profile__action" onClick={handleAdd}>
            add a profile
          </button>
        </div>
      </div>
    </div>
  );
}
