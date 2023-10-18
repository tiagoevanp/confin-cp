import { type FC } from 'react';
import PageContent from '../../components/page/PageContent';
import Table from '../../components/table/Table';
import { useDataFetch } from '../../hooks/useDataFetch';
import PageActionBar from '../../components/page/PageActionbar';
import { tableColumns } from './tableColumns';
import Page from '../../components/page/Page';
import Actionbar from '../../components/actionbar/Actionbar';
import ActionbarProvider from '../../providers/ActionbarProvider';
import { type FixedCost } from '../../definitions/api/FixedCost';

const FixedCosts: FC = () => {
  const { data, loading, refetch } = useDataFetch<FixedCost>('fixed-cost');

  return (
    <ActionbarProvider refetch={refetch}>
      <Page>
        <PageContent>
          <h1>Custos Fixos</h1>
          <Table data={data} columns={tableColumns} loading={loading} refetch={refetch} />
        </PageContent>
        <PageActionBar>
          <Actionbar />
        </PageActionBar>
      </Page>
    </ActionbarProvider>
  );
};

export default FixedCosts;
