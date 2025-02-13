import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Widgets from './pages/widgets';
import WidgetsPage from './pages/widgets/page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'widgets',
        element: <Widgets />
      },
      {
        path: 'widgets/page',
        element: <WidgetsPage />
      }
    ]
  }
]);
