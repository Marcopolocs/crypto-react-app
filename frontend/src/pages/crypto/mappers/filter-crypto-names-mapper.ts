import { ICryptoListData } from '../constants/crypto-data-schema';

export const filterCryptoCoinNamesFromCryptoListData = (cryptoList: ICryptoListData[]): { cryptoName: string; cryptoSymbol: string }[] => {
  return cryptoList.map((cryptoCoin) => {
    return {
      cryptoName: cryptoCoin.name,
      cryptoSymbol: cryptoCoin.symbol,
    };
  });
};
