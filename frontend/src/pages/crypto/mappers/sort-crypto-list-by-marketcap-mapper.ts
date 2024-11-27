import { ICryptoListData } from '../constants/crypto-data-schema';

export const sortCryptoListByMarketCap = (cryptoList: ICryptoListData[]): ICryptoListData[] => {
  const sortedList = cryptoList.sort((a: ICryptoListData, b: ICryptoListData) => {
    return b.market_cap - a.market_cap;
  });
  return sortedList;
};
