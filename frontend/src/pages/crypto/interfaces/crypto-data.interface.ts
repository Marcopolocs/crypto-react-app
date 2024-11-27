import { ICryptoListData } from '../constants/crypto-data-schema';

export interface CryptoDataResponse {
  data: Record<string, CryptoCoinData>;
  status: {};
}

export interface MappedCryptoData {
  cryptoListData: ICryptoListData[];
  cryptoCoinNamesList: { cryptoName: string; cryptoSymbol: string }[];
}

export type CryptoCoinData = {
  circulating_supply: number;
  cmc_rank: number;
  date_added: string;
  id: number;
  infinite_supply: boolean;
  is_active: number;
  is_fiat: number;
  last_updated: string;
  max_supply: number;
  name: string;
  num_market_pairs: number;
  platform: string | null;
  quote: CryptoQuote;
  self_reported_circulating_supply: number | null;
  self_reported_market_cap: number | null;
  slug: string;
  symbol: string;
  total_supply: number;
  tags: CryptoTag[];
  tvl_ratio: null;
};

interface CryptoQuote {
  USD: {
    fully_diluted_market_cap: number;
    last_updated: string;
    market_cap: number;
    market_cap_dominance: number;
    percent_change_1h: number;
    percent_change_7d: number;
    percent_change_24h: number;
    percent_change_30d: number;
    percent_change_60d: number;
    percent_change_90d: number;
    price: string | number;
    tvl: null;
    volume_24h: number;
    volume_change_24h: number;
  };
}

interface CryptoTag {
  slug: string;
  name: string;
  category: string;
}
