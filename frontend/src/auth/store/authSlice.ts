import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestState } from '../../core/enums/request-state.enum';
import { RootState } from '../../core/store/globalStore';
import { UserRoles } from '../enums/user-roles.enum';
import { LoginDataRequest } from '../http/interfaces/login-data-request';

interface UserState {
  userId: number;
  username: string;
  emailAddress: string;
  fullName: string;
  profilePicture?: string;
}

interface AuthState {
  requestState: RequestState;
  error?: string;
  isLoggedIn: boolean;
  sessionId: string;
  userRole: UserRoles;
  userData?: UserState;
}

const initialAuthState: AuthState = {
  requestState: RequestState.IDLE,
  isLoggedIn: false,
  sessionId: '',
  userRole: UserRoles.UNKNOWN,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    loginRequest: (state, _: PayloadAction<LoginDataRequest>) => {
      state.requestState = RequestState.PENDING;
    },
    // TODO save user data to state
    loginRequestSuccess: (state, action: PayloadAction<unknown>) => {
      state.requestState = RequestState.RESOLVED;
      state.isLoggedIn = true;
    },
    loginRequestFailure: (state, { payload }: PayloadAction<{ message: string }>) => {
      state.requestState = RequestState.REJECTED;
      state.error = payload.message;
    },
    resetLoginRequestState: (state) => {
      state.requestState = RequestState.IDLE;
      state.error = '';
    },
    logout() {
      return { ...initialAuthState };
    },
  },
});

export const authActions = authSlice.actions;
export const authReducers = authSlice.reducer;
export const selectAuthState = (root: RootState) => root.auth;
export const selectIsUserLoggedIn = (root: RootState) => root.auth.isLoggedIn;
export const selectAuthRequestState = (root: RootState) => root.auth.requestState;
