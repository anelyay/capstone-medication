import "./LoginPage.scss";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [activeForm, setActiveForm] = useState("login");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleActive = (formName) => {
    setActiveForm(formName);
    setError(null);
    setSuccess(false);
  };

  const handleSignSubmit = async (event) => {
    event.preventDefault();

     const username = event.target.username.value;
     const email = event.target.email.value;
     const password = event.target.password.value;
     const verifyPassword = event.target.verifyPassword.value;

     if (password !== verifyPassword) {
       setError("Passwords do not match");
       return;
     }
    try {
      await axios.post("http://localhost:8080/auth/register", {
        username,
        email,
        password,
      });


      setSuccess(true);
      setError(null);
      event.target.reset();
      setActiveForm("login")
    } catch (error) {
      setSuccess(false);
      setError(error.response?.data || "Signup failed");
    }
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
                <label className="login__label">Name:</label>
                <input
                  className="login__input"
                  type="text"
                  name="username"
                  placeholder="Please enter your name"
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

              <div className="login__form-box">
                <label className="login__label">Verify Password:</label>
                <input
                  className="login__input"
                  type="password"
                  name="verifyPassword"
                  placeholder="Please re-enter your new password"
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
