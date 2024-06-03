import UserForm from "../../components/UserForm/UserForm";
import "./EditProfile.scss";

export default function EditProfile() {
  return (
    <>
      <UserForm
        className="edit"
        title="Edit Profile"
        buttonName="edit"
        buttonSecond="delete"
      />
    </>
  );
}
