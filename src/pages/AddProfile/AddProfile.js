import UserForm from "../../components/UserForm/UserForm";
import "./AddProfile.scss";
import { useNavigate } from "react-router-dom";

export default function AddProfile() {
  const navigate = useNavigate();

  const handleSecond = (event) => {
    navigate("/profile");
  };
  return (
    <>
      <UserForm
        className="add"
        title="Add Profile"
        buttonName="add"
        buttonSecond="go back"
        handleSecond={handleSecond}
      />
    </>
  );
}
