import { USER_ROLES } from '../constants/roles';

export type TRole = (typeof USER_ROLES)[number];

export type TAuthUser = {
  role: TRole;
};

export type TAdditionalServiceProviderData = {
  PAN: string;
  aadharNumber: string;
  photoURL?: string;
  skills: string[];
  resume?: string;
  schoolName: string;
  aboutMe?: string;
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

export type TServiceProviderBasicDetails = {
  name: string;
  email: string;
  gender: string;
  address: string;
  dob: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  verified: string;
  onboardingCompleted: string;
  role: string;
  _id: string;
};

export type TServiceProviderAccount = {
  user: TServiceProviderBasicDetails;
  additionalData: TAdditionalServiceProviderData;
  bankDetails: TServiceProviderBankDetails;
};

export type THirerAccount = {
  role: 'hirer';
  userDetails: THirerUserDetails;
  companyDetails: TCompanyDetails;
};
