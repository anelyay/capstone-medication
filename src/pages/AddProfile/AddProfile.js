import UserForm from "../../components/UserForm/UserForm";
import "./AddProfile.scss";
import { useNavigate } from "react-router-dom";
import PatientAPI from "../../classes/patientAPI";

export default function AddProfile() {
  const navigate = useNavigate();

  const handleSecond = (event) => {
    navigate("/profile");
  };

   const handleSubmit = async (formData) => {
     try {
       const userData = await PatientAPI.addPatient(formData);
       navigate("/profile"); ///??? maybe
     } catch (error) {
       console.error("Unable to add patient:", error);
     }
   };

  return (
    <>
      <UserForm
        className="add"
        title="Add Profile"
        buttonName="add"
        buttonSecond="go back"
        handleSecond={handleSecond}
        onSubmit={handleSubmit}
        initialData={{
          patient_name: "",
          patient_dob: "",
          patient_md: "",
          patient_allergy: "",
        }}
      />
    </>
  );
}
