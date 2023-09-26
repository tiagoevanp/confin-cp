import { useCallback, useMemo, useState } from 'react';

type Data = Array<{ id: string }>;

type DataReturn = Array<{ id: string; values: string[] }>;
type useDataTableReturn = {
  data: DataReturn;
  sortBy: (columnIndex: number, direction: number) => void;
};

export const useDataTable = (data: Data): useDataTableReturn => {
  const mappedData = useMemo(
    () =>
      data.map((row) => {
        const id = row.id;

        // @ts-expect-error-next-line
        delete row.id;

        return {
          id,
          values: Object.values(row).map((value: any) => {
            return String(value);
          }),
        };
      }),
    [data],
  );

  const [dataState, setDataState] = useState(mappedData);

  const sortBy = useCallback(
    (columnIndex: number, direction: number) => {
      if (direction === 0) {
        mappedData.sort((a, b) => {
          if (+a.id < +b.id) {
            return -1;
          }
          if (+a.id > +b.id) {
            return 1;
          }
          return 0;
        });
      }
      if (direction === 1) {
        mappedData.sort((a, b) => {
          if (a.values[columnIndex] < b.values[columnIndex]) {
            return -1;
          }
          if (a.values[columnIndex] > b.values[columnIndex]) {
            return 1;
          }
          return 0;
        });
      }
      if (direction === 2) {
        mappedData.sort((a, b) => {
          if (a.values[columnIndex] > b.values[columnIndex]) {
            return -1;
          }
          if (a.values[columnIndex] < b.values[columnIndex]) {
            return 1;
          }
          return 0;
        });
      }

      setDataState([...mappedData]);
    },
    [mappedData],
  );

  return { data: dataState, sortBy };
};
