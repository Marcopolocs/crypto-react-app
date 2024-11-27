import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cryptoDataReducers } from '../../pages/crypto/store/cryptoListSlice';
import { rootSaga } from './rootSaga';
import createSagaMiddleware from 'redux-saga';
import { alertsDataReducer } from '../../pages/alerts/store/alertSlice';
import { credentialsValidationReducers } from '../../auth/store/credentialsValidationSlice';
import { registrationReducers } from '../../auth/store/registrationSlice';
import { authReducers } from '../../auth/store/authSlice';

const rootReducer = combineReducers({
  cryptoData: cryptoDataReducers,
  alertsData: alertsDataReducer,
  credentialsValidation: credentialsValidationReducers,
  registration: registrationReducers,
  auth: authReducers,
});

const saga = createSagaMiddleware();

const globalStore = configureStore({
  reducer: rootReducer,
  middleware: [saga],
});

saga.run(rootSaga);

export default globalStore;

export type RootState = ReturnType<typeof globalStore.getState>;
