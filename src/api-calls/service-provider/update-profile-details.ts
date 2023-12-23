import axios from '../axios-instance';

import {
  TAdditionalServiceProviderData,
  TServiceProviderAccount,
} from '../../types/user';
import { TApiResponse } from '../../types/api';

type TUpdateBankDetailsRequest = TServiceProviderAccount;

export const updateBankDetails = async (
  data: TUpdateBankDetailsRequest
): Promise<TApiResponse> => {
  const response = await axios.put(
    '/service-provider/profile/bank-details',
    data
  );
  return response.data;
};


type TUpdateAdditionalDetailsRequest = TAdditionalServiceProviderData;

export const updateAdditionalDetails = async (
  data: TUpdateAdditionalDetailsRequest
): Promise<TApiResponse> => {
  const response = await axios.put(
    '/service-provider/profile/additional-details',
    data
  );
  return response.data;
};
