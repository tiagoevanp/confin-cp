import { createColumnHelper } from '@tanstack/react-table';
import DeleteAction from '../../components/table/actions/DeleteAction';
import EditAction from '../../components/table/actions/EditActions';
import { type Product } from '../../definitions/api/Product';
import { valueMask } from '../../hooks/useValueMask';
import { type Sales } from '../../definitions/Sales';
import { type Business } from '../../definitions/api/config/Business';
import { type Supply } from '../../definitions/api/Supply';

const columnHelper = createColumnHelper<Product & Sales>();

export const tableColumns = (externalData: {
  configs: Record<string, Omit<Business, 'id'>>;
  supplies: Supply[];
}): any => {
  return [
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
    columnHelper.accessor('purchase.value', {
      header: () => 'Compra (un)',
      cell: (info) =>
        `R$ ${(Number(valueMask(info.getValue())) / info.row.original.purchase.quantity)
          .toFixed(2)
          .replace('.', ',')}`,
      sortDescFirst: false,
    }),
    columnHelper.accessor('price_credit_card', {
      header: () => 'Venda (un)',
      cell: ({ row: { original } }) => {
        const price =
          ((Number(valueMask(original.purchase.value)) / original.purchase.quantity) *
            Number(valueMask(original.profit_percentage))) /
          100;
        const credit_card_fee =
          (price * Number(valueMask(externalData.configs.credit_card_fee.value))) / 100;

        const supply_value = externalData.supplies
          .filter((supply) => original.supply_id.some((option) => option.value === supply.id))
          .reduce(
            (acc, supply) =>
              acc + Number(valueMask(supply.purchase.value)) / supply.purchase.quantity,
            0,
          );
        return `R$ ${(price + credit_card_fee + supply_value).toFixed(2).replace('.', ',')}`;
      },
      sortDescFirst: false,
    }),
    columnHelper.accessor('profit_percentage', {
      header: () => 'Lucro Percentual',
      cell: (info) => `${valueMask(info.getValue()).replace('.', ',')}%`,
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
};
