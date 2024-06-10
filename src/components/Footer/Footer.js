import "./Footer.scss";
import { useLocation } from "react-router-dom";
import meds from "../../assets/images/meds.png";
import github from "../../assets/icons/github.png";
import email from "../../assets/icons/email.png";
import pills from "../../assets/images/pills.png";

export default function Footer() {
  const location = useLocation();
  const hideFooter = ["/login"];
  const showFooter = !hideFooter.includes(location.pathname);

  if (!showFooter) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer__wrap">
        <div className="footer__pillbox">
          <img className="footer__pill" src={pills} alt="pills" />
        </div>
        <h3 className="footer__title">Stay Otterly Connected</h3>
        <div className="footer__container">
          <div className="footer__box">
            <p className="footer__text">Reach out:</p>
            <div className="footer__iconbox">
              <a href="mailto:yerzhanova.anelya@gmail.com">
                <img className="footer__icon" src={email} alt="email icon" />
              </a>
              <a href="https://github.com/AanelyaA">
                <img className="footer__icon" src={github} alt="github icon" />
              </a>
            </div>
          </div>

          <div className="footer__box">
            <p className="footer__text">Terms of Service</p>
            <p className="footer__text">Privacy Policy</p>
          </div>
        </div>
      </div>

      <div className="footer__imagebox">
        <img
          className="footer__image"
          src={meds}
          alt="medication bottle with pills"
        />
      </div>

      <div className="footer__copyright">
        <p className="footer__legal">© 2024 Otter Pill. All rights reserved.</p>
      </div>
    </footer>
  );
}
