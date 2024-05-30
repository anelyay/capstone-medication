import "./Header.scss";
import logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const hideHeader = ["/login"];
  const showHeader = !hideHeader.includes(location.pathname);

  if (!showHeader) {
    return null;
  }
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
          <button className="header__navlink">home</button>
          <button className="header__navlink">profile</button>
        </nav>
      </div>
    </header>
  );
}
