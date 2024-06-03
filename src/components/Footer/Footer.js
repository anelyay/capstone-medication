import "./Footer.scss";

export default function Footer() {
  return (
    <footer class="footer">
      <div className="footer__wrap">
        <div class="footer__navigation">
          <h3 class="footer__title">Navigation</h3>
          <div className="footer__box">
            <p class="footer__text">Terms of Service</p>
            <p class="footer__text">Privacy Policy</p>
          </div>
        </div>
        <div class="footer__contact">
          <h3 class="footer__title">Contact Us</h3>
          <p class="footer__text">Email: hello@otterpill.ca</p>
          <p class="footer__text">Phone: 123-456-7890</p>
        </div>
        {/* <div class="footer__social">
        <h3 class="footer__title">Connect With Us</h3>

      </div> */}
        <div class="footer__copyright">
          <p class="footer__text">© 2024 Otter Pill.</p>
          <p class="footer__text"> All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
