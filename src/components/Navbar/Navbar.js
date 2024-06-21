import "./Navbar.scss";
import logout from "../../assets/icons/logout.png";
import home from "../../assets/icons/home.png";
import profile from "../../assets/icons/profile.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
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
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="nav">
      <img
        src={logout}
        alt="logout"
        className="nav__image"
        onClick={handleLogout}
      />
      <img src={home} alt="home" className="nav__image" onClick={handleHome} />
      <img
        src={profile}
        alt="profile"
        className="nav__image"
        onClick={handleProfile}
      />
    </div>
  );
}
