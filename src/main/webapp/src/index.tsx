import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import Logs from './pages/Logs/Logs';
import Dashboard from './pages/Dashboard';
import Suppliers from './pages/Suppliers/Suppliers';
import axios from 'axios';
import AddSupplier from './pages/Suppliers/AddSupplier';

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
        children: [
          {
            path: 'add',
            element: <AddSupplier />,
          },
          {
            path: 'edit/:id',
            element: <AddSupplier />,
            loader: async ({ params }) =>
              (await axios.get(`${process.env.REACT_APP_API_ENDPOINT}supplier/${params.id}`)).data,
          },
        ],
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
