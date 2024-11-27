import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { addNewCryptoAlert, fetchAllCryptoAlerts } from '../http/active-alerts-api';
import { PayloadAction } from '@reduxjs/toolkit';
import { AlertData, AlertsDataResponse } from '../../../shared/interfaces/alert-data.interface';
import { alertsDataActions } from './alertSlice';

function* fetchAllAlertsSaga(): SagaIterator<any> {
  try {
    const alertsListResponse: AlertsDataResponse = yield call(fetchAllCryptoAlerts);

    yield put(alertsDataActions.fetchUserAlertsSuccess(alertsListResponse.alerts));
  } catch (error) {
    yield put(alertsDataActions.fetchUserAlertsFailure());
  }
}

function* addNewAlertSaga({ payload }: PayloadAction<AlertData>): SagaIterator {
  try {
    const alertItemResponse: AlertData = yield call(addNewCryptoAlert, payload);

    yield put(alertsDataActions.addNewUserAlertSuccess(alertItemResponse));
  } catch (error) {
    yield put(alertsDataActions.addNewUserAlertFailure());
  }
}

export function* alertsListSaga() {
  yield takeLatest(alertsDataActions.fetchUserAlerts.type, fetchAllAlertsSaga);
  yield takeLatest(alertsDataActions.addNewUserAlert.type, addNewAlertSaga);
}
