import { all } from 'redux-saga/effects';
import { cryptoListSaga } from '../../pages/crypto/store/sagas/cryptoListSaga';
import { alertsListSaga } from '../../pages/alerts/store/alertSaga';
import { credentialsValidationSaga } from '../../auth/store/sagas/credentialsValidationSaga';
import { registerNewUserSaga } from '../../auth/store/sagas/registerNewUserAccountSaga';
import { authSaga } from '../../auth/store/sagas/authSaga';

export function* rootSaga() {
  yield all([cryptoListSaga(), alertsListSaga(), credentialsValidationSaga(), registerNewUserSaga(), authSaga()]);
}
