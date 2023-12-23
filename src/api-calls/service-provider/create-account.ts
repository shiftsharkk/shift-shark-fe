import axios from "../axios-instance";

import { TServiceProviderAccount } from "../../types/user";

type TCreateServiceProviderRequest = {
  requestToken: string;
  userData: {
    user: {
      name: string;
      dob: number;
      gender: "Male" | "Female";
      address: string;
    };
  };
};

export const createServiceProvider = async (
  data: TCreateServiceProviderRequest
): Promise<TServiceProviderAccount> => {
  const response = await axios.post("/service-provider/signup", data.userData, {
    headers: {
      "x-request-token": `${data.requestToken}`,
    },
  });
  return response.data;
};
