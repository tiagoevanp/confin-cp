import { useContext, type FC, type PropsWithChildren } from 'react';
import './Form.scss';
import Button from '../button/Button';
import ActionbarContext from '../../contexts/ActionbarContext';

type FormProps = PropsWithChildren<{
  handleSubmit: any;
  onSubmit: any;
  reset: () => void;
  loading?: boolean;
}>;

const Form: FC<FormProps> = ({ children, handleSubmit, onSubmit, reset, loading }) => {
  const { setRow } = useContext(ActionbarContext);
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
            setRow({
              id: '',
              name: '',
              marketplace: '',
              address: { street: '', number: 0, zip_code: '' },
              contact: [],
            });
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
