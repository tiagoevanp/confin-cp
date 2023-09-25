import ReactDOM from 'react-dom/client';

import App from './App';
import './styles/index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: 'Logs',
    element: <div />, // TODO: Logs page
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<RouterProvider router={router} />);
