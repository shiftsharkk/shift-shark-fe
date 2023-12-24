import { z } from 'zod';

export enum Genders {
  Male = 'Male',
  Female = 'Female',
}

export const personalDetailsSchema = z.object({
  name: z.string().min(6, 'Name must be at least 6 characters long'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  gender: z.nativeEnum(Genders),
  address: z.string().min(15, 'Address must be at least 15 characters long'),
  dob: z
    .instanceof(Date, { message: 'Invalid date of birth' })
    .refine((date) => {
      return (
        date < new Date(new Date().setFullYear(new Date().getFullYear() - 18))
      );
    }, 'You should be at least 18 years old'),
});

export const userDetailsSchema = z.object({
  name: z.string().min(6, 'Name must be at least 6 characters long'),
  employeeId: z
    .string()
    .min(1, 'Employee id must be at least 6 characters long'),
  designation: z
    .string()
    .min(1, 'Designation must be at least 6 characters long'),
});

export const companyDetailsGstinSchema = z.object({
  name: z
    .string()
    .min(3, 'Company name must be at least 3 characters long'),
  address: z.string().min(15, 'Address must be at least 15 characters long'),
  isNgo: z.literal(false),
  gstin: z.string().min(15, 'GSTIN must be at least 15 characters long'),
});

export const companyDetailsRegNumSchema = z.object({
  name: z
    .string()
    .min(3, 'Company name must be at least 3 characters long'),
  address: z.string().min(15, 'Address must be at least 15 characters long'),
  isNgo: z.literal(true),
  registrationNumber: z
    .string()
    .min(1, 'Registration number must be at least 1 digit'),
});

export const companyDetailsSchema = z.discriminatedUnion('isNgo', [
  companyDetailsGstinSchema,
  companyDetailsRegNumSchema,
]);

export type TPersonalDetailsSchema = z.infer<typeof personalDetailsSchema>;

export type TUserDetailsSchema = z.infer<typeof userDetailsSchema>;

export type TCompanyDetailsSchema = z.infer<typeof companyDetailsSchema>;

export const bankingDetailsSchema = z.object({
  accountNumber: z
    .string()
    .min(9, 'Bank account number must be at least 9 characters long')
    .max(18, 'Bank account number must be at most 18 characters long'),
  ifscCode: z.string().length(11, 'IFSC code must be 11 characters long'),
  accountHolderName: z
    .string()
    .min(6, 'Account holder name must be at least 6 characters long'),
  bankName: z.string().min(3, 'Bank name must be at least 3 characters long'),
});

export type TBankingDetailsSchema = z.infer<typeof bankingDetailsSchema>;

export const additionalDetailsSchema = z.object({
  PAN: z.string().min(10, 'PAN number must be at least 10 characters long'),
  aadharNumber: z
    .string()
    .length(12, 'Aadhar number must be 12 characters long'),
  photoURL: z.string().url('Invalid photo URL').optional(),
  skills: z
    .array(z.string())
    .min(3, 'At least one skill is required')
    .max(5, 'You can only select upto 5 strengths'),
  schoolName: z
    .string()
    .min(6, 'School name must be at least 6 characters long'),
  aboutMe: z
    .string()
    .min(20, 'Please describe yourself in at least 20 characters'),
});

export type TAdditionalDetailsSchema = z.infer<typeof additionalDetailsSchema>;
