import { type FC } from 'react';
import PageContent from '../components/page/PageContent';
import TableFilter from '../components/table/TableFilter';
import Table from '../components/table/Table';
import { useDataFetch } from '../hooks/useDataFetch';

const Logs: FC = () => {
  const { loading, data } = useDataFetch('http://localhost:8080/api/v1/logs');

  return (
    <PageContent>
      <h1>Logs</h1>
      <TableFilter />
      <Table headers={['1', '2', '3', '4', '5', '6']} data={data} loading={loading} />
    </PageContent>
  );
};

export default Logs;
