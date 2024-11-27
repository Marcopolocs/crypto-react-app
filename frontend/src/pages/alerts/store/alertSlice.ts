import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertData, AlertDataForm } from '../../../shared/interfaces/alert-data.interface';
import { RootState } from '../../../core/store/globalStore';
import { RequestState } from '../../../core/enums/request-state.enum';

interface AlertsState {
  requestState: RequestState;
  alerts: AlertData[];
}

const initialActiveAlertsState: AlertsState = {
  requestState: RequestState.IDLE,
  alerts: [],
};

const alertDataSlice = createSlice({
  name: 'active-alerts',
  initialState: initialActiveAlertsState,
  reducers: {
    fetchUserAlerts(state) {
      state.requestState = RequestState.PENDING;
    },
    fetchUserAlertsSuccess(state, { payload }: PayloadAction<AlertData[]>) {
      state.requestState = RequestState.RESOLVED;
      state.alerts = payload;
    },
    fetchUserAlertsFailure(state, _: PayloadAction<void>) {
      state.requestState = RequestState.REJECTED;
    },

    addNewUserAlert(state, { payload }: PayloadAction<{ newAlert: AlertDataForm }>) {
      state.requestState = RequestState.PENDING;
    },
    addNewUserAlertSuccess(state, { payload }: PayloadAction<AlertData>) {
      state.requestState = RequestState.RESOLVED;
      state.alerts = [...state.alerts, payload];
    },
    addNewUserAlertFailure(state, _: PayloadAction<void>) {
      state.requestState = RequestState.REJECTED;
    },
  },
});

export const alertsDataActions = alertDataSlice.actions;
export const alertsDataReducer = alertDataSlice.reducer;
export const selectAlertsDataState = (state: RootState) => state.alertsData;
export const selectAlertsList = (state: RootState) => selectAlertsDataState(state).alerts;
export const selectIsAddNewAlertLoading = (state: RootState) => selectAlertsDataState(state).requestState === RequestState.PENDING;
