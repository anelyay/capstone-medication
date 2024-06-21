import PatientUsers from "../../components/PatientCard/PatientCard";
import otter from "../../assets/images/profile.png";
import "./ProfilePage.scss";
import { useNavigate } from "react-router-dom";
import PatientAPI from "../../classes/patientAPI";
import AuthAPI from "../../classes/authAPI";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("add");
  };

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const getPatientsData = async () => {
      try {
        const userData = await PatientAPI.getPatients();
        setUsers(userData);
        setIsLoading(false);
      } catch (error) {
        console.error("Unable to get patients", error);
        setIsLoading(false);
      }
    };
    getPatientsData();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await AuthAPI.getUser();
        setProfile(response);
      } catch (error) {
        if (error.response) {
          console.error("Error fetching profile:", error);
          if (error.response.status === 401) {
            sessionStorage.removeItem("token");
            navigate("/login");
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="profile">
      <div className="profile__wrap">
        <div className="profile__container">
          <img
            src={otter}
            alt="otter profile pic"
            className="profile__picture"
          />
          {profile && (
            <h1 className="profile__title">hello {profile.username}</h1>
          )}
        </div>
        <div className="profile__list">
          {isLoading ? (
            <div className="profile__loading">Loading ...</div>
          ) : users.length > 0 ? (
            <>
              <h2 className="profile__heading">Your managed profiles:</h2>
              <div className="profile__patients">
                {users.map((user) => (
                  <PatientUsers key={user.id} patient={user} />
                ))}
              </div>
            </>
          ) : (
            <div className="profile__nousers">
              <h2>No Profiles Yet</h2>
            </div>
          )}
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
