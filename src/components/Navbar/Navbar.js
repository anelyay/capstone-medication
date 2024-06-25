import "./Navbar.scss";
import logout from "../../assets/icons/logout.png";
import home from "../../assets/icons/home.png";
import profile from "../../assets/icons/profile.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const hideHeader = ["/login"];
  const showHeader = !hideHeader.includes(location.pathname);

  if (!showHeader) {
    return null;
  }

  const handleHome = () => {
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("token");
      onLogout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="nav">
      <div className="nav__box">
        <img
          src={logout}
          alt="logout"
          className="nav__image"
          onClick={handleLogout}
        />
        <p className="nav__text">logout</p>
      </div>

      <div className="nav__box">
        <img
          src={home}
          alt="home"
          className="nav__image"
          onClick={handleHome}
        />
        <p className="nav__text">home</p>
      </div>
      <div className="nav__box">
        <img
          src={profile}
          alt="profile"
          className="nav__image"
          onClick={handleProfile}
        />
        <p className="nav__text">profile</p>
      </div>
    </div>
  );
}
