import axios from '../axios-instance';

import {
  TCompanyDetails,
  THirerAccount,
  THirerUserDetails,
} from '../../types/user';

type TCreateHirerRequest = {
  requestToken: string;
  data: {
    user: THirerUserDetails;
    companyDetails: TCompanyDetails;
  };
};

export const createHirer = async (
  requestData: TCreateHirerRequest
): Promise<THirerAccount> => {
  const response = await axios.post('/hirer/signup', requestData.data, {
    headers: {
      'x-request-token': `${requestData.requestToken}`,
    },
  });
  return response.data;
};
