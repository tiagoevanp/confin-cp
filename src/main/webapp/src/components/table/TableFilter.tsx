import { useRef, type FC } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import './TableFilter.scss';

type TableFilterProps = {
  onClick: (value?: string) => void;
};

const TableFilter: FC<TableFilterProps> = ({ onClick }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className='cp-table-filter'>
      <Input style={{ width: '400px' }} name='filter' type='text' placeholder='Filtro' ref={ref} />
      <Button
        onClick={() => {
          onClick(ref.current?.value);
        }}
      >
        Filtrar
      </Button>
    </div>
  );
};

export default TableFilter;
