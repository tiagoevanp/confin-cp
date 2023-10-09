import { createColumnHelper } from '@tanstack/react-table';
import { type Log } from '../../definitions/api/Log';

const columnHelper = createColumnHelper<Log>();

export const tableColumns = [
  columnHelper.accessor('ip', {
    header: () => 'IP',
    cell: (info) => info.getValue(),
    sortDescFirst: false,
  }),
  columnHelper.accessor('uri', {
    header: () => 'URI',
    cell: (info) => info.getValue(),
    sortDescFirst: false,
  }),
  columnHelper.accessor('method', {
    header: () => 'Método',
    cell: (info) => {
      return info.getValue();
    },
    sortDescFirst: false,
  }),
  columnHelper.accessor('timestamp', {
    header: () => 'Data e Hora',
    cell: (info) => {
      return new Date(info.getValue()).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });
    },
    sortDescFirst: false,
  }),
  columnHelper.accessor('payloadId', {
    header: () => 'ID do Payload',
    cell: (info) => {
      return info.getValue();
    },
    sortDescFirst: false,
  }),
];
