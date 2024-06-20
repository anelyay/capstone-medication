import "./LoginPage.scss";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const [activeForm, setActiveForm] = useState("login");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleActive = (formName) => {
    setActiveForm(formName);
  };

  const handleSignSubmit = (event) => {
    event.preventDefault();
    setError(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
            <h1
              className={
                activeForm === "login"
                  ? "login__subtitle"
                  : "login__subtitle--inactive"
              }
              onClick={() => {
                handleActive("login");
              }}
            >
              log in
            </h1>
            <h1
              className={
                activeForm === "signup"
                  ? "login__subtitle"
                  : "login__subtitle--inactive"
              }
              onClick={() => {
                handleActive("signup");
              }}
            >
              sign up
            </h1>
          </div>

          {activeForm === "login" && (
            <form className="login__form">
              <div className="login__form-box">
                <label className="login__label">Username:</label>
                <input
                  className="login__input"
                  type="text"
                  name="username"
                  placeholder="Please enter your username"
                />
              </div>
              <div className="login__form-box">
                <label className="login__label">Password:</label>
                <input
                  className="login__input"
                  type="password"
                  name="password"
                  placeholder="Please enter your password"
                />
              </div>
              <button
                type="submit"
                className="login__button"
                onClick={handleSubmit}
              >
                enter
              </button>
              {error && <div className="login__error"> {error} </div>}
            </form>
          )}

          {activeForm === "signup" && (
            <form className="login__form">
              <div className="login__form-box">
                <label className="login__label">Username:</label>
                <input
                  className="login__input"
                  type="text"
                  name="username"
                  placeholder="Please create a username"
                />
              </div>
              <div className="login__form-box">
                <label className="login__label">Email:</label>
                <input
                  className="login__input"
                  type="email"
                  name="email"
                  placeholder="Please enter your email"
                />
              </div>
              <div className="login__form-box">
                <label className="login__label">Password:</label>
                <input
                  className="login__input"
                  type="password"
                  name="password"
                  placeholder="Please enter your password"
                />
              </div>
              <button
                type="submit"
                className="login__button"
                onClick={handleSignSubmit}
              >
                sign up
              </button>
              {error && <div className="login__error"> {error} </div>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
