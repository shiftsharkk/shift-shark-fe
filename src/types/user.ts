import { USER_ROLES } from "../constants/roles";

export type TRole = typeof USER_ROLES[number];

export type TAdditionalUserData = {
  PAN: string;
  aadharNumber: string;
  photoURL: string;
  skills: string[];
  resume: string;
  schoolName: string;
  aboutMe: string;
};

export type TBankDetails = {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountHolderName: string;
};

export type TAuthUser = {
  _id: string;
  name: string;
  dob: number;
  gender: "Male" | "Female";
  address: string;
  phone: string;
  verified: boolean;
  onboardingCompleted: boolean;
  role: TRole;
  additionalData?: TAdditionalUserData;
  bankDetails?: TBankDetails;
};
