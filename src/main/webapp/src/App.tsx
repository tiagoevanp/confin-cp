import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';

const App: FC = () => {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', alignContent: 'stretch', flexGrow: 1 }}>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default App;
