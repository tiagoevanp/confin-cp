import { type FC } from 'react';
import PageContent from '../../components/page/PageContent';
import Table from '../../components/table/Table';
import Page from '../../components/page/Page';
import { useDataFetch } from '../../hooks/useDataFetch';
import { tableColumns } from './tableColumns';

const Logs: FC = () => {
  const { data, loading } = useDataFetch('logs');

  return (
    <Page>
      <PageContent>
        <h1>Logs</h1>
        <Table data={data} loading={loading} columns={tableColumns} />
      </PageContent>
    </Page>
  );
};

export default Logs;
