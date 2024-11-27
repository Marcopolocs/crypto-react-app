import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { LoginDataRequest } from '../../http/interfaces/login-data-request';
import { authActions } from '../authSlice';
import { loginUserWithEmailAndPw } from '../../http/login-user-api';

function* loginWithEmailAndPassword({ payload }: PayloadAction<LoginDataRequest>): SagaIterator {
  try {
    const loginResponse = yield call(loginUserWithEmailAndPw, payload);

    yield put(authActions.loginRequestSuccess(loginResponse));
  } catch (error) {
    if (error instanceof Error) {
      yield put(authActions.loginRequestFailure({ message: error.message }));
    }
  }
}

export function* authSaga() {
  yield takeLatest(authActions.loginRequest.type, loginWithEmailAndPassword);
}
