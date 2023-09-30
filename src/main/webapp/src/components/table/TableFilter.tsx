import { type FC } from 'react';
import Input from '../input/Input';
import './TableFilter.scss';

type TableFilterProps = {
  onChange: (value?: string) => void;
  value: string;
};

const TableFilter: FC<TableFilterProps> = ({ onChange, value }) => {
  return (
    <div className='cp-table-filter'>
      <Input
        style={{ width: '400px' }}
        name='filter'
        type='text'
        placeholder='Filtro'
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
      />
    </div>
  );
};

export default TableFilter;
