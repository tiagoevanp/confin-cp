import { useState, type FC } from 'react';
import './Table.scss';
import TableSkeleton from './TableSkeleton';
import TableEmpty from './TableEmpty';
import TableError from './TableError';
import {
  flexRender,
  useReactTable,
  type SortingState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type FilterFn,
} from '@tanstack/react-table';
import TableFilter from './TableFilter';
import { rankItem } from '@tanstack/match-sorter-utils';
import { useDebounce } from '../../hooks/useDebounce';

type TableProps = {
  data: any;
  columns: any;
  loading?: boolean;
};

const filterFn: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

const Table: FC<TableProps> = ({ data, columns, loading }) => {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const globalFilterDebounced = useDebounce(globalFilter, 500);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter: globalFilterDebounced,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: filterFn,
  });

  if (loading ?? false) return <TableSkeleton />;

  if (data === undefined) return <TableError />;

  if (data.length === 0) return <TableEmpty />;

  return (
    <>
      <TableFilter
        onChange={(value) => {
          setGlobalFilter(value ?? '');
        }}
        value={globalFilter}
      />
      <div className='cp-table__wrapper'>
        <table className='cp-table'>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div
                      className={`cp-table__th ${
                        header.column.getCanSort() ? 'cp-table__th--sortable' : ''
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <i
                        className={`cp-table__arrow ${
                          header.column.getIsSorted() !== false
                            ? `cp-table__arrow--${header.column.getIsSorted()}`
                            : ''
                        }`}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
