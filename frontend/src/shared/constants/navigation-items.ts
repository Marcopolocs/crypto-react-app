import { APP_ROUTE_PATHS } from '../../routes/app-route-paths';

interface INavigationItems {
  label: string;
  path: string;
}

export const navigationPageItems: INavigationItems[] = [
  { label: 'Cryptocurrencies', path: APP_ROUTE_PATHS.CRYPTOCURRENCIES },
  { label: 'Alerts', path: APP_ROUTE_PATHS.CRYPTOCURRENCIES_ALERTS },
  { label: 'Articles', path: APP_ROUTE_PATHS.ABOUT_ME },
  { label: 'Forum', path: APP_ROUTE_PATHS.FORUM },
  { label: 'About Me', path: APP_ROUTE_PATHS.ABOUT_ME },
];

export const navigationAuthItems: INavigationItems[] = [{ label: 'Login', path: APP_ROUTE_PATHS.AUTH }];
