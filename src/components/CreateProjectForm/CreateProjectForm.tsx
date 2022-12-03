import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form';
import { boardsApi } from '../../types/types';
import { useTranslation } from 'react-i18next';
import { ICreateForm } from '../../types/types';
import { titleValidation, descriptionValidation } from '../../helper/validation';
import { useCreateBoardMutation } from '../../redux/query/BoardsQuery';
import { getUserCookie } from '../../helper/Helper';
import { toast } from 'react-toastify';

interface CreateForm {
  title: string;
  text: string;
}
interface ICreateProjectFormProps {
  projects?: boardsApi[];
  updateState?: (value: boolean) => void;
  updateProjects?: React.Dispatch<React.SetStateAction<boardsApi[]>>;
  typeOfForm: 'create_project' | string;
  callbackToSubmit?: SubmitHandler<ICreateForm>;
  callbackTaskToSubmit?: SubmitHandler<ICreateForm>;
  defaultData?: ICreateForm;
}

export const CreateProjectForm = (props: ICreateProjectFormProps) => {
  const { _id } = getUserCookie();
  const [createBoard, boardInfo] = useCreateBoardMutation();
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

  const onSubmit: SubmitHandler<CreateForm> = async (data) => {
    if (props.callbackTaskToSubmit) {
      if (props.defaultData) {
        try {
          props.callbackTaskToSubmit(data);
          toast(t('updateTask_success'), {
            containerId: 'success',
          });
        } catch (error) {
          toast(t('setData_error'), {
            containerId: 'error',
          });
        }
      } else {
        try {
          props.callbackTaskToSubmit(data);
          toast(t('task_success'), {
            containerId: 'success',
          });
        } catch (error) {
          toast(t('setData_error'), {
            containerId: 'error',
          });
        }
      }
    } else {
      try {
        await createBoard({
          title: data.title,
          owner: _id,
          users: [data.text],
        }).unwrap();
        props.updateState!(false);
        toast(t('project_success'), {
          containerId: 'success',
        });
      } catch (error) {
        toast(t('setData_error'), {
          containerId: 'error',
        });
      }
    }
  };

  const titleRules = titleValidation(t('validation_title', { returnObjects: true }));
  const descriptionRules = descriptionValidation(
    t('validation_description', { returnObjects: true })
  );

  return (
    <div draggable={false} className="create-project-form">
      <h2 className="create-project-form__title">{t(props.typeOfForm)}</h2>
      <form className="create-project__form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="title"
          rules={titleRules}
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
          rules={descriptionRules}
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
          {(props.defaultData && t('update_btn')) || t('create_btn')}
        </button>
      </form>
    </div>
  );
};
