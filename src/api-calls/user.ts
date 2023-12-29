import axios from './axios-instance';

import { TApiResponse } from '../types/api';
import { TUser } from '@/types/user';

type TGetUserResponse = {
  data: {
    user: TUser;
  };
} & TApiResponse;

export const getUser = async (): Promise<TGetUserResponse> => {
  const response = await axios.get('/service-provider/profile');
  return response.data;
};
