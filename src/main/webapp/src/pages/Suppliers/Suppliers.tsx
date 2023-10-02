import { useMemo, type FC, useState } from 'react';
import PageContent from '../../components/page/PageContent';
import Table from '../../components/table/Table';
import { useDataFetch } from '../../hooks/useDataFetch';
import PageActionBar from '../../components/page/PageActionbar';
import Actionbar from '../../components/actionbar/Actionbar';
import { tableColumns } from './tableColumns';
import AddSupplier, { type SupplierInputs } from './AddSupplier';
import Page from '../../components/page/Page';
import ActionbarContext from '../../contexts/ActionbarContext';
import { useToggle } from '../../hooks/useToggle';

const Suppliers: FC = () => {
  const [row, setRow] = useState<SupplierInputs>({
    id: '',
    name: '',
    marketplace: '',
    address: { street: '', number: 0, zip_code: '' },
    contact: [],
  });
  const { data, loading } = useDataFetch('supplier');

  const [hidden, toggle] = useToggle(true);

  const actionbarContextValue = useMemo(
    () => ({
      hidden,
      toggle,
      setRow: (v: SupplierInputs) => {
        setRow(v);
      },
    }),
    [hidden, toggle],
  );

  return (
    <ActionbarContext.Provider value={actionbarContextValue}>
      <Page>
        <PageContent>
          <h1>Fornecedores</h1>
          <Table data={data} columns={tableColumns} loading={loading} />
        </PageContent>
        <PageActionBar>
          <Actionbar
            title={row?.id === null ? 'Inserir Fornecedor' : 'Atualizar Fornecedor'}
            content={<AddSupplier row={row} />}
          />
        </PageActionBar>
      </Page>
    </ActionbarContext.Provider>
  );
};

export default Suppliers;
