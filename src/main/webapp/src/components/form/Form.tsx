import { type FC, type PropsWithChildren } from 'react';
import './Form.scss';
import Button from '../button/Button';

type FormProps = PropsWithChildren<{
  handleSubmit: any;
  onSubmit: any;
  reset: () => void;
  loading?: boolean;
}>;

const Form: FC<FormProps> = ({ children, handleSubmit, onSubmit, reset, loading }) => {
  return (
    <form className='cp-form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='cp-form__inputs'>{children}</div>
      <div className='cp-form__buttons'>
        <Button type='submit' variant='success' grow loading={loading}>
          Adicionar
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
