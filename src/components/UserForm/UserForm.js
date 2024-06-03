import "./UserForm.scss";

export default function UserForm({ className, title, buttonName, buttonSecond}) {

  return (
    <div className={className}>
      <div className={`${className}__wrap`}>
        <h2 className={`${className}__title`}>{title}</h2>
        <form className={`${className}__form`}>
          <label className={`${className}__label`}>Name</label>
          <input
            id="userName"
            name="userName"
            className={`${className}__input`}
          />

          <label className={`${className}__label`}>Date of Birth</label>
          <input type="date" id="dob" name="dob" className={`${className}__input`} />

          <label className={`${className}__label`}>Primary Doctor</label>
          <input id="md" name="md" className={`${className}__input`} />

          <label className={`${className}__label`}>Allergies</label>
          <input
            id="allergy"
            name="allergy"
            className={`${className}__input`}
          />
          <div className={`${className}__buttons`}>
            <button type="button" className={`${className}__button`}>
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
