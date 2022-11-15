import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form';
import { loginValidation, passwordValidation } from './CreateProjectValidation';

interface ISignInForm {
  login: string;
  password: string;
  name: string;
  text: string;
}
interface ISignInFormProps {
  page: string;
}

export const CreateProjectForm = ({ updateState }: { updateState: (value: boolean) => void }) => {
  const { handleSubmit, control } = useForm<ISignInForm>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ISignInForm> = (data) => console.log(data);

  return (
    <div className="create-project-form">
      <h2 className="create-project-form__title">Create Project</h2>
      <form className="create-project__form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="login"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              color="secondary"
              variant="outlined"
              label="TITLE"
              onChange={(e) => field.onChange(e)}
              value={field.value}
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
              label="DESCRIPTION"
              onChange={(e) => field.onChange(e)}
              value={field.value}
              size="small"
              className="create-project-form__textarea"
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
            />
          )}
        />
        <button
          className="button-border"
          onClick={() => {
            updateState(false);
          }}
        >
          Cancel
        </button>
        <button className="button-create button-black" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};
