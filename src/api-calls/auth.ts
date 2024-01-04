import axios from './axios-instance';

import { TApiResponse } from '../types/api';
import { parseError } from '@/utils/parse-error';

type TGetOtpResponse = {
  data: {
    requestId: 'string';
  };
} & TApiResponse;

type TGetOtpWithPhoneRequest = {
  phone: string;
  source: 'service-provider';
};

type TGetOtpWithEmailRequest = {
  email: string;
  source: 'hirer';
};

type TGetOtpRequest = TGetOtpWithPhoneRequest | TGetOtpWithEmailRequest;

export const getOTP = async (
  data: TGetOtpRequest
): Promise<TGetOtpResponse> => {
  const response = await axios.post('/auth/sendOTP', data);
  return response.data;
};

type TVerifyOtpRequest = {
  requestId: string;
  otp: string;
};

type TNewUserVerifyResponse = {
  newUser: true;
  requestToken: string;
};

type TExistingUserVerifyResponse = {
  newUser: false;
  accessToken: string;
  refreshToken: string;
};

export type TVerifyOtpResponse = TApiResponse<
  TNewUserVerifyResponse | TExistingUserVerifyResponse
>;

export const verifyOTP = async (
  data: TVerifyOtpRequest
): Promise<TVerifyOtpResponse> => {
  const response = await axios.post('/auth/verifyOTP', data);
  return response.data;
};

export const refreshToken =
  async (): Promise<TApiResponse<TExistingUserVerifyResponse> | null> => {
    try {
      const response = await axios.post('/auth/refresh-token');
      return response.data;
    } catch (error) {
      const errorMessage = parseError(error);
      console.error(errorMessage);
      return null;
    }
  };
