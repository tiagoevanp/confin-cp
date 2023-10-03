import { useMemo, type FC, useState } from 'react';
import PageContent from '../../components/page/PageContent';
import Table from '../../components/table/Table';
import { useDataFetch } from '../../hooks/useDataFetch';
import PageActionBar from '../../components/page/PageActionbar';
import { tableColumns } from './tableColumns';
import Page from '../../components/page/Page';
import ActionbarContext from '../../contexts/ActionbarContext';
import Actionbar from '../../components/actionbar/Actionbar';

const Suppliers: FC = () => {
  const { data, loading, refetch } = useDataFetch('supplier');

  const [hidden, setHidden] = useState(true);

  const actionbarContextValue = useMemo(
    () => ({
      hidden,
      hide: () => {
        setHidden(true);
      },
      show: () => {
        setHidden(false);
      },
      reloadData: () => {
        refetch();
      },
    }),
    [hidden, refetch],
  );

  return (
    <ActionbarContext.Provider value={actionbarContextValue}>
      <Page>
        <PageContent>
          <h1>Fornecedores</h1>
          <Table data={data} columns={tableColumns} loading={loading} />
        </PageContent>
        <PageActionBar>
          <Actionbar />
        </PageActionBar>
      </Page>
    </ActionbarContext.Provider>
  );
};

export default Suppliers;
