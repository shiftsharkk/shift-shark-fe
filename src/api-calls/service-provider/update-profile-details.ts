import axios from '../axios-instance';
import { useMutation } from '@tanstack/react-query';

import {
  TAdditionalServiceProviderData,
  TServiceProviderBankDetails,
} from '../../types/user';
import { TApiResponse } from '../../types/api';

type TUpdateBankDetailsRequest = TServiceProviderBankDetails;
type TUpdateAdditionalDetailsRequest = TAdditionalServiceProviderData;

const updateBankDetails = async (data: TUpdateBankDetailsRequest) => {
  const response = await axios.put('/service-provider/bank-details', data);
  return response.data;
};

export const useUpdateBankDetails = () => {
  return useMutation<TApiResponse, Error, TUpdateBankDetailsRequest>({
    mutationFn: updateBankDetails,
  });
};

const updateAdditionalDetails = async (
  data: TUpdateAdditionalDetailsRequest
) => {
  const response = await axios.put(
    '/service-provider/additional-details',
    data
  );
  return response.data;
};

export const useUpdateAdditionalDetails = () => {
  return useMutation<TApiResponse, Error, TUpdateAdditionalDetailsRequest>({
    mutationFn: updateAdditionalDetails,
  });
};
