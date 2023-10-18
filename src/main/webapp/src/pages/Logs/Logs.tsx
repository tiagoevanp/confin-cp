import { type FC } from 'react';
import PageContent from '../../components/page/PageContent';
import Table from '../../components/table/Table';
import Page from '../../components/page/Page';
import { useDataFetch } from '../../hooks/useDataFetch';
import { tableColumns } from './tableColumns';
import { type Log } from '../../definitions/api/Log';

const Logs: FC = () => {
  const { data, loading, refetch } = useDataFetch<Log>('logs');

  return (
    <Page>
      <PageContent>
        <h1>Logs</h1>
        <Table data={data} loading={loading} columns={tableColumns} refetch={refetch} />
      </PageContent>
    </Page>
  );
};

export default Logs;
