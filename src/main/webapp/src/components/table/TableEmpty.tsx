import { type FC } from 'react';
import './TableEmpty.scss';
import Icon from '../icon/Icon';

const TableEmpty: FC = () => {
  return (
    <div className='cp-table__wrapper'>
      <div className='cp-table-empty'>
        <h2>Sem Dados</h2>
        <Icon name='empty' variant='blue-dark' />
        <p>Não foram encontrados dados para montar a tabela</p>
      </div>
    </div>
  );
};

export default TableEmpty;
