import { useMemo, type FC } from 'react';
import Page from '../../components/page/Page';
import PageContent from '../../components/page/PageContent';
import Card from '../../components/card/Card';
import './Dashboard.scss';
import Table from '../../components/table/Table';
import { type Product, type Profit } from '../../definitions/api/Product';
import { useDataFetch } from '../../hooks/useDataFetch';
import { tableColumns } from './tableColumns';
import { useMoneyMask } from '../../hooks/useMoneyMask';
import { type Deal } from '../../definitions/api/Deal';

const Dashboard: FC = () => {
  const {
    data: profitData,
    loading: profitLoading,
    refetch: profitRefetch,
  } = useDataFetch<Profit>('product/profit');
  const { data: productData } = useDataFetch<Product>('product');
  const { data: dealData } = useDataFetch<Deal>('product/deal');
  const moneyMask = useMoneyMask();

  const quantityTotal = useMemo(() => {
    let total = 0;

    productData?.forEach((product) => {
      total += product.purchase.quantity;
    });

    return total;
  }, [productData]);

  const purchaseTotal = useMemo(() => {
    let total = 0;

    productData?.forEach((product) => {
      total += Number(`${product.purchase.value.integer}.${product.purchase.value.decimal}`);
    });

    return total.toString();
  }, [productData]);

  const salesTotal = useMemo(() => {
    let total = 0;

    dealData?.forEach((deal) => {
      total += Number(`${deal.price.integer}.${deal.price.decimal}`) * deal.quantity;
    });

    return total.toString();
  }, [dealData]);

  return (
    <Page>
      <PageContent>
        <h1>Dashboard</h1>
        <div className='dashboard'>
          <Card title='Quantidade total de itens' size='quarter'>
            <div
              style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h1>{quantityTotal}</h1>
            </div>
          </Card>
          <Card title='Total em compras' size='quarter'>
            <div
              style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h1>{`R$ ${moneyMask(purchaseTotal)}`}</h1>
            </div>
          </Card>
          <Card title='Total em vendas' size='quarter'>
            <div
              style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h1>{`R$ ${moneyMask(salesTotal)} `}</h1>
            </div>
          </Card>
          <Card title='Lucro Total' size='quarter'>
            <div
              style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h1>{`R$ ${moneyMask((Number(salesTotal) - Number(purchaseTotal)).toFixed(2))}`}</h1>
            </div>
          </Card>
          <Card title='Lista de produtos por Lucro' size='half'>
            <Table
              data={profitData}
              refetch={profitRefetch}
              columns={tableColumns}
              loading={profitLoading}
              noFilter
            />
          </Card>
        </div>
      </PageContent>
    </Page>
  );
};

export default Dashboard;
