import "./Header.scss";
import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom";

export default function Header() {
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
