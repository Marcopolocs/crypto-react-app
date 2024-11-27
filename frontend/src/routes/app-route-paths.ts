export const APP_ROUTE_PATHS: Record<NavigationEnum, string> = {
  //PAGES
  CRYPTOCURRENCIES: '/cryptocurrencies',
  CRYPTOCURRENCIES_COIN: '/cryptocurrencies/:coin',
  CRYPTOCURRENCIES_ALERTS: '/active-alerts',
  FORUM: '/forum',
  NEWS: '/articles',
  ABOUT_ME: '/about-me',

  //USER
  AUTH: '/auth',
  USER_DATA: 'account/user-details',
};

enum NavigationEnum {
  CRYPTOCURRENCIES = 'CRYPTOCURRENCIES',
  CRYPTOCURRENCIES_COIN = 'CRYPTOCURRENCIES_COIN',
  CRYPTOCURRENCIES_ALERTS = 'CRYPTOCURRENCIES_ALERTS',
  FORUM = 'FORUM',
  NEWS = 'NEWS',
  ABOUT_ME = 'ABOUT_ME',
  AUTH = 'AUTH',
  USER_DATA = 'USER_DATA',
}
