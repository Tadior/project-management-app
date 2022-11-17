import react from 'react';
import dangerImg from '../../assets/images/danger.png';
import { useTranslation } from 'react-i18next';

interface IDeleteModalProps {
  callbackDelete: () => void;
  closeModal: () => void;
}

const DeleteModal = ({ callbackDelete, closeModal }: IDeleteModalProps) => {
  const { t } = useTranslation();

  return (
    <div className="delete-modal" onClick={closeModal}>
      <div
        className="delete-modal__wrapper"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <img src={dangerImg} alt="warning" className="delete-modal__img" />
        <div className="delete-modal__info">{t('delete_confirm')}</div>
        <div className="delete-modal__buttons">
          <button className="button-border" onClick={closeModal}>
            {t('cancel_btn')}
          </button>
          <button className="button-black" onClick={callbackDelete}>
            {t('delete_btn')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
