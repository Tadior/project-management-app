import { ToastContainer } from 'react-toastify';
import warnIcon from '../../assets/icons/warnIcon.svg';
import errorIcon from '../../assets/icons/errorIcon.svg';
import successIcon from '../../assets/icons/successIcon.svg';

export const ToastContainers = () => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        closeOnClick
        enableMultiContainer
        toastStyle={{ border: '2px solid #F7D56E' }}
        containerId={'warning'}
        progressStyle={{ background: '#F7D56E' }}
        className="warnToastContainer"
        icon={() => <img src={warnIcon} />}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={false}
        closeOnClick
        enableMultiContainer
        toastStyle={{ border: '2px solid #78FF8F' }}
        containerId={'success'}
        progressStyle={{ background: '#78FF8F' }}
        icon={() => <img src={successIcon} />}
        className="successToastContainer"
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        closeOnClick
        enableMultiContainer
        toastStyle={{ border: '2px solid #f0313185 ' }}
        progressStyle={{ background: '#f0313185' }}
        containerId={'error'}
        icon={() => <img src={errorIcon} />}
        className="errorToastContainer"
      />
    </>
  );
};
