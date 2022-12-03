import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const useToastsErrors = (type: 'get' | 'set', error: FetchBaseQueryError) => {
  const { t } = useTranslation();

  if (error.status === 400 && type === 'get') {
    toast(t('getData_error'), {
      containerId: 'error',
    });
  }

  if (error.status === 400 && type === 'set') {
    toast(t('setData_error'), {
      containerId: 'error',
    });
  }
};
