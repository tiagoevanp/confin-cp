import { createColumnHelper } from '@tanstack/react-table';
import { type Supplier } from '../../definitions/api/Supplier';

const columnHelper = createColumnHelper<Supplier>();

export const tableColumns = [
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.getValue(),
    sortDescFirst: false,
  }),
  columnHelper.accessor('marketplace', {
    header: () => 'Marketplace',
    cell: (info) => info.getValue(),
    sortDescFirst: false,
  }),
  columnHelper.accessor('address.street', {
    header: () => 'Logradouro',
    cell: (info) => {
      return info.getValue();
    },
    sortDescFirst: false,
  }),
  columnHelper.accessor('address.number', {
    header: () => 'Número',
    cell: (info) => {
      return info.getValue();
    },
    sortDescFirst: false,
  }),
  columnHelper.accessor('address.zip_code', {
    header: () => 'CEP',
    cell: (info) => {
      return info.getValue();
    },
    sortDescFirst: false,
  }),
  columnHelper.accessor('contact.email', {
    header: 'E-mail',
    cell: (info) => info.getValue()?.join(', '),
    sortDescFirst: false,
  }),

  columnHelper.accessor('contact.phone_number', {
    header: 'Número de Telefone',
    cell: (info) => info.getValue()?.join(', '),
    sortDescFirst: false,
  }),
];
