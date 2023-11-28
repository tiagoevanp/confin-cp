import { createColumnHelper } from '@tanstack/react-table';
import { type Supplier } from '../../definitions/api/Supplier';
import DeleteAction from '../../components/table/actions/DeleteAction';
import EditAction from '../../components/table/actions/EditActions';

const columnHelper = createColumnHelper<Supplier>();

export const tableColumns = [
  columnHelper.accessor('name', {
    header: () => 'Nome',
    cell: (info) => info.getValue(),
    sortDescFirst: false,
  }),
  columnHelper.accessor('marketplace', {
    header: () => 'Marketplace',
    cell: (info) => info.getValue(),
    sortDescFirst: false,
  }),
  columnHelper.accessor('address_street', {
    header: () => 'Logradouro',
    cell: (info) => {
      return info.getValue();
    },
    sortDescFirst: false,
  }),
  columnHelper.accessor('address_number', {
    header: () => 'Número',
    cell: (info) => {
      return info.getValue();
    },
    sortDescFirst: false,
  }),
  columnHelper.accessor('address_zip_code', {
    header: () => 'CEP',
    cell: (info) => {
      return info.getValue();
    },
    sortDescFirst: false,
  }),
  columnHelper.accessor('contact_email', {
    header: 'E-mail',
    cell: (info) => info.getValue()?.join(', '),
    sortDescFirst: false,
  }),

  columnHelper.accessor('contact_phone_number', {
    header: 'Número de Telefone',
    cell: (info) => info.getValue()?.join(', '),
    sortDescFirst: false,
  }),
  columnHelper.accessor((row) => 'actions', {
    id: 'actions',
    minSize: 100,
    header: () => 'Actions',
    cell: ({ row }) => (
      <>
        <EditAction id={row.original.id} />
        <DeleteAction id={row.original.id} endpoint='supplier' />
      </>
    ),
  }),
];
