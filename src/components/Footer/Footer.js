import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrap">
        <div className="footer__navigation">
          <h3 className="footer__title">Navigation</h3>
          <div className="footer__box">
            <p className="footer__text">Terms of Service</p>
            <p className="footer__text">Privacy Policy</p>
          </div>
        </div>
        <div className="footer__contact">
          <h3 className="footer__title">Contact Us</h3>
          <p className="footer__text">Email: hello@otterpill.ca</p>
          <p className="footer__text">Phone: 123-456-7890</p>
        </div>
        {/* <div className="footer__social">
        <h3 className="footer__title">Connect With Us</h3>
      </div> */}
        <div className="footer__copyright">
          <p className="footer__text">© 2024 Otter Pill.</p>
          <p className="footer__text"> All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
