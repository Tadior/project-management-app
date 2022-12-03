import { useTranslation } from 'react-i18next';
import { useFormState, Controller, useForm, SubmitHandler } from 'react-hook-form';
import { TextField } from '@mui/material';
import { useCreateColumnMutation } from '../../../../redux/query/ColumnsQuery';
import { columnApi } from '../../../../types/types';
import { columnApiWithTasks } from '../../../../types/types';
import { titleValidation } from '../../../../helper/validation';
import { toast } from 'react-toastify';
interface IColumnModalForm {
  title: string;
}

interface IColumnModalProps {
  columns: columnApi[];
  updateModalState: (value: boolean) => void;
  updateColumnsState: (newColumns: columnApiWithTasks[]) => void;
  currentId: string;
}

const ColumnModal = (props: IColumnModalProps) => {
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<IColumnModalForm>({
    reValidateMode: 'onBlur',
    mode: 'all',
  });
  const { errors } = useFormState({
    control,
  });
  const [createColumn, columnInfo] = useCreateColumnMutation();
  // Создает новую колонку, обновляет стейт с колонками, дописываем поле tasks так как без него ломается добавление задач в колонку при создании
  const onSubmit: SubmitHandler<IColumnModalForm> = async (data) => {
    try {
      const newColumn = await createColumn({
        id: props.currentId,
        body: {
          title: data.title,
          order: props.columns.length + 1,
        },
      }).unwrap();
      const allColumns = [...props.columns] as columnApiWithTasks[];
      const resultColumns = allColumns.concat({
        ...(newColumn as unknown as columnApiWithTasks),
        tasks: [],
      });
      props.updateColumnsState(resultColumns);
      props.updateModalState(false);
      toast(t('column_success'), {
        containerId: 'success',
      });
    } catch (error) {
      toast(t('setData_error'), {
        containerId: 'error',
      });
    }
  };

  const titleRules = titleValidation(t('validation_title', { returnObjects: true }));

  return (
    <div className="create-project-form">
      <h2 className="create-project-form__title">{t('create_column')}</h2>
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
              value={field.value}
              size="small"
              className="create-project-form__input"
              error={!!errors.title?.message}
              helperText={errors?.title?.message}
            />
          )}
        />
        <button
          className="button-border"
          onClick={() => {
            props.updateModalState(false);
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
export default ColumnModal;
