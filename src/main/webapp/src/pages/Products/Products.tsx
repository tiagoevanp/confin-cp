import { type FC } from 'react';
import PageContent from '../../components/page/PageContent';
import Table from '../../components/table/Table';
import { useDataFetch } from '../../hooks/useDataFetch';
import PageActionBar from '../../components/page/PageActionbar';
import { tableColumns } from './tableColumns';
import Page from '../../components/page/Page';
import Actionbar from '../../components/actionbar/Actionbar';
import ActionbarProvider from '../../providers/ActionbarProvider';
import { useConfigs } from '../../hooks/useConfigs';
import { useTableColumnsWithData } from '../../hooks/useTableColumnsWithData';
import { type Business } from '../../definitions/api/config/Business';
import { type Supply } from '../../definitions/api/Supply';

const Products: FC = () => {
  const { data, loading, refetch } = useDataFetch('product');
  const { data: supplies, loading: suppliesLoading } = useDataFetch<Supply>('supply');

  const configs = useConfigs(['pix_fee', 'credit_card_fee', 'bank_slip_fee']);

  const tableColumnsWithData = useTableColumnsWithData<{
    configs: Record<string, Omit<Business, 'id'>>;
    supplies: Supply[];
  }>({ configs, supplies }, tableColumns);

  return (
    <ActionbarProvider refetch={refetch}>
      <Page>
        <PageContent>
          <h1>Produtos</h1>
          <Table
            data={data}
            columns={tableColumnsWithData}
            loading={loading || suppliesLoading}
            refetch={refetch}
          />
        </PageContent>
        <PageActionBar>
          <Actionbar />
        </PageActionBar>
      </Page>
    </ActionbarProvider>
  );
};

export default Products;
