import { CryptoSymbol } from '../../pages/crypto/interfaces/fetched-crypto-list.types';

export interface AlertData {
  _id: string;
  cryptoName: CryptoSymbol;
  condition: ConditionType;
  price: number;
  createdAt: string;
}

export interface AlertDataForm {
  cryptoName: CryptoSymbol;
  condition: ConditionType;
  price: number;
}

export interface AlertsDataResponse {
  alerts: AlertData[];
}

export type ConditionType = 'isLowerOrEqual' | 'isHigherOrEqual' | 'isLower' | 'isHigher';
