import { useState } from "react";
import "./MedicationForm.scss";

export default function MedicationForm({
  className,
  title,
  buttonName,
  buttonSecond,
  handleSecond,
}) {
  const scheduleOptions = [
    { label: "once a day", times: 1 },
    { label: "twice a day", times: 2 },
    { label: "three times a day", times: 3 },
    { label: "four times a day", times: 4 },
  ];

  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [selectedTimes, setSelectedTimes] = useState(null);

  const handleScheduleChange = (event) => {
    const selectedOption = scheduleOptions.find(
      (option) => option.label === event.target.value
    );
    setSelectedSchedule(event.target.value);
    setSelectedTimes(selectedOption ? selectedOption.times : null);
  };

  const renderTimeInputs = () => {
    if (selectedTimes === null) return null;
    const inputs = [];
    for (let i = 0; i < selectedTimes; i++) {
      inputs.push(
        <div key={i} className={`${className}__time`}>
          <label className={`${className}__label`}>Time {i + 1}</label>
          <input
            type="time"
            id={`time-${i}`}
            name={`time-${i}`}
            className={`${className}__input`}
            step="900"
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
        <form className={`${className}__form`}>
          <div className={`${className}__box`}>
            <label className={`${className}__label`}>Medication Name</label>
            <input
              id="medicationName"
              name="medicationName"
              className={`${className}__input`}
            />
          </div>

          <div className={`${className}__box`}>
            <label className={`${className}__label`}>Dose</label>
            <input id="dose" name="dose" className={`${className}__input`} />
          </div>

          <div className={`${className}__box`}>
            <label className={`${className}__label`}>Schedule</label>
            <select
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
              id="quantity"
              name="quantity"
              type="number"
              className={`${className}__input`}
            />
          </div>

          <div className={`${className}__buttons`}>
            <button
              type="button"
              className={`${className}__button`}
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
