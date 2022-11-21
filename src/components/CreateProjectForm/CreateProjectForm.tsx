import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form';
import { loginValidation, passwordValidation } from './CreateProjectValidation';
import { boardsApi } from '../../types/types';
import { useTranslation } from 'react-i18next';
import { ICreateForm } from '../../types/types';

interface ICreateProjectFormProps {
  projects?: boardsApi[];
  updateState?: (value: boolean) => void;
  updateProjects?: React.Dispatch<React.SetStateAction<boardsApi[]>>;
  typeOfForm: string;
  callbackToSubmit: SubmitHandler<ICreateForm>;
}

export const CreateProjectForm = (props: ICreateProjectFormProps) => {
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<ICreateForm>();
  const { errors } = useFormState({
    control,
  });

  return (
    <div className="create-project-form">
      <h2 className="create-project-form__title">{t(props.typeOfForm)}</h2>
      <form className="create-project__form" onSubmit={handleSubmit(props.callbackToSubmit)}>
        <Controller
          control={control}
          name="title"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              color="secondary"
              variant="outlined"
              label={t('create_title')}
              onChange={(e) => field.onChange(e)}
              value={field.value}
              size="small"
              className="create-project-form__input"
              error={!!errors.title?.message}
              helperText={errors?.title?.message}
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
              value={field.value}
              size="small"
              className="create-project-form__textarea"
              error={!!errors?.text?.message}
              helperText={errors?.text?.message}
            />
          )}
        />
        <button
          className="button-border"
          onClick={() => {
            props.updateState!(false);
          }}
        >
          {t('cancel_btn')}
        </button>
        <button className="button-create button-black" type="submit">
          {t('create_btn')}
        </button>
      </form>
    </div>
  );
};
