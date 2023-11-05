import { z } from "zod";

export const getOtpSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number needs to be 10 digits")
    .max(10, "Phone number needs to be 10 digits")
    .regex(/^\d+$/, "Phone number can only contain digits"),
});

export type TGetOtpSchema = z.infer<typeof getOtpSchema>;

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP needs to be 6 digits")
    .max(6, "OTP needs to be 6 digits")
    .regex(/^\d+$/, "OTP can only contain digits"),
});

export type TVerifyOtpSchema = z.infer<typeof verifyOtpSchema>;