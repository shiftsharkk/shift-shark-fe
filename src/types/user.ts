import { USER_ROLES } from '../constants/roles';

export type TRole = (typeof USER_ROLES)[number];

export type TAdditionalServiceProviderData = {
  PAN: string;
  aadharNumber: string;
  photoURL: string;
  skills: string[];
  resume: string;
  schoolName: string;
  aboutMe: string;
};

export type TServiceProviderBankDetails = {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountHolderName: string;
};

export type THirerUserDetails = {
  name: string;
  employeeId: string;
  designation: string;
};

export type TCompanyDetails = {
  name: string;
  address: string;
  isNgo: boolean;
  gstin?: string;
  registrationNumber?: string;
};

export type TAuthUser = {
  _id: string;
  name: string;
  dob: number;
  gender: 'Male' | 'Female';
  address: string;
  phone: string;
  verified: boolean;
  onboardingCompleted: boolean;
  role: TRole;
};

export type TServiceProviderAccount = TAuthUser & {
  role: 'service-provider';
  additionalData: TAdditionalServiceProviderData;
  bankDetails: TServiceProviderBankDetails;
};

export type THirerAccount = TAuthUser & {
  role: 'hirer';
  userDetails: THirerUserDetails;
  companyDetails: TCompanyDetails;
};
