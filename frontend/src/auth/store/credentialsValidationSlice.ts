import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../core/store/globalStore';
import { RequestState } from '../../core/enums/request-state.enum';
import { IValidateUserCredentials } from '../http/validate-user-credentials-api';

interface CredentialsValidationState {
  username: {
    requestState: RequestState;
    error?: string;
  };
  emailAddress: {
    requestState: RequestState;
    error?: string;
  };
}

const initialCredentialsValidationState: CredentialsValidationState = {
  username: {
    requestState: RequestState.IDLE,
  },
  emailAddress: {
    requestState: RequestState.IDLE,
  },
};

const credentialsValidationSlice = createSlice({
  name: 'credentialsValidation',
  initialState: initialCredentialsValidationState,
  reducers: {
    validateUserName(state, _: PayloadAction<IValidateUserCredentials>) {
      state.username.requestState = RequestState.PENDING;
    },
    validateUserNameSuccess(state) {
      state.username.requestState = RequestState.RESOLVED;
    },
    validateUserNameFailure(state, { payload }: PayloadAction<{ message: string }>) {
      state.username.requestState = RequestState.REJECTED;
      state.username.error = payload.message;
    },
    validateUserEmail(state, _: PayloadAction<IValidateUserCredentials>) {
      state.emailAddress.requestState = RequestState.PENDING;
    },
    validateUserEmailSuccess(state) {
      state.emailAddress.requestState = RequestState.RESOLVED;
    },
    validateUserEmailFailure(state, { payload }: PayloadAction<{ message: string }>) {
      state.emailAddress.requestState = RequestState.REJECTED;
      state.username.error = payload.message;
    },
  },
});

export const credentialsValidationActions = credentialsValidationSlice.actions;
export const credentialsValidationReducers = credentialsValidationSlice.reducer;
export const selectCredentialsValidationState = (state: RootState) => state.credentialsValidation;
