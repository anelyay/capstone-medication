import { useState, useEffect } from "react";
import "./MedicationForm.scss";
import { useParams } from "react-router-dom";

export default function MedicationForm({
  className,
  title,
  buttonName,
  buttonSecond,
  handleSecond,
  initialData,
  onSubmit,
  patientId: propPatientId,
}) {
  const { patientId: urlPatientId } = useParams();
  const patientId = propPatientId !== undefined ? propPatientId : urlPatientId;

  const scheduleOptions = [
    { label: "once a day", times: 1 },
    { label: "twice a day", times: 2 },
    { label: "three times a day", times: 3 },
    { label: "four times a day", times: 4 },
  ];

  const [medicationName, setMedicationName] = useState("");
  const [dose, setDose] = useState("");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [selectedTimes, setSelectedTimes] = useState(null);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    if (initialData) {
      setMedicationName(initialData.med_name || "");
      setDose(initialData.med_dose || "");
      setNotes(initialData.notes || "");
      setQuantity(initialData.quantity || 0);
      const schedule = scheduleOptions.find(
        (option) => option.times === initialData.schedule.length
      );
      setSelectedSchedule(schedule ? schedule.label : "");
      setSelectedTimes(schedule ? schedule.times : null);
      setTimes(initialData.schedule.map((entry) => entry.med_time) || []);
    }
  }, [initialData]);

  const handleScheduleChange = (event) => {
    const selectedOption = scheduleOptions.find(
      (option) => option.label === event.target.value
    );
    setSelectedSchedule(event.target.value);
    setSelectedTimes(selectedOption ? selectedOption.times : null);
    setTimes(Array(selectedOption ? selectedOption.times : 0).fill(""));
  };

  const handleTimeChange = (index, value) => {
    const newTimes = [...times];
    newTimes[index] = value;
    setTimes(newTimes);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      patient_id: patientId,
      med_name: medicationName,
      med_dose: dose,
      quantity,
      notes,
      schedule: times.map((time) => ({ med_time: time, med_taken: false })),
    };
    onSubmit(formData);
  };

  const renderTimeInputs = () => {
    if (selectedTimes === null) return null;
    const inputs = [];
    for (let i = 0; i < selectedTimes; i++) {
      inputs.push(
        <div key={i} className={`${className}__time`}>
          <label className={`${className}__label`}>Time {i + 1}</label>
          <input
            required
            type="time"
            id={`time-${i}`}
            name={`time-${i}`}
            className={`${className}__input`}
            value={times[i]}
            onChange={(e) => handleTimeChange(i, e.target.value)}
          />
        </div>
      );
    }
    return inputs;
  };

  return (
    <div className={className}>
      <div className={`${className}__wrap`}>
        <h2 className={`${className}__title`}>{title}</h2>
        <form className={`${className}__form`} onSubmit={handleSubmit}>
          <div className={`${className}__box`}>
            <label className={`${className}__label`}>Medication Name</label>
            <input
              required
              placeholder="Please enter the medication name"
              id="medicationName"
              name="medicationName"
              className={`${className}__input`}
              value={medicationName}
              onChange={(e) => setMedicationName(e.target.value)}
            />
          </div>

          <div className={`${className}__box`}>
            <label className={`${className}__label`}>Dose</label>
            <input
              required
              placeholder="Please enter the medication dose"
              id="dose"
              name="dose"
              className={`${className}__input`}
              value={dose}
              onChange={(e) => setDose(e.target.value)}
            />
          </div>

          <div className={`${className}__box`}>
            <label className={`${className}__label`}>Notes</label>
            <input
              placeholder="Please enter any additional notes (optional)"
              id="notes"
              name="notes"
              className={`${className}__input`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className={`${className}__box`}>
            <label className={`${className}__label`}>Schedule</label>
            <select
              required
              id="schedule"
              name="schedule"
              className={`${className}__schedule`}
              value={selectedSchedule}
              onChange={handleScheduleChange}
            >
              <option
                className={`${className}__option`}
                hidden
                disabled
                value=""
              >
                Please select
              </option>
              {scheduleOptions.map((option, index) => (
                <option key={index} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={`${className}__box`}>
            <div className={`${className}__times`}>{renderTimeInputs()}</div>
          </div>

          <div className={`${className}__box`}>
            <label className={`${className}__label`}>Quantity</label>
            <input
              required
              placeholder="Please enter the medication quantity"
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              className={`${className}__input`}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className={`${className}__buttons`}>
            <button
              type="button"
              className={`${className}__button edit-med__button--delete`}
              onClick={handleSecond}
            >
              {buttonSecond}
            </button>
            <button type="submit" className={`${className}__button`}>
              {buttonName}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
