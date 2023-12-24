import axios from '../axios-instance';

import {
  TAdditionalServiceProviderData,
  TServiceProviderBankDetails,
} from '../../types/user';
import { TApiResponse } from '../../types/api';

type TUpdateBankDetailsRequest = TServiceProviderBankDetails;

export const updateBankDetails = async (
  data: TUpdateBankDetailsRequest
): Promise<TApiResponse> => {
  const response = await axios.put('/service-provider/profile', {
    bankDetails: data,
  });
  return response.data;
};

type TUpdateAdditionalDetailsRequest = TAdditionalServiceProviderData;

export const updateAdditionalDetails = async (
  data: TUpdateAdditionalDetailsRequest
): Promise<TApiResponse> => {
  const response = await axios.put('/service-provider/profile', {
    additionalDetails: data,
  });
  return response.data;
};
