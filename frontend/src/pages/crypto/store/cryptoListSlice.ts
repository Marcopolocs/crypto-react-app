import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MappedCryptoData } from '../interfaces/crypto-data.interface';
import { RootState } from '../../../core/store/globalStore';
import { ICryptoListData } from '../constants/crypto-data-schema';
import { RequestState } from '../../../core/enums/request-state.enum';

interface CryptoListState {
  requestState: RequestState;
  cryptoList: ICryptoListData[];
  cryptoNamesList: { cryptoName: string; cryptoSymbol: string }[];
  error?: string;
}

const initialCryptoListState: CryptoListState = {
  requestState: RequestState.IDLE,
  cryptoList: [],
  cryptoNamesList: [],
};

const cryptoDataSlice = createSlice({
  name: 'cryptocurrencies',
  initialState: initialCryptoListState,
  reducers: {
    fetchCryptoList(state) {
      state.requestState = RequestState.PENDING;
    },
    fetchCryptoListSuccess(state, { payload }: PayloadAction<MappedCryptoData>) {
      state.requestState = RequestState.RESOLVED;
      state.cryptoList = payload.cryptoListData;
      state.cryptoNamesList = payload.cryptoCoinNamesList;
    },
    fetchCryptoListFailure(state, { payload }: PayloadAction<{ message: string }>) {
      state.requestState = RequestState.REJECTED;
      state.error = payload.message;
    },
  },
});

export const cryptoDataActions = cryptoDataSlice.actions;
export const cryptoDataReducers = cryptoDataSlice.reducer;
export const selectCryptoListState = (state: RootState) => state.cryptoData;
export const selectCryptoList = (state: RootState) => selectCryptoListState(state).cryptoList;
export const selectCryptoNamesList = (state: RootState) => selectCryptoListState(state).cryptoNamesList;
export const selectIsFetchCryptoListLoading = (state: RootState) => selectCryptoListState(state).requestState === RequestState.PENDING;
