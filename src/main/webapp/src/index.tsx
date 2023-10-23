import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import Logs from './pages/Logs/Logs';
import Dashboard from './pages/Dashboard/Dashboard';
import Suppliers from './pages/Suppliers/Suppliers';
import axios from 'axios';
import AddSupplier from './pages/Suppliers/AddSupplier';
import Discounts from './pages/Discounts/Discounts';
import AddDiscount from './pages/Discounts/AddDiscount';
import FixedCosts from './pages/FixedCosts/FixedCosts';
import AddFixedCost from './pages/FixedCosts/AddFixedCost';
import Supplies from './pages/Supplies/Supplies';
import AddSupply from './pages/Supplies/AddSupply';
import BusinessConf from './pages/BusinessConf/BusinessConf';
import Products from './pages/Products/Products';
import AddProduct from './pages/Products/AddProduct';
import Home from './pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
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
        path: 'products',
        element: <Products />,
        children: [
          {
            path: 'add',
            element: <AddProduct />,
          },
          {
            path: 'edit/:id',
            element: <AddProduct />,
            loader: async ({ params }) =>
              (await axios.get(`${process.env.REACT_APP_API_ENDPOINT}product/${params.id}`)).data,
          },
        ],
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
      {
        path: 'supplies',
        element: <Supplies />,
        children: [
          {
            path: 'add',
            element: <AddSupply />,
          },
          {
            path: 'edit/:id',
            element: <AddSupply />,
            loader: async ({ params }) =>
              (await axios.get(`${process.env.REACT_APP_API_ENDPOINT}supply/${params.id}`)).data,
          },
        ],
      },
      {
        path: 'fixed-costs',
        element: <FixedCosts />,
        children: [
          {
            path: 'add',
            element: <AddFixedCost />,
          },
          {
            path: 'edit/:id',
            element: <AddFixedCost />,
            loader: async ({ params }) =>
              (await axios.get(`${process.env.REACT_APP_API_ENDPOINT}fixed-cost/${params.id}`))
                .data,
          },
        ],
      },
      {
        path: 'discounts',
        element: <Discounts />,
        children: [
          {
            path: 'add',
            element: <AddDiscount />,
          },
          {
            path: 'edit/:id',
            element: <AddDiscount />,
            loader: async ({ params }) =>
              (await axios.get(`${process.env.REACT_APP_API_ENDPOINT}discount/${params.id}`)).data,
          },
        ],
      },
      {
        path: 'business-conf',
        element: <BusinessConf />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
