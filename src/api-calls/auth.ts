import { TApiResponse } from "../types/api";
import { TAuthUser } from "../types/user";
import axios from "./axios-instance";

type TGetOtpResponse = {
  data: {
    requestId: "string";
  };
} & TApiResponse;

export const getOTP = async (phone: string): Promise<TGetOtpResponse> => {
  const response = await axios.post("/auth/sendOTP", { phone });
  return response.data;
};

type TVerifyOtpRequest = {
  requestId: string;
  otp: string;
};

type TVerifyOtpResponse = {
  data: {
    newUser: boolean;
    requestToken: string;
  };
} & TApiResponse;

export const verifyOTP = async (
  data: TVerifyOtpRequest
): Promise<TVerifyOtpResponse> => {
  const response = await axios.post("/auth/verifyOTP", data);
  return response.data;
};

type TCreateUserRequest = {
  requestToken: string;
  userData: {
    user: {
      name: string;
      dob: number;
      gender: 'Male' | 'Female';
      address: string;
    }
  };
};

export const createUser = async (
  data: TCreateUserRequest
): Promise<TAuthUser> => {
  const response = await axios.post("/user/signup", data.userData, {
    headers: {
      'x-request-token': `${data.requestToken}`,
    },
  });
  return response.data;
}
