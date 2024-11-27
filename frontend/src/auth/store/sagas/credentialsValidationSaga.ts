import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { credentialsValidationActions } from '../credentialsValidationSlice';
import { IValidateUserCredentials, validateUserEmail, validateUsername } from '../../http/validate-user-credentials-api';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

function* validateUsernameSaga(action: PayloadAction<IValidateUserCredentials>): SagaIterator {
  try {
    yield call(validateUsername, action.payload);

    yield put(credentialsValidationActions.validateUserNameSuccess());
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);

      yield put(credentialsValidationActions.validateUserNameFailure({ message: error?.response?.data.error }));
    }
  }
}

function* validateUserEmailSaga(action: PayloadAction<IValidateUserCredentials>): SagaIterator {
  try {
    yield call(validateUserEmail, action.payload);
    console.log('asd');
    yield put(credentialsValidationActions.validateUserEmailSuccess());
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      yield put(credentialsValidationActions.validateUserEmailFailure({ message: error?.response?.data.error }));
    }
  }
}

export function* credentialsValidationSaga() {
  yield takeLatest(credentialsValidationActions.validateUserName.type, validateUsernameSaga);
  yield takeLatest(credentialsValidationActions.validateUserEmail.type, validateUserEmailSaga);
}
