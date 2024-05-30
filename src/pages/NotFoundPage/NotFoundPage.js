import "./NotFoundPage.scss";
import notfound from "../../assets/images/notfound.png";

export default function NotFoundPage() {
  return (
    <div className="notfound">
      <h1 className="notfound__title">404: Page Not Found</h1>
      <img src={notfound} alt="not found otter" className="notfound__image"/>
    </div>
  );
}
