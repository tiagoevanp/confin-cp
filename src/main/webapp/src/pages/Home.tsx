import { type FC } from 'react';
import Page from '../components/page/Page';
import PageContent from '../components/page/PageContent';

const Home: FC = () => (
  <Page>
    <PageContent>
      <h1>CONFIN-CP</h1>
      <p>Bem vindo ao sistema Controle Financeiro - Coelho Papeleiro!</p>
    </PageContent>
  </Page>
);

export default Home;
