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
        <div
          style={{ display: 'flex', position: 'relative', alignContent: 'stretch', flexGrow: 1 }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
