import "./LoginPage.scss";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthAPI from "../../classes/authAPI";

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    verifyPassword: "",
    timezone: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [activeForm, setActiveForm] = useState("login");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const timezones = [
    { value: "Pacific/Midway", label: "(UTC-11:00) Pacific/Midway" },
    { value: "Pacific/Honolulu", label: "(UTC-10:00) Pacific/Honolulu" },
    { value: "America/Anchorage", label: "(UTC-09:00) Alaska Time" },
    { value: "America/Los_Angeles", label: "(UTC-08:00) Pacific Time" },
    { value: "America/Denver", label: "(UTC-07:00) Mountain Time" },
    { value: "America/Chicago", label: "(UTC-06:00) Central Time" },
    { value: "America/New_York", label: "(UTC-05:00) Eastern Time" },
    { value: "America/Halifax", label: "(UTC-04:00) Atlantic Time" },
    { value: "America/Caracas", label: "(UTC-04:00) Venezuela Time" },
    { value: "America/Santiago", label: "(UTC-03:00) Chile Time" },
    { value: "America/Buenos_Aires", label: "(UTC-03:00) Argentina Time" },
    { value: "Atlantic/Azores", label: "(UTC-01:00) Azores Time" },
    { value: "UTC", label: "(UTC+00:00) Coordinated Universal Time (UTC)" },
    { value: "Europe/London", label: "(UTC+00:00) Greenwich Mean Time" },
    { value: "Europe/Paris", label: "(UTC+01:00) Central European Time" },
    { value: "Europe/Moscow", label: "(UTC+03:00) Moscow Time" },
    { value: "Asia/Dubai", label: "(UTC+04:00) Gulf Standard Time" },
    { value: "Asia/Karachi", label: "(UTC+05:00) Kazakhstan Standard Time" },
    { value: "Asia/Dhaka", label: "(UTC+06:00) Bangladesh Standard Time" },
    { value: "Asia/Jakarta", label: "(UTC+07:00) Western Indonesia Time" },
    { value: "Asia/Shanghai", label: "(UTC+08:00) China Standard Time" },
    { value: "Asia/Tokyo", label: "(UTC+09:00) Japan Standard Time" },
    { value: "Australia/Sydney", label: "(UTC+10:00) Eastern Australia Time" },
    { value: "Pacific/Noumea", label: "(UTC+11:00) New Caledonia Time" },
    {
      value: "Pacific/Auckland",
      label: "(UTC+12:00) New Zealand Standard Time",
    },
    { value: "Pacific/Tongatapu", label: "(UTC+13:00) Tonga Time" },
  ];

  const handleActive = (formName) => {
    setActiveForm(formName);
    setError(null);
    setSuccess(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSignSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password, verifyPassword, timezone } = formData;

    if (password !== verifyPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await AuthAPI.Register({ username, email, password, timezone });
      setSuccess(true);
      setError(null);
      setFormData({
        username: "",
        email: "",
        password: "",
        verifyPassword: "",
        timezone:""
      });

      setLoginData({
        email: email,
        password: "",
      });
      setTimeout(() => setActiveForm("login"), 2000);
    } catch (error) {
      setSuccess(false);
      setError(error.response?.data || "Signup failed");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = loginData;

    try {
      const response = await AuthAPI.Login({ email, password });
      sessionStorage.setItem("token", response.token);
      onLogin(response.token);
      navigate("/");
    } catch (error) {
      console.error("Error logging in a user:", error);
      setError(error.response?.data || "Error logging in");
    }
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
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Please enter your email"
                />
              </div>
              <div className="login__form-box">
                <label className="login__label">Password:</label>
                <input
                  className="login__input"
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
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
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Please enter your name"
                />
              </div>
              <div className="login__form-box">
                <label className="login__label">Email:</label>
                <input
                  className="login__input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Please enter your email"
                />
              </div>
              <div className="login__form-box">
                <label className="login__label">Timezone:</label>
                <select
                  className="login__input"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your timezone</option>
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="login__form-box">
                <label className="login__label">Password:</label>
                <input
                  className="login__input"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Please enter your password"
                />
              </div>

              <div className="login__form-box">
                <label className="login__label">Verify Password:</label>
                <input
                  className="login__input"
                  type="password"
                  name="verifyPassword"
                  value={formData.verifyPassword}
                  onChange={handleChange}
                  placeholder="Please re-enter your password"
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
              {success && (
                <div className="login__success"> Signup successful! </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
