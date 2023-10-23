import { type FC } from 'react';
import Page from '../../components/page/Page';
import PageContent from '../../components/page/PageContent';
import Card from '../../components/card/Card';
import './Dashboard.scss';

const Dashboard: FC = () => (
  <Page>
    <PageContent>
      <h1>Dashboard</h1>
      <div className='dashboard'>
        <Card title='Card 1' size='quarter'>
          <p>teste card mais longo</p>
        </Card>
        <Card title='Card 2' size='quarter'>
          <p>teste card mais longo</p>
        </Card>
        <Card title='Card 3' size='quarter'>
          <p>teste card mais longo</p>
        </Card>
        <Card title='Card 4' size='quarter'>
          <p>teste card mais longo</p>
        </Card>
        <Card title='Card 5' size='full'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ex a, rem saepe porro
            inventore commodi aliquid sit magnam quae magni sint distinctio mollitia alias!
            Deserunt, reiciendis quos. Possimus, voluptates.
          </p>
        </Card>
        <Card title='Card 6' size='half'>
          <p>teste</p>
        </Card>
        <Card title='Card 7' size='half'>
          <p>teste</p>
        </Card>
        <Card title='Card 8' size='third'>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius tenetur repellat maiores.
            Repellat, libero est. Atque esse, sed nam deserunt vitae consequatur in veniam? Mollitia
            enim explicabo minima repellendus iusto.
          </p>
        </Card>
        <Card title='Card 9' size='third'>
          <p>teste</p>
        </Card>
        <Card title='Card 10' size='third'>
          <p>teste</p>
        </Card>
      </div>
    </PageContent>
  </Page>
);

export default Dashboard;
