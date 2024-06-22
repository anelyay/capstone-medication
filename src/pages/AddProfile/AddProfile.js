import UserForm from "../../components/UserForm/UserForm";
import "./AddProfile.scss";
import { useNavigate } from "react-router-dom";
import PatientAPI from "../../classes/patientAPI";

export default function AddProfile() {
  const navigate = useNavigate();

  const handleSecond = () => {
    navigate("/profile");
  };

   const handleSubmit = async (formData) => {
     try {
      await PatientAPI.addPatient(formData);
       navigate("/profile");
     } catch (error) {
       console.error("Unable to add patient:", error);
     }
   };

  return (
    <div className="page-add-profile">
      <UserForm
        className="add"
        title="Add Profile"
        buttonName="add"
        buttonSecond="go back"
        handleSecond={handleSecond}
        handleBack={handleSecond}
        onSubmit={handleSubmit}
        initialData={{
          patient_name: "",
          patient_dob: "",
          patient_md: "",
          patient_allergy: "",
        }}
      />
    </div>
  );
}
