import "./LoginPage.scss";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    navigate("/");
  };

  return (
    <div className="login">
      <div className="login__pattern"></div>

      <div className="login__section">
        <div className="login__wrap">
          <img src={logo} alt="logo" className="login__logo" />
          <h3 className="login__title">Otter Pill</h3>
        </div>

        <div className="login__form-container">
          <div className="login__heading">
            <h1 className="login__subtitle">log in</h1>
            <h1 className="login__subtitle login__subtitle--inactive">
              sign up
            </h1>
          </div>
          <form className="login__form">
            <div className="login__form-box">
              <label className="login__label">Username:</label>
              <input className="login__input" type="text" name="username" />
            </div>
            <div className="login__form-box">
              <label className="login__label">Password:</label>
              <input className="login__input" type="password" name="password" />
            </div>
            <button
              type="submit"
              className="login__button"
              onClick={handleSubmit}
            >
              enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
