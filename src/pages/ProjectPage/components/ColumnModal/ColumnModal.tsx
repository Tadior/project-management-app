import react from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../hooks/redux';
import { useFormState, Controller, useForm, SubmitHandler } from 'react-hook-form';
import { TextField } from '@mui/material';
import { loginValidation, passwordValidation } from './ColumnModalValidation';
import { useCreateColumnMutation } from '../../../../redux/query/ColumnsQuery';
import { columnApi } from '../../../../types/types';

interface IColumnModalForm {
  title: string;
}

interface IColumnModalProps {
  columns: columnApi[];
  updateModalState: (value: boolean) => void;
  updateColumnsState: (newColumns: columnApi[]) => void;
  currentId: string;
}

const ColumnModal = (props: IColumnModalProps) => {
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<IColumnModalForm>();
  const { errors } = useFormState({
    control,
  });
  const [createColumn, columnInfo] = useCreateColumnMutation();

  const onSubmit: SubmitHandler<IColumnModalForm> = async (data) => {
    const newColumn = await createColumn({
      id: props.currentId,
      body: {
        title: data.title,
        order: 0,
      },
    }).unwrap();
    const allColumns = [...props.columns].concat(newColumn);
    props.updateColumnsState(allColumns);
    props.updateModalState(false);
  };
  return (
    <div className="create-project-form">
      <h2 className="create-project-form__title">{t('create_column')}</h2>
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
