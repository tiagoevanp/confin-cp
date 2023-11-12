import { createColumnHelper } from '@tanstack/react-table';
import DeleteAction from '../../components/table/actions/DeleteAction';
import EditAction from '../../components/table/actions/EditActions';
import { type FixedCost } from '../../definitions/api/FixedCost';
import { valueMask } from '../../hooks/useValueMask';

const columnHelper = createColumnHelper<FixedCost>();

export const tableColumns = [
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.getValue(),
    sortDescFirst: false,
  }),
  columnHelper.accessor('value', {
    header: () => 'Valor',
    cell: (info) => `R$ ${valueMask(info.getValue()).replace('.', ',')}`,
    sortDescFirst: false,
  }),
  columnHelper.accessor((row) => 'actions', {
    id: 'actions',
    minSize: 100,
    header: () => 'Actions',
    cell: ({ row }) => (
      <>
        <EditAction id={row.original.id} />
        <DeleteAction id={row.original.id} endpoint='fixed-cost' />
      </>
    ),
  }),
];