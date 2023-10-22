import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import ConfigProvider from './providers/ConfifProvider';

const App: FC = () => {
  return (
    <>
      <ConfigProvider>
        <Header />
        <div style={{ display: 'flex', alignContent: 'stretch', flexGrow: 1 }}>
          <Sidebar />
          <Outlet />
        </div>
      </ConfigProvider>
    </>
  );
};

export default App;
