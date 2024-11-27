import axios, { AxiosResponse } from 'axios';
import { AlertData, AlertDataForm } from '../../../shared/interfaces/alert-data.interface';
import { appConfig } from '../../../core/constants/app-config';

const alertEndpoint = 'alerts';

export const fetchAllCryptoAlerts = async (): Promise<AlertData[]> => {
  const response: AxiosResponse<AlertData[]> = await axios.get(`${appConfig.baseApiUrl}/${alertEndpoint}`);
  return response.data;
};

export const addNewCryptoAlert = async (newAlert: AlertDataForm): Promise<AlertData> => {
  const response: AxiosResponse<AlertData> = await axios.post(`${appConfig.baseApiUrl}/${alertEndpoint}`, newAlert);
  return response.data;
};

export const updateCryptoAlert = async (): Promise<AlertData> => {
  const response: AxiosResponse<AlertData> = await axios.patch('', {});
  return response.data;
};

export const deleteCryptoAlert = async (): Promise<void> => {
  return axios.delete('');
};
