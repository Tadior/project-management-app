import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form';
import { loginValidation, passwordValidation, nameValidation } from '../../../helper/validation';
import { useTranslation } from 'react-i18next';
import MagicHat from '../../../assets/images/magic_hat.png';
import {
  useUpdateUserByidMutation,
  useDeleteUserByidMutation,
} from '../../../redux/query/UsersQuery';
import { deleteCookie, getUserCookie, setUserToCookie } from '../../../helper/Helper';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useFormValidationRules } from '../../../hooks/useFormValidationRules';

interface IEditForm {
  login: string;
  password: string;
  name: string;
}

export const EditForm = () => {
  const [confirmStatus, setConfirmStatus] = useState(false);
  const { loginRules, passwordRules, nameRules } = useFormValidationRules();
  const { _id, login, name, password } = getUserCookie()!;
  const [updateUser] = useUpdateUserByidMutation();
  const [deleteUser] = useDeleteUserByidMutation();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<IEditForm>({
    defaultValues: { name, login, password },
    reValidateMode: 'onBlur',
    mode: 'all',
  });
  const { errors } = useFormState({
    control,
  });
  const navigate = useNavigate();

  const onSave: SubmitHandler<IEditForm> = async (data) => {
    try {
      await updateUser({
        id: _id,
        body: { login: data.login, name: data.name, password: data.password },
      }).unwrap();
      setUserToCookie({
        _id,
        login: data.login,
        name: data.name,
        password: data.password,
      });
      toast(t('edit_success'), {
        containerId: 'success',
      });
    } catch (error) {
      if ((error as FetchBaseQueryError).status === 409) {
        toast(t('login_warning'), {
          containerId: 'warning',
        });
      } else if ((error as FetchBaseQueryError).status === 400) {
        toast(t('sendData_error'), {
          containerId: 'error',
        });
      }
    }
  };

  const onDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    setConfirmStatus(true);
  };
  const onCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    window.history.back();
  };

  const deleteAccount = async () => {
    try {
      await deleteUser({ id: _id }).unwrap();
      toast(t('deleteProfile_success'), {
        containerId: 'success',
      });
      deleteCookie('token');
      deleteCookie('userData');
      navigate('/');
    } catch (error) {
      toast(t('sendData_error'), {
        containerId: 'error',
      });
    }
  };
  return (
    <div className="edit-form">
      {confirmStatus && (
        <DeleteModal callbackDelete={deleteAccount} closeModal={() => setConfirmStatus(false)} />
      )}
      <img className="edit-form__hat" src={MagicHat} />
      <h2 className="edit-form__title">{t('profile_edit')}</h2>
      <form className="edit-form__form" onSubmit={handleSubmit(onSave)}>
        <Controller
          control={control}
          name="name"
          rules={nameRules}
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
              error={!!errors.name?.message}
              helperText={errors?.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="login"
          rules={loginRules}
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

        <Controller
          control={control}
          name="password"
          rules={passwordRules}
          render={({ field }) => (
            <TextField
              color="secondary"
              variant="outlined"
              label={t('sign_password')}
              onChange={(e) => field.onChange(e)}
              value={field.value}
              fullWidth={true}
              size="small"
              className="edit-form__input"
              error={!!errors.password?.message}
              helperText={errors?.password?.message}
            />
          )}
        />
        <div className="edit-form__btns">
          <div className="edit-form__action-btns">
            <button onClick={onCancel} className="edit__cancel button-border">
              {t('cancel_btn')}
            </button>
            <button className="edit__save button-black" type="submit">
              {t('save_btn')}
            </button>
          </div>
          <button onClick={onDelete} className="edit-form__delete-btn">
            {t('delete_account_btn')}
          </button>
        </div>
      </form>
    </div>
  );
};
