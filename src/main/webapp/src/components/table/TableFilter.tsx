import { type FC } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import './TableFilter.scss';

const TableFilter: FC = () => {
  return (
    <div className='cp-table-filter'>
      <Input style={{ width: '400px' }} type='text' placeholder='Filtro' />
      <Button onClick={() => {}}>Filtrar</Button>
    </div>
  );
};

export default TableFilter;
