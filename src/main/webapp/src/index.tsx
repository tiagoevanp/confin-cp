import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import Logs from './pages/Logs';
import Dashboard from './pages/Dashboard';
import Suppliers from './pages/Suppliers/Suppliers';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'logs',
        element: <Logs />,
      },
      {
        path: 'suppliers',
        element: <Suppliers />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
