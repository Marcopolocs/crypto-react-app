import { z } from 'zod';
import { CryptoNamesEnum } from '../interfaces/fetched-crypto-list.types';

export const alertDialogFormSchema = z.object({
  cryptoName: z.nativeEnum(CryptoNamesEnum),
  condition: z.enum(['isLowerOrEqual', 'isHigherOrEqual', 'isLower', 'isHigher']),
  price: z.coerce.number(),
});

export type IAlertDialogForm = z.infer<typeof alertDialogFormSchema>;

export const alertDialogDefaultValues: IAlertDialogForm = {
  cryptoName: CryptoNamesEnum.BTC,
  condition: 'isHigherOrEqual',
  price: 0,
};
