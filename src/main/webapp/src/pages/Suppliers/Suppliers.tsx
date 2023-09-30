import { type FC } from 'react';
import PageContent from '../../components/page/PageContent';
import Table from '../../components/table/Table';
import { useDataFetch } from '../../hooks/useDataFetch';
import PageActionBar from '../../components/page/PageActionbar';
import Actionbar from '../../components/actionbar/Actionbar';
import { tableColumns } from './tableColumns';
import AddSupplier from './AddSupplier';

const Suppliers: FC = () => {
  const { data, loading } = useDataFetch('supplier');

  return (
    <>
      <PageContent>
        <h1>Fornecedores</h1>
        <Table data={data} columns={tableColumns} loading={loading} />
      </PageContent>
      <PageActionBar>
        <Actionbar title='Inserir Fornecedor' content={<AddSupplier />} />
      </PageActionBar>
    </>
  );
};

export default Suppliers;
