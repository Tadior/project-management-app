import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form';
import { loginValidation } from '../../../components/AuthForm/validation';
import { useTranslation } from 'react-i18next';
import MagicHat from '../../../assets/images/magic_hat.png';

interface ISignInForm {
  login: string;
  password: string;
  name: string;
}

export const EditForm = () => {
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<ISignInForm>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ISignInForm> = (data) => console.log(data);

  return (
    <div className="edit-form">
      <img className="edit-form__hat" src={MagicHat} />
      <h2 className="edit-form__title">{t('profile_edit')}</h2>
      <form className="edit-form__form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              color="secondary"
              variant="outlined"
              label={t('sign_name')}
              onChange={(e) => field.onChange(e)}
              value={field.value}
              fullWidth={true}
              size="small"
              className="edit-form__input"
              error={!!errors.login?.message}
              helperText={errors?.login?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="login"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              color="secondary"
              variant="outlined"
              label={t('sign_login')}
              onChange={(e) => field.onChange(e)}
              value={field.value}
              fullWidth={true}
              size="small"
              className="edit-form__input"
              error={!!errors.login?.message}
              helperText={errors?.login?.message}
            />
          )}
        />
        <div className="edit-form__btns">
          <div className="edit-form__action-btns">
            <button className="edit__cancel button-border">{t('cancel_btn')}</button>
            <button className="edit__save button-black" type="submit">
              {t('save_btn')}
            </button>
          </div>
          <button className="edit-form__delete-btn">{t('delete_account_btn')}</button>
        </div>
      </form>
    </div>
  );
};
