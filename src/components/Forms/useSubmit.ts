import { useForm, SubmitHandler, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { toast } from 'react-toastify';

interface ISignInForm {
  login: string;
  password: string;
  name: string;
}

export const useSubmit = (submitCallback: (...args: unknown[]) => Promise<void>) => {
  const { t } = useTranslation();

  const { handleSubmit, control } = useForm<ISignInForm>({
    reValidateMode: 'onBlur',
    mode: 'all',
  });

  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ISignInForm> = async ({ name, login, password }) => {
    try {
      await submitCallback(name, login, password);
    } catch (error) {
      if ((error as FetchBaseQueryError).status === 409) {
        toast(t('login_warning'), {
          containerId: 'warning',
        });
      } else if ((error as FetchBaseQueryError).status === 401) {
        toast(t('signIn_error'), {
          containerId: 'error',
        });
      } else if ((error as FetchBaseQueryError).status === 400) {
        toast(t('sendData_error'), {
          containerId: 'error',
        });
      }
    }
  };

  return { onSubmit: handleSubmit(onSubmit), control, errors };
};
