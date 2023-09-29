import { type FC } from 'react';
import './TableError.scss';
import Icon from '../icon/Icon';

const TableError: FC = () => {
  return (
    <div className='cp-table__wrapper'>
      <div className='cp-table-error'>
        <h2>Erro!</h2>
        <Icon name='sad' variant='danger' />
        <p>Alguma coisa deu errado ao carregar os dados</p>
      </div>
    </div>
  );
};

export default TableError;
