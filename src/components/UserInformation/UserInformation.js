import "./UserInformation.scss";
import AuthAPI from "../../classes/authAPI";
import { useState } from "react";
import { timezoneCodes } from "../../utils/utils.js";

export default function UserInfo({ email, username, timezone, timezoneLabel }) {
  const [isForm, setIsForm] = useState(false);
  const [alert, setAlert] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: username,
    email: email,
    password: "",
    timezone: timezone,
  });

  if (email === null || username === null) {
    return <p>Loading...</p>;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await AuthAPI.UpdateUser(userInfo);
      setAlert("Updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Failed to update user info:", error);
      alert("Failed to update user info.");
    }
  };

  const handleShowForm = () => {
    setIsForm(true);
  };

  const handleCancel = () => {
    setIsForm(false);
  };

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="user-info">
      <div className="user-info__container">
        <div className="user-info__visibilitybox">
          <h2 className="user-info__title">My Personal Details</h2>
          <button
            alt="visibility"
            onClick={handleVisibility}
            className={
              isVisible ? "user-info__visible" : "user-info__invisible"
            }
          />
        </div>

        {!isForm && (
          <div className="user-info__wrapper">
            <div className="user-info__details">
              <div className="user-info__details-box">
                <div className="user-info__box">
                  <p className="user-info__label">Name:</p>
                  <p
                    className={
                      isVisible
                        ? "user-info__text-visible"
                        : "user-info__text-invisible"
                    }
                  >
                    {username}
                  </p>
                </div>

                <div className="user-info__box">
                  <p className="user-info__label">Email:</p>
                  <p
                    className={
                      isVisible
                        ? "user-info__text-visible"
                        : "user-info__text-invisible"
                    }
                  >
                    {email}
                  </p>
                </div>

                <div className="user-info__box">
                  <p className="user-info__label">Timezone:</p>
                  <p
                    className={
                      isVisible
                        ? "user-info__text-visible"
                        : "user-info__text-invisible"
                    }
                  >
                    {timezoneLabel}
                  </p>
                </div>
              </div>

              {/* <div className="user-info__visibilitybox">
                <button
                  alt="visibility"
                  onClick={handleVisibility}
                  className={
                    isVisible ? "user-info__visible" : "user-info__invisible"
                  }
                />
              </div> */}
            </div>

            <button onClick={handleShowForm} className="user-info__button">
              edit
            </button>
          </div>
        )}

        {isForm && (
          <form onSubmit={handleSubmit} className="user-info__form">
            <div className="user-info__group">
              <label htmlFor="username" className="user-info__label">
                Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={userInfo.username}
                onChange={handleInputChange}
                className="user-info__input"
              />
            </div>

            <div className="user-info__group">
              <label htmlFor="email" className="user-info__label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                className="user-info__input"
              />
            </div>

            <div className="user-info__group">
              <label htmlFor="timezone" className="user-info__label">
                Timezone
              </label>
              <select
                id="timezone"
                name="timezone"
                value={userInfo.timezone}
                onChange={handleInputChange}
                className="user-info__input"
              >
                <option value="">Select your timezone</option>
                {timezoneCodes.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="user-info__group">
              <label htmlFor="password" className="user-info__label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="enter a new password (optional)"
                value={userInfo.password}
                onChange={handleInputChange}
                className="user-info__input"
              />
            </div>

            <div className="user-info__buttons">
              <button
                type="button"
                onClick={handleCancel}
                className="user-info__button user-info__button-cancel"
              >
                cancel
              </button>
              <button
                type="submit"
                className="user-info__button user-info__button-update"
              >
                update
              </button>
            </div>

            {alert && <p>{alert}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
