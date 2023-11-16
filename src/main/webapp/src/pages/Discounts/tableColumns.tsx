import { createColumnHelper } from '@tanstack/react-table';
import DeleteAction from '../../components/table/actions/DeleteAction';
import EditAction from '../../components/table/actions/EditActions';
import { type Discount } from '../../definitions/api/Discount';
import { valueMask } from '../../hooks/useValueMask';

const columnHelper = createColumnHelper<Discount>();

export const tableColumns = [
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.getValue(),
    sortDescFirst: false,
  }),
  columnHelper.accessor('value', {
    header: () => 'Valor',
    cell: (info) => valueMask(info.getValue()),
    sortDescFirst: false,
  }),
  columnHelper.accessor('type', {
    header: () => 'Tipo',
    cell: (info) => {
      return info.getValue().label;
    },
    sortDescFirst: false,
  }),
  columnHelper.accessor((row) => 'actions', {
    id: 'actions',
    minSize: 100,
    header: () => 'Actions',
    cell: ({ row }) => (
      <>
        <EditAction id={row.original.id} />
        <DeleteAction id={row.original.id} endpoint='discount' />
      </>
    ),
  }),
];
