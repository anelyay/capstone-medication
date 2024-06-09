import UserForm from "../../components/UserForm/UserForm";
import "./EditProfile.scss";
import { useNavigate, useParams } from "react-router-dom";
import PatientAPI from "../../classes/patientAPI";
import { useEffect, useState } from "react";

export default function EditProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const getPatient = async () => {
      try {
        const userData = await PatientAPI.getSinglePatient(id);
        setInitialData(userData);
      } catch (error) {
        console.error("Unable to get patient:", error);
      }
    };

    getPatient();
  }, [id]);

  const handleSecond = async () => {
    try {
      await PatientAPI.deletePatient(id);
      navigate("/profile");
    } catch (error) {
      console.error("Unable to delete patient:", error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const userData = await PatientAPI.updatePatient(id, formData);
      navigate("/profile");
    } catch (error) {
      console.error("Unable to update patient:", error);
    }
  };
  return (
    <>
      {initialData && (
        <UserForm
          className="edit"
          title="Edit Profile"
          buttonName="submit"
          buttonSecond="delete"
          handleSecond={handleSecond}
          onSubmit={handleSubmit}
          initialData={initialData}
        />
      )}
    </>
  );
}
