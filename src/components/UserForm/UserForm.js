import "./UserForm.scss";
import { useState, useEffect } from "react";
import backArrow from "../../assets/icons/back-arrow.png";
import DeleteAlert from "../DeleteAlert/DeleteAlert";

export default function UserForm({
  className,
  title,
  buttonName,
  buttonSecond,
  handleSecond,
  onSubmit,
  initialData,
  handleBack,
  handleDeleteButton,
  isEdit,
}) {
  const [formData, setFormData] = useState({
    patient_name: "",
    patient_dob: "",
    patient_md: "",
    patient_allergy: "",
  });
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

 const validateFields = () => {
   const newErrors = {};
   if (!formData.patient_name.trim()) {
     newErrors.patient_name = "Profile name is required.";
   }
   if (!formData.patient_dob) {
     newErrors.patient_dob = "Date of Birth is required.";
   }
   if (!formData.patient_md.trim()) {
     newErrors.patient_md = "Primary Doctor is required.";
   }
   setErrors(newErrors);
   return Object.keys(newErrors).length === 0;
 };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateFields()) return;

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const handleSecondClick = (event) => {
    event.preventDefault();
    setShowDeleteAlert(true);
  };

  const handleHide = (event) => {
    event.preventDefault();
    setShowDeleteAlert(false);
  };

  return (
    <div className={className}>
      <div className={`${className}__wrap`}>
        <div className={`${className}__header`}>
          <img
            src={backArrow}
            alt="back arrow"
            onClick={handleBack}
            className={`${className}__arrow`}
          />
          <h2 className={`${className}__title`}>{title}</h2>
        </div>
        <form className={`${className}__form`} onSubmit={handleSubmit}>
          <div className={`${className}__box`}>
            <label className={`${className}__label`}>Name</label>
            <input
              placeholder="Please enter the name"
              id="patient_name"
              name="patient_name"
              maxLength={17}
              className={
                errors.patient_name
                  ? `${className}__input ${className}__input-error`
                  : `${className}__input`
              }
              value={formData.patient_name}
              onChange={handleChange}
            />
            {errors.patient_name && (
              <div className={`${className}__error`}>{errors.patient_name}</div>
            )}
          </div>

          <div className={`${className}__box`}>
            <label className={`${className}__label`}>Date of Birth</label>
            <input
              type="date"
              id="patient_dob"
              name="patient_dob"
              className={
                errors.patient_dob
                  ? `${className}__date ${className}__date-error`
                  : `${className}__date`
              }
              value={formData.patient_dob}
              onChange={handleChange}
            />
            {errors.patient_dob && (
              <div className={`${className}__error`}>{errors.patient_dob}</div>
            )}
          </div>

          <div className={`${className}__box`}>
            <label className={`${className}__label`}>Primary Doctor</label>
            <input
              placeholder="Please enter the name of Primary Doctor"
              id="patient_md"
              name="patient_md"
              className={
                errors.patient_md
                  ? `${className}__input ${className}__input-error`
                  : `${className}__input`
              }
              value={formData.patient_md}
              onChange={handleChange}
            />
            {errors.patient_md && (
              <div className={`${className}__error`}>{errors.patient_md}</div>
            )}
          </div>

          <div className={`${className}__box`}>
            <label className={`${className}__label`}>Allergies</label>
            <input
              placeholder="Please enter allergies (optional)"
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
              className={`${className}__button edit__button--delete`}
              onClick={isEdit ? handleSecondClick : handleSecond}
            >
              {buttonSecond}
            </button>
            <button type="submit" className={`${className}__button`}>
              {buttonName}
            </button>
          </div>
          {showDeleteAlert && (
            <DeleteAlert
              handleDeleteButton={handleDeleteButton}
              handleHide={handleHide}
            />
          )}
        </form>
      </div>
    </div>
  );
}
