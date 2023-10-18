import { useMemo, type FC, type PropsWithChildren } from 'react';
import './Form.scss';
import Button from '../button/Button';
import { usePathResolver } from '../../hooks/usePathResolver';

type FormProps = PropsWithChildren<{
  handleSubmit: any;
  onSubmit: any;
  reset: () => void;
  loading?: boolean;
  disabled?: boolean;
}>;

const Form: FC<FormProps> = ({ children, handleSubmit, onSubmit, reset, loading, disabled }) => {
  const { action } = usePathResolver();

  const buttonLabel = useMemo(() => {
    if (action === 'add') {
      return 'Adicionar';
    } else if (action === 'edit') {
      return 'Editar';
    }
    return 'Salvar';
  }, [action]);

  return (
    <form className='cp-form' noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className='cp-form__inputs'>{children}</div>
      <div className='cp-form__buttons'>
        <Button type='submit' variant='success' grow loading={loading} disabled={disabled}>
          {buttonLabel}
        </Button>
        <Button variant='danger' grow onClick={reset}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default Form;
