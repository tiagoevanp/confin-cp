import { type FC, type PropsWithChildren } from 'react';
import './Form.scss';
import Button from '../button/Button';
import { usePathResolver } from '../../hooks/usePathResolver';

type FormProps = PropsWithChildren<{
  handleSubmit: any;
  onSubmit: any;
  reset: () => void;
  loading?: boolean;
}>;

const Form: FC<FormProps> = ({ children, handleSubmit, onSubmit, reset, loading }) => {
  const { action } = usePathResolver();
  return (
    <form className='cp-form' noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className='cp-form__inputs'>{children}</div>
      <div className='cp-form__buttons'>
        <Button type='submit' variant='success' grow loading={loading}>
          {action === 'add' ? 'Adicionar' : 'Editar'}
        </Button>
        <Button
          variant='danger'
          grow
          onClick={() => {
            reset();
          }}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default Form;
