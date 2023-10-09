import { createColumnHelper } from '@tanstack/react-table';
import DeleteAction from '../../components/table/actions/DeleteAction';
import EditAction from '../../components/table/actions/EditActions';
import { type Supply } from '../../definitions/api/Supply';
import { moneyMask } from '../../hooks/useMoneyMask';
import { dateMask } from '../../hooks/useDateMask';

const columnHelper = createColumnHelper<Supply>();

export const tableColumns = [
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.getValue(),
    sortDescFirst: false,
  }),
  columnHelper.accessor('supplier_id.label', {
    header: () => 'Fornecedor',
    cell: (info) => info.getValue(),
    sortDescFirst: false,
  }),
  columnHelper.accessor('purchase.date', {
    header: () => 'Data de Compra',
    cell: (info) => dateMask(info.getValue()),
    sortDescFirst: false,
  }),
  columnHelper.accessor('purchase.value', {
    header: () => 'Valor de Compra',
    cell: (info) => `R$ ${moneyMask(info.getValue().toString(), ',')}`,
    sortDescFirst: false,
  }),
  columnHelper.accessor('purchase.quantity', {
    header: () => 'Quantidade',
    cell: (info) => info.getValue(),
    sortDescFirst: false,
  }),
  columnHelper.accessor('purchase.discount_percentage', {
    header: () => 'Porcentagem de Desconto',
    cell: (info) => `${info.getValue()}%`,
    sortDescFirst: false,
  }),
  columnHelper.accessor('purchase.discount_value', {
    header: () => 'Valor de Desconto',
    cell: (info) => `R$ ${moneyMask(info.getValue().toString(), ',')}`,
    sortDescFirst: false,
  }),
  columnHelper.accessor((row) => 'actions', {
    id: 'actions',
    minSize: 100,
    header: () => 'Actions',
    cell: ({ row }) => (
      <>
        <EditAction id={row.original.id} />
        <DeleteAction id={row.original.id} endpoint='supply' />
      </>
    ),
  }),
];
