import react from 'react';
import dangerImg from '../../assets/images/danger.png';
const DeleteModal = () => {
  return (
    <div className="delete-modal">
      <div className="delete-modal__wrapper">
        <img src={dangerImg} alt="warning" className="delete-modal__img" />
        <div className="delete-modal__info">Are you sure, that you want to delete this?</div>
        <div className="delete-modal__buttons">
          <button className="button-border">Cancel</button>
          <button className="button-black">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
