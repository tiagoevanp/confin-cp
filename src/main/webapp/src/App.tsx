import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Page from './components/page/Page';

const App: FC = () => {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', alignContent: 'stretch', flexGrow: 1 }}>
        <Sidebar />
        <Page>
          <Outlet />
        </Page>
      </div>
    </>
  );
};

export default App;
