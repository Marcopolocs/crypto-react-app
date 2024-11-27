import { allCryptoIds } from '../interfaces/fetched-crypto-list.types';

export const COINMARKETCAP_API_KEY: Readonly<Record<string, string>> = {
  'X-CMC_PRO_API_KEY': 'TOP_SECRET',
};

export const COINMARKETCAP_ID_PARAM: Readonly<{ id: string }> = {
  id: allCryptoIds.join(','),
};

// API DOMAIN CAN BE FOUND IN THE 'setupProxy.js' file
export const COINMARKETCAP_API_URL: Readonly<string> = '/v2/cryptocurrency/quotes/latest';
