import "./Header.scss";
import logo from "../../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import logout from "../../assets/icons/logout.png";
// import home from "../../assets/icons/home.png";
// import profile from "../../assets/icons/profile.png";
import TimezoneClock from "../TimeClock/TimeClock";

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
            <TimezoneClock />
          <p
            className={`header__navlink ${
              location.pathname === "/" ? "header__navlink--active" : ""
            }`}
            onClick={handleHome}
          >
            home
          </p>
          <p
            className={`header__navlink ${
              location.pathname === "/profile" ? "header__navlink--active" : ""
            }`}
            onClick={handleProfile}
          >
            profile
          </p>
          <p className="header__navlink" onClick={handleLogout}>
            logout
          </p>

          {/* <div className="header__icon-container">
            <img
              src={home}
              alt="home"
              className="header__image"
              onClick={handleHome}
            />
            <p className="nav__text">home</p>
          </div>
          <div className="header__icon-container">
            <img
              src={profile}
              alt="profile"
              className="header__image"
              onClick={handleProfile}
            />
            <p className="nav__text">home</p>
          </div>
          <div className="header__icon-container">
            <img
              src={logout}
              alt="logout"
              className="header__image"
              onClick={handleLogout}
            />
            <p className="nav__text">home</p>
          </div> */}
        </nav>
      </div>
    </header>
  );
}
