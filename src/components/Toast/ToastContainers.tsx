import { ToastContainer } from 'react-toastify';
import warnIcon from '../../assets/icons/warnIcon.svg';
import errorIcon from '../../assets/icons/errorIcon.svg';
import successIcon from '../../assets/icons/successIcon.svg';

export const ToastContainers = () => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        enableMultiContainer
        toastStyle={{ border: '2px solid #F7D56E' }}
        containerId={'warning'}
        className="warnToastContainer"
        icon={() => <img src={warnIcon} />}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        enableMultiContainer
        toastStyle={{ border: '2px solid #78FF8F' }}
        containerId={'success'}
        icon={() => <img src={successIcon} />}
        className="successTostContainer"
      />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        enableMultiContainer
        toastStyle={{ border: '2px solid rgba(240, 49, 49, 0.52)' }}
        containerId={'error'}
        icon={() => <img src={errorIcon} />}
        className="errorToastContainer"
      />
    </>
  );
};
