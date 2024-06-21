import "./Header.scss";
import logo from "../../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logout from "../../assets/icons/logout.png";
import home from "../../assets/icons/home.png";
import profile from "../../assets/icons/profile.png";

export default function Header({ onLogout }) {
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
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <div className="header__wrap">
            <img src={logo} alt="logo" className="header__logo" />
            <h3 className="header__title">Otter Pill</h3>
          </div>
        </Link>
        <nav className="header__nav">
          {/* <p className="header__navlink" onClick={handleHome}>
            home
          </p>
          <p className="header__navlink" onClick={handleProfile}>
            profile
          </p>
          <p className="header__navlink" onClick={handleLogout}>
            logout
          </p> */}

          <img
            src={home}
            alt="home"
            className="header__image"
            onClick={handleHome}
          />
          <img
            src={profile}
            alt="profile"
            className="header__image"
            onClick={handleProfile}
          />
          <img
            src={logout}
            alt="logout"
            className="header__image"
            onClick={handleLogout}
          />
        </nav>
      </div>
    </header>
  );
}
