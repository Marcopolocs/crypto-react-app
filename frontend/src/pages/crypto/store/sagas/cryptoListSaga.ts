import { call, put, takeLatest } from 'redux-saga/effects';
import { cryptoDataActions } from '../cryptoListSlice';
import { fetchCryptoList } from '../../http/coin-market-cap-api';
import { MappedCryptoData } from '../../interfaces/crypto-data.interface';
import { cryptoArraySchema } from '../../constants/crypto-data-schema';
import { AxiosError } from 'axios';
import { filterCryptoCoinNamesFromCryptoListData } from '../../mappers/filter-crypto-names-mapper';
import { sortCryptoListByMarketCap } from '../../mappers/sort-crypto-list-by-marketcap-mapper';

export function* fetchCryptoListSaga() {
  try {
    const cryptoListResponse: unknown = yield call(fetchCryptoList);

    if (typeof cryptoListResponse === 'object' && cryptoListResponse !== null && 'data' in cryptoListResponse) {
      const values = cryptoListResponse as { data: Record<string, unknown> };
      const validatedCryptoListData = cryptoArraySchema.safeParse(Object.values(values.data));

      if (validatedCryptoListData.success) {
        const mappedCryptoData: MappedCryptoData = {
          cryptoListData: sortCryptoListByMarketCap(validatedCryptoListData.data),
          cryptoCoinNamesList: filterCryptoCoinNamesFromCryptoListData(validatedCryptoListData.data),
        };

        yield put(cryptoDataActions.fetchCryptoListSuccess(mappedCryptoData));
      } else {
        yield put(cryptoDataActions.fetchCryptoListFailure({ message: 'API-data could not be validated for an unknown reason.' }));
        console.error(validatedCryptoListData.error.message);
      }
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      yield put(cryptoDataActions.fetchCryptoListFailure({ message: error.message }));
      console.error(error.message);
    }
  }
}

export function* cryptoListSaga() {
  yield takeLatest(cryptoDataActions.fetchCryptoList.type, fetchCryptoListSaga);
}

export default cryptoListSaga;
