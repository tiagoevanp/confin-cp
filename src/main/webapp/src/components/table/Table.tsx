import { useState, type FC, useEffect } from 'react';
import Button from '../button/Button';
import './Table.scss';
import { useClockwise } from '../../hooks/useClockwise';

type Action =
  | {
      edit: (id: string) => void;
    }
  | {
      delete: (id: string) => void;
    };

type TableProps = {
  data: Array<{ id: string; values: string[] }>;
  sortBy?: (index: number, direction: number) => void;
  headers: string[];
  actions?: Action[];
};

const isEdit = (action: Action): action is { edit: (id: string) => void } => {
  return (action as { edit: (id: string) => void }).edit !== undefined;
};

const Table: FC<TableProps> = ({ data, headers, sortBy, actions }) => {
  const [headerIndex, setHeaderIndex] = useState<number | null>(null);
  const [state, tick, resetClock] = useClockwise(3);

  useEffect(() => {
    if (headerIndex !== null) {
      sortBy?.(headerIndex, state);
    }
  }, [headerIndex, sortBy, state]);

  return (
    <div className='cp-table__wrapper'>
      <table className='cp-table'>
        <thead>
          <tr>
            {headers.map((item, index) => (
              <th
                key={index}
                onClick={() => {
                  setHeaderIndex(index);
                  if (headerIndex !== index) {
                    resetClock();
                  }
                  tick();
                }}
              >
                <div className='cp-table__th'>
                  {item}
                  <i
                    className={`cp-table__arrow ${
                      headerIndex === index ? `cp-table__arrow--${state}` : ''
                    }`}
                  />
                </div>
              </th>
            ))}
            {actions !== undefined && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            return (
              <tr key={index}>
                {row.values.map((item, index) => {
                  return <td key={index}>{item}</td>;
                })}
                {actions !== undefined && (
                  <td>
                    {actions.map((action, index) => {
                      return (
                        <Button
                          key={index}
                          square
                          name={isEdit(action) ? 'edit' : 'delete'}
                          onClick={(e) => {
                            isEdit(action) ? action.edit(row.id) : action.delete(row.id);
                          }}
                        />
                      );
                    })}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
