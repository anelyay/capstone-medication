import "./MedicationForm.scss";

export default function MedicationForm({ className }) {
  const schedule = [
    "once a day",
    "twice a day",
    "three times a day",
    "four times a day",
  ];

  return (
    <div className={className}>
      <div className={`${className}__wrap`}>
        <h2 className={`${className}__title`}>Add Medication</h2>
        <form className={`${className}__form`}>
          <label className={`${className}__label`}>Medication Name</label>
          <input
            id="name"
            name="itemName"
            className={`${className}__input`}
          ></input>

          <label className={`${className}__label`}>Dose</label>
          <input
            id="name"
            name="itemName"
            className={`${className}__input`}
          ></input>

          <select
            id="schedule"
            name="schedule"
            className={`${className}__schedule`}
          >
            <option className={`${className}__option`} hidden disabled value="">
              Please select
            </option>
          </select>
        </form>
      </div>
    </div>
  );
}
