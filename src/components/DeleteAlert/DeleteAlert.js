import "./DeleteAlert.scss";

export default function DeleteAlert({ handleDeleteButton, handleHide }) {
  return (
    <div className="delete">
      <p className="delete__title">Are you sure you want to delete?</p>
      <p className="delete__subtitle">-This action cannot be undone-</p>
      <div className="delete__select">
        <button
          type="button"
          className="delete__option delete__option--yes"
          onClick={handleDeleteButton}
        >
          yes
        </button>
        <button
          type="button"
          className="delete__option delete__option--no"
          onClick={handleHide}
        >
          no
        </button>
      </div>
    </div>
  );
}
