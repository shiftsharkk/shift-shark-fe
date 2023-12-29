import axios from '../axios-instance';

import { TServiceProviderAccount } from '../../types/user';
import { TApiResponse } from '../../types/api';

type TCreateServiceProviderRequest = {
  requestToken: string;
  userData: {
    user: {
      name: string;
      dob: number;
      gender: 'Male' | 'Female';
    };
  };
};

type TCreateServiceProviderResponse = TApiResponse<{
  accessToken: string;
  refreshToken: string;
  user: TServiceProviderAccount;
}>;

export const createServiceProvider = async (
  data: TCreateServiceProviderRequest
): Promise<TCreateServiceProviderResponse> => {
  const response = await axios.post('/service-provider/signup', data.userData, {
    headers: {
      'x-request-token': `${data.requestToken}`,
    },
  });
  return response.data;
};
