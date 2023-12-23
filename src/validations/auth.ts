import { z } from "zod";

export const getOtpWithPhoneSchema = z.object({
  role: z.literal('service-provider'),
  phone: z
    .string()
    .min(10, "Phone number needs to be 10 digits")
    .max(10, "Phone number needs to be 10 digits")
    .regex(/^\d+$/, "Phone number can only contain digits"),
});
export type TGetOtpWithPhoneSchema = z.infer<typeof getOtpWithPhoneSchema>;

export const getOtpWithEmailSchema = z.object({
  role: z.literal('hirer'),
  email: z.string().email("Invalid email"),
});
export type TGetOtpWithEmailSchema = z.infer<typeof getOtpWithEmailSchema>;


export type TGetOtpErrorSchema = {
  phone?: {
    message: string;
  },
  email?: {
    message: string;
  }
};


export const getOtpSchema = z.discriminatedUnion('role', [
  getOtpWithPhoneSchema,
  getOtpWithEmailSchema,
]);

export type TGetOtpSchema = z.infer<typeof getOtpSchema>;

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP needs to be 6 digits")
    .max(6, "OTP needs to be 6 digits")
    .regex(/^\d+$/, "OTP can only contain digits"),
});

export type TVerifyOtpSchema = z.infer<typeof verifyOtpSchema>;