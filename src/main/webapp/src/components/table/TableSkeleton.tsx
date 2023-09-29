import { type ReactElement, type FC, type PropsWithChildren } from 'react';
import './TableSkeleton.scss';

const Loading = (): ReactElement => {
  return (
    <>
      <div className='element-loading' />
    </>
  );
};

const Th = (): ReactElement[] => {
  const elements = [];

  for (let i = 0; i < 4; i++) {
    elements.push(
      <th key={i}>
        <Loading />
      </th>,
    );
  }

  return elements;
};

const Tr = ({ children }: PropsWithChildren): ReactElement[] => {
  const elements = [];

  for (let i = 0; i < 4; i++) {
    elements.push(<tr key={i}>{children}</tr>);
  }

  return elements;
};

const Td = (): ReactElement[] => {
  const elements = [];
  for (let i = 0; i < 4; i++) {
    elements.push(
      <td key={i}>
        <Loading />
      </td>,
    );
  }

  return elements;
};

const TableSkeleton: FC = () => {
  return (
    <div className='cp-table__wrapper cp-table__wrapper--loading'>
      <table className='cp-table cp-table--loading'>
        <thead>
          <tr>
            <Th />
          </tr>
        </thead>
        <tbody>
          <Tr>
            <Td />
          </Tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
