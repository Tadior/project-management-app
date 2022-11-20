import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form';
import { loginValidation, passwordValidation } from './CreateProjectValidation';
import { useTranslation } from 'react-i18next';

interface ISignInForm {
  login: string;
  password: string;
  name: string;
  text: string;
}
interface ISignInFormProps {
  page: string;
}

export const CreateProjectForm: React.FC = () => {
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<ISignInForm>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ISignInForm> = (data) => console.log(data);

  return (
    <div className="create-project-form">
      <h2 className="create-project-form__title">{t('create_project')}</h2>
      <form className="create-project__form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="login"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              color="secondary"
              variant="outlined"
              label={t('create_title')}
              onChange={(e) => field.onChange(e)}
              value={field.value || ''}
              size="small"
              className="create-project-form__input"
              error={!!errors.login?.message}
              helperText={errors?.login?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="text"
          rules={passwordValidation}
          render={({ field }) => (
            <TextField
              color="secondary"
              variant="outlined"
              multiline
              rows={10}
              label={t('create_desc')}
              onChange={(e) => field.onChange(e)}
              value={field.value || ''}
              size="small"
              className="create-project-form__textarea"
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
            />
          )}
        />
        <button className="button-border">{t('cancel_btn')}</button>
        <button className="button-create button-black" type="submit">
          {t('create_btn')}
        </button>
      </form>
    </div>
  );
};
