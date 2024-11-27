import RootLayout from '../layouts/RootLayout';
import { Navigate } from 'react-router-dom';
import { APP_ROUTE_PATHS } from './app-route-paths';
import CryptoCurrenciesPage from '../pages/crypto/pages/CryptoCurrenciesPage';
import CryptoDetailsPage from '../pages/crypto/pages/CryptoDetailsPage';
import ActiveAlertsPage from '../pages/alerts/ActiveAlertsPage';
import AuthPage from '../auth/pages/AuthPage';

export default function appRoutes() {
  return [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Navigate to={APP_ROUTE_PATHS.CRYPTOCURRENCIES} />,
        },
        {
          path: APP_ROUTE_PATHS.AUTH,
          element: <AuthPage />,
        },
        {
          path: APP_ROUTE_PATHS.CRYPTOCURRENCIES,
          element: <CryptoCurrenciesPage />,
        },
        {
          path: APP_ROUTE_PATHS.CRYPTOCURRENCIES_COIN,
          element: <CryptoDetailsPage />,
        },
        {
          path: APP_ROUTE_PATHS.CRYPTOCURRENCIES_ALERTS,
          element: <ActiveAlertsPage />,
        },
        {
          path: '*',
          element: <Navigate to={APP_ROUTE_PATHS.CRYPTOCURRENCIES} />,
        },
      ],
    },
  ];
}
