import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestState } from '../../core/enums/request-state.enum';
import { RootState } from '../../core/store/globalStore';
import { RegistrationDataRequest } from '../http/interfaces/registration-data-request';

interface RegistrationState {
  requestState: RequestState;
  error?: string;
}

const initialRegistrationState: RegistrationState = {
  requestState: RequestState.IDLE,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState: initialRegistrationState,
  reducers: {
    registrationRequest: (state, _: PayloadAction<RegistrationDataRequest>) => {
      state.requestState = RequestState.PENDING;
    },
    registrationRequestSuccess: (state) => {
      state.requestState = RequestState.RESOLVED;
    },
    registrationRequestFailure: (state, { payload }: PayloadAction<{ message: string }>) => {
      state.requestState = RequestState.REJECTED;
      state.error = payload.message;
    },
    resetRegistrationRequestState(state) {
      state.requestState = RequestState.IDLE;
    },
  },
});

export const registrationActions = registrationSlice.actions;
export const registrationReducers = registrationSlice.reducer;
export const selectRegistrationRequestState = (root: RootState) => root.registration.requestState;
export const selectRegistrationState = (root: RootState) => root.registration;
