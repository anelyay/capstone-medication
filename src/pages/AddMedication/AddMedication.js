import { useNavigate } from "react-router-dom";
import MedicationForm from "../../components/MedicationForm/MedicationForm";
import "./AddMedication.scss";
import MedicationAPI from "../../classes/medicationAPI";


export default function AddMedication() {
  const navigate = useNavigate();

  const handleSecond = (event) => {
    navigate("/");
  };

const convertTimeTo24HourFormat = (time) => {
  const [hour, minute, period] = time.split(/[:\s]/);
  let convertedHour = parseInt(hour, 10);
  if (period && period.toUpperCase() === "PM" && convertedHour < 12) {
    convertedHour += 12;
  }
  const paddedHour = convertedHour.toString().padStart(2, "0");
  return `${paddedHour}:${minute}`;
};

const handleAddMedication = async (formData) => {
  try {
    if (formData.schedule && Array.isArray(formData.schedule)) {
      const convertedFormData = {
        ...formData,
        schedule: formData.schedule.map((entry) => ({
          ...entry,
          med_time: convertTimeTo24HourFormat(entry.med_time),
        })),
      };
      const userData = await MedicationAPI.addMedication(convertedFormData);
      navigate("/");
    } else {
      throw new Error("Schedule data is invalid");
    }
  } catch (error) {
    console.error("Unable to add patient:", error);
  }
};

  return (
      <div className="page-add-med">
      <MedicationForm
          className="add-med"
          title="Add Medication"
          buttonName="add"
          buttonSecond="go back"
          handleSecond={handleSecond}
          handleBack={handleSecond}
        onSubmit={handleAddMedication}
        />
    </div>
  );
}
