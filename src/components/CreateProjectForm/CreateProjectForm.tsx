import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form';
import { loginValidation, passwordValidation } from './CreateProjectValidation';
import { boardsApi } from '../../types/types';
import { useTranslation } from 'react-i18next';
import { ICreateForm } from '../../types/types';
import {
  titleValidation,
  descriptionValidation,
  titleValidationRu,
  descriptionValidationRu,
} from '../../helper/validation';
import { useCreateBoardMutation } from '../../redux/query/BoardsQuery';
import { useAppSelector } from '../../hooks/redux';
import { getCookieToken } from '../../helper/Helper';

interface CreateForm {
  title: string;
  text: string;
}
interface ICreateProjectFormProps {
  projects?: boardsApi[];
  updateState?: (value: boolean) => void;
  updateProjects?: React.Dispatch<React.SetStateAction<boardsApi[]>>;
  typeOfForm: string;
  callbackToSubmit?: SubmitHandler<ICreateForm>;
  callbackTaskToSubmit?: SubmitHandler<ICreateForm>;
  defaultData?: ICreateForm;
}

export const CreateProjectForm = (props: ICreateProjectFormProps) => {
  const { _id } = useAppSelector((state) => state.userReducer.userData);
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<CreateForm>({
    reValidateMode: 'onBlur',
    mode: 'all',
    defaultValues: {
      title: props.defaultData?.title ? props.defaultData?.title : '',
      text: props.defaultData?.text ? props.defaultData?.text : '',
    },
  });
  const { errors } = useFormState({
    control,
  });
  const [createBoard, boardInfo] = useCreateBoardMutation();
  // console.log(props.defaultData);

  // const onSubmit: SubmitHandler<CreateForm> = async (data) => {
  //   const newProject = await createBoard({
  //     title: data.title,
  //     owner: _id,
  //     users: [data.text],
  //   }).unwrap();
  //   const allProjects = [...props.projects!].concat(newProject);
  //   props.updateProjects!(allProjects);
  //   props.updateState!(false);
  // };

  const lang = getCookieToken('i18next');

  return (
    <div className="create-project-form">
      <h2 className="create-project-form__title">{t(props.typeOfForm)}</h2>
      <form
        className="create-project__form"
        onSubmit={
          props.callbackToSubmit
            ? handleSubmit(props.callbackToSubmit)
            : handleSubmit(props.callbackTaskToSubmit!)
        }
      >
        <Controller
          control={control}
          name="title"
          rules={lang === 'en' ? titleValidation : titleValidationRu}
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
          rules={lang === 'en' ? descriptionValidation : descriptionValidationRu}
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
