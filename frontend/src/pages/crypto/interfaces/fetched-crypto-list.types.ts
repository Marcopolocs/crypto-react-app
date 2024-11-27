type CryptoCoin = {
  cryptoCoinName: CryptoNamesEnum;
  cryptoCoinId: string;
};

export enum CryptoNamesEnum {
  BNB = 'BNB',
  BCH = 'BCH',
  TRON = 'TRON',
  LINK = 'LINK',
  ADA = 'ADA',
  USDC = 'USDC',
  DAI = 'DAI',
  SOL = 'SOL',
  AVAX = 'AVAX',
  SHIB = 'SHIB',
  NEAR = 'NEAR',
  UNI = 'UNI',
  DOT = 'DOT',
  SUI = 'SUI',
  TON = 'TON',
  FLOKI = 'FLOKI',
  WIF = 'WIF',
  XRP = 'XRP',
  BTC = 'BTC',
  LTC = 'LTC',
  ETH = 'ETH',
  DOGE = 'DOGE',
  TETHER = 'TETHER',
  XMR = 'XMR',
}

const cryptoIdentifierList: CryptoCoin[] = [
  { cryptoCoinName: CryptoNamesEnum.BNB, cryptoCoinId: '1839' },
  { cryptoCoinName: CryptoNamesEnum.BCH, cryptoCoinId: '1831' },
  { cryptoCoinName: CryptoNamesEnum.TRON, cryptoCoinId: '1958' },
  { cryptoCoinName: CryptoNamesEnum.LINK, cryptoCoinId: '1975' },
  { cryptoCoinName: CryptoNamesEnum.ADA, cryptoCoinId: '2010' },
  { cryptoCoinName: CryptoNamesEnum.USDC, cryptoCoinId: '3408' },
  { cryptoCoinName: CryptoNamesEnum.DAI, cryptoCoinId: '4943' },
  { cryptoCoinName: CryptoNamesEnum.SOL, cryptoCoinId: '5426' },
  { cryptoCoinName: CryptoNamesEnum.AVAX, cryptoCoinId: '5805' },
  { cryptoCoinName: CryptoNamesEnum.SHIB, cryptoCoinId: '5994' },
  { cryptoCoinName: CryptoNamesEnum.NEAR, cryptoCoinId: '6535' },
  { cryptoCoinName: CryptoNamesEnum.UNI, cryptoCoinId: '7083' },
  { cryptoCoinName: CryptoNamesEnum.DOT, cryptoCoinId: '6636' },
  { cryptoCoinName: CryptoNamesEnum.SUI, cryptoCoinId: '20947' },
  { cryptoCoinName: CryptoNamesEnum.TON, cryptoCoinId: '11419' },
  { cryptoCoinName: CryptoNamesEnum.FLOKI, cryptoCoinId: '10804' },
  { cryptoCoinName: CryptoNamesEnum.WIF, cryptoCoinId: '28752' },
  { cryptoCoinName: CryptoNamesEnum.XRP, cryptoCoinId: '52' },
  { cryptoCoinName: CryptoNamesEnum.BTC, cryptoCoinId: '1' },
  { cryptoCoinName: CryptoNamesEnum.LTC, cryptoCoinId: '2' },
  { cryptoCoinName: CryptoNamesEnum.ETH, cryptoCoinId: '1027' },
  { cryptoCoinName: CryptoNamesEnum.DOGE, cryptoCoinId: '74' },
  { cryptoCoinName: CryptoNamesEnum.TETHER, cryptoCoinId: '825' },
  { cryptoCoinName: CryptoNamesEnum.XMR, cryptoCoinId: '328' },
] as const;

export type CryptoSymbol = keyof typeof CryptoNamesEnum;

export const allCryptoIds = cryptoIdentifierList.map((crypto) => crypto.cryptoCoinId);
