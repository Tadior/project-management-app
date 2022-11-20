import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form';
import { loginValidation, passwordValidation } from '../../../components/AuthForm/validation';
import { useTranslation } from 'react-i18next';
import MagicHat from '../../../assets/images/magic_hat.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  useUpdateUserByidMutation,
  useDeleteUserByidMutation,
} from '../../../redux/query/UsersQuery';
import { userSlice } from '../../../redux/reducer/UserSlice';
import { deleteCookieToken } from '../../../helper/Helper';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';

interface IEditForm {
  login: string;
  password: string;
  name: string;
}

export const EditForm = () => {
  const [confirmStatus, setConfirmStatus] = useState(false);
  const { _id, login, name, password } = useAppSelector((state) => state.userReducer.userData);
  const [updateUser, userData] = useUpdateUserByidMutation();
  const [deleteUser, deleteData] = useDeleteUserByidMutation();
  const { setUserData, resetUserData } = userSlice.actions;
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<IEditForm>({
    defaultValues: { name, login, password },
  });
  const { errors } = useFormState({
    control,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSave: SubmitHandler<IEditForm> = async (data) => {
    try {
      await updateUser({
        id: _id,
        body: { login: data.login, name: data.name, password: data.password },
      })
        .unwrap()
        .then(() => {
          console.log('success');
          dispatch(
            setUserData({
              _id,
              login: data.login,
              name: data.name,
              password: data.password,
            })
          );
        });
    } catch (error) {
      console.log('show toast');
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
      await deleteUser({ id: _id })
        .unwrap()
        .then(() => {
          console.log('success delete');
          dispatch(resetUserData());
          deleteCookieToken();
          navigate('/');
        });
    } catch (error) {
      console.log('error toast');
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

        <Controller
          control={control}
          name="password"
          rules={passwordValidation}
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
              error={!!errors.login?.message}
              helperText={errors?.login?.message}
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
