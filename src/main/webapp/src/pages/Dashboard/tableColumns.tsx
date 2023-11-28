import { createColumnHelper } from '@tanstack/react-table';
import { valueMask } from '../../hooks/useValueMask';
import { type Profit } from '../../definitions/api/Product';

const columnHelper = createColumnHelper<Profit>();

export const tableColumns = [
  columnHelper.accessor('name', {
    header: () => 'Nome',
    cell: (info) => info.getValue(),
    sortDescFirst: false,
  }),
  columnHelper.accessor('profit_percentage', {
    header: () => 'Lucro',
    cell: (info) => valueMask(info.getValue()),
    sortDescFirst: false,
  }),
];
