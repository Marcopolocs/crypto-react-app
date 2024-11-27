import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { registrationActions } from '../registrationSlice';
import { registerNewUserAccount } from '../../http/register-user-api';
import { RegistrationDataRequest } from '../../http/interfaces/registration-data-request';

function* registerNewUserAccountSaga({ payload }: PayloadAction<RegistrationDataRequest>): SagaIterator {
  try {
    yield call(registerNewUserAccount, payload);

    yield put(registrationActions.registrationRequestSuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(registrationActions.registrationRequestFailure({ message: error.message }));
    }
  }
}

export function* registerNewUserSaga() {
  yield takeLatest(registrationActions.registrationRequest.type, registerNewUserAccountSaga);
}
