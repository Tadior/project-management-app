import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form';
import { loginValidation, passwordValidation } from './CreateProjectValidation';
import { useCreateBoardMutation } from '../../../../redux/query/BoardsQuery';
import { boardsApi } from '../../../../types/types';
import { useTranslation } from 'react-i18next';

interface ISignInForm {
  title: string;
  text: string;
}
interface ICreateProjectFormProps {
  projects: boardsApi[];
  updateState: (value: boolean) => void;
  // currentId: string; //???
}

export const CreateProjectForm = (props: ICreateProjectFormProps) => {
  const [createBoard, boardInfo] = useCreateBoardMutation();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<ISignInForm>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ISignInForm> = async (data) => {
    await createBoard({
      title: data.title,
      owner: '63750723f4352c2e788f613e',
      users: [data.text],
    }).unwrap();
    props.updateState(false);
  };

  return (
    <div className="create-project-form">
      <h2 className="create-project-form__title">{t('create_project')}</h2>
      <form className="create-project__form" onSubmit={handleSubmit(onSubmit)}>
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
              value={field.value || ''}
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
              value={field.value || ''}
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
            props.updateState(false);
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
