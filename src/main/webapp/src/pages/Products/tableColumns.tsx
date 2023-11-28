import { createColumnHelper } from '@tanstack/react-table';
import DeleteAction from '../../components/table/actions/DeleteAction';
import EditAction from '../../components/table/actions/EditActions';
import { valueMask } from '../../hooks/useValueMask';
import { type Deal } from '../../definitions/api/Deal';

const columnHelper = createColumnHelper<Deal>();

export const tableColumns = [
  columnHelper.accessor('name', {
    header: () => 'Nome',
    cell: (info) => info.getValue(),
    sortDescFirst: false,
  }),
  columnHelper.accessor('supplier_id.label', {
    header: () => 'Fornecedor',
    cell: (info) => info.getValue(),
    sortDescFirst: false,
  }),
  columnHelper.accessor('cost', {
    header: () => 'Compra (un)',
    cell: (info) => valueMask(info.getValue()),
    sortDescFirst: false,
  }),
  columnHelper.accessor('price', {
    header: () => 'Venda (un)',
    cell: (info) => valueMask(info.getValue()),
    sortDescFirst: false,
  }),
  columnHelper.accessor('profit_percentage', {
    header: () => 'Lucro Percentual',
    cell: (info) => valueMask(info.getValue()),
    sortDescFirst: false,
  }),
  columnHelper.accessor((row) => 'actions', {
    id: 'actions',
    minSize: 100,
    header: () => 'Actions',
    cell: ({ row }) => (
      <>
        <EditAction id={row.original.id} />
        <DeleteAction id={row.original.id} endpoint='product' />
      </>
    ),
  }),
];
