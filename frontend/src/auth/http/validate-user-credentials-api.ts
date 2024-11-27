import axios, { AxiosResponse } from 'axios';
import { appConfig } from '../../core/constants/app-config';

export interface IValidateUserCredentials {
  userCredential: string;
}

const validateUserCredentialEndpoints = {
  USERNAME: '/auth/validate/username',
  EMAIL: '/auth/validate/email',
};

export const validateUsername = async (payload: IValidateUserCredentials): Promise<AxiosResponse<unknown>> => {
  const response = await axios.post(`${appConfig.baseApiUrl}${validateUserCredentialEndpoints.USERNAME}`, payload);
  return response.data;
};

export const validateUserEmail = async (payload: IValidateUserCredentials): Promise<AxiosResponse<unknown>> => {
  const response = await axios.post(`${appConfig.baseApiUrl}${validateUserCredentialEndpoints.EMAIL}`, payload);
  return response.data;
};
