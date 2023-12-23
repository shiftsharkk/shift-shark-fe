import axios from "../axios-instance";

import { TCompanyDetails, THirerAccount, THirerUserDetails } from "../../types/user";

type TCreateHirerRequest = {
  requestToken: string;
  data: {
    user: THirerUserDetails;
    companyDetails: TCompanyDetails;
  }
}

export const createHirer = async (
  data: TCreateHirerRequest
): Promise<THirerAccount> => {
  const response = await axios.post("/hirer/signup", data.data, {
    headers: {
      "x-request-token": `${data.requestToken}`,
    },
  });
  return response.data;
};