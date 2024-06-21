import "./Header.scss";
import logo from "../../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthAPI from "../../classes/authAPI";

export default function Header() {
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
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <div className="header__wrap">
            <img src={logo} alt="logo" className="header__logo" />
            <h3 className="header__title">Otter Pill</h3>
          </div>
        </Link>
        <nav className="header__nav">
          <p className="header__navlink" onClick={handleHome}>
            home
          </p>
          <p className="header__navlink" onClick={handleProfile}>
            profile
          </p>
          <p className="header__navlink" onClick={handleLogout}>
            logout
          </p>
        </nav>
      </div>
    </header>
  );
}
