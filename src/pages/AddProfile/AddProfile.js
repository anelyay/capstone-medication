import UserForm from "../../components/UserForm/UserForm";
import "./AddProfile.scss";

export default function AddProfile() {
  return (
    <>
      <UserForm className="add" title="Add Profile" buttonName="add" buttonSecond="go back"/>
    </>
  );
}
