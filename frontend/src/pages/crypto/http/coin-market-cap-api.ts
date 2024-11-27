import axios, { AxiosResponse } from 'axios';
import { COINMARKETCAP_API_KEY, COINMARKETCAP_API_URL, COINMARKETCAP_ID_PARAM } from '../constants/coinmarketcap-request-data';
import { CryptoDataResponse } from '../interfaces/crypto-data.interface';

export const fetchCryptoList = async (): Promise<AxiosResponse<CryptoDataResponse>> => {
  const response = await axios.get(COINMARKETCAP_API_URL, {
    headers: COINMARKETCAP_API_KEY,
    params: COINMARKETCAP_ID_PARAM,
  });
  return response.data;
};
