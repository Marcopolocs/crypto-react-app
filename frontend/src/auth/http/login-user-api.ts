import axios, { AxiosResponse } from 'axios';
import { LoginDataRequest } from './interfaces/login-data-request';
import { appConfig } from '../../core/constants/app-config';

const loginEndpoint = 'auth/login';

export const loginUserWithEmailAndPw = async (loginUserData: LoginDataRequest): Promise<AxiosResponse<unknown>> => {
  const response = await axios.post(`${appConfig.baseApiUrl}/${loginEndpoint}`, loginUserData);
  return response.data;
};
