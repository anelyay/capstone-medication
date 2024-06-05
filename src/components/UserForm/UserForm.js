import "./UserForm.scss";
import { useState, useEffect } from "react";

export default function UserForm({
  className,
  title,
  buttonName,
  buttonSecond,
  handleSecond,
  onSubmit,
  initialData,
}) {
  const [formData, setFormData] = useState({
    patient_name: "",
    patient_dob: "",
    patient_md: "",
    patient_allergy: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className={className}>
      <div className={`${className}__wrap`}>
        <h2 className={`${className}__title`}>{title}</h2>
        <form className={`${className}__form`} onSubmit={handleSubmit}>
          <div className={`${className}__box`}>
            <label className={`${className}__label`}>Name</label>
            <input
              id="patient_name"
              name="patient_name"
              className={`${className}__input`}
              value={formData.patient_name}
              onChange={handleChange}
            />
          </div>

          <div className={`${className}__box`}>
            <label className={`${className}__label`}>Date of Birth</label>
            <input
              type="date"
              id="patient_dob"
              name="patient_dob"
              className={`${className}__date`}
              value={formData.patient_dob}
              onChange={handleChange}
            />
          </div>

          <div className={`${className}__box`}>
            <label className={`${className}__label`}>Primary Doctor</label>
            <input
              id="patient_md"
              name="patient_md"
              className={`${className}__input`}
              value={formData.patient_md}
              onChange={handleChange}
            />
          </div>

          <div className={`${className}__box`}>
            <label className={`${className}__label`}>Allergies</label>
            <input
              id="patient_allergy"
              name="patient_allergy"
              className={`${className}__input`}
              value={formData.patient_allergy}
              onChange={handleChange}
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
