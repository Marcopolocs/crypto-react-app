import axios, { AxiosResponse } from 'axios';
import { RegistrationDataRequest } from './interfaces/registration-data-request';
import { appConfig } from '../../core/constants/app-config';

const signupEndpoint = 'auth/signup';

export const registerNewUserAccount = async (registrationUserData: RegistrationDataRequest): Promise<AxiosResponse<unknown>> => {
  const response = await axios.post(`${appConfig.baseApiUrl}/${signupEndpoint}`, registrationUserData);
  return response.data;
};
