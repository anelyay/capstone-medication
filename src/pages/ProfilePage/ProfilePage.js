import PatientUsers from "../../components/PatientUsers/PatientUsers";
import otter from "../../assets/images/profile.png";
import "./ProfilePage.scss";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  const handleAdd = (event) => {
    navigate("add");
  };

   const handleBack = (event) => {
     navigate("/");
   };

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
            <PatientUsers />
            <PatientUsers />
            <PatientUsers />
          </div>
        </div>
        <div className="profile__settings">
          {/* <div className="profile__box">
          <h3 className="profile__label">Your email:</h3>
          <h3 className="profile__email">hello@otterpill.ca</h3>
        </div>
        <h3 className="profile__label profile__label-italic">
          Change password
        </h3> */}
          <div className="profile__buttons">
            <button className="profile__action" onClick={handleBack}>
              go back
            </button>
            <button className="profile__action" onClick={handleAdd}>
              add a managed profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
